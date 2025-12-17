import { drawRectangle, drawText, stringWidth } from "./graphics.js";
import Rectangle from "./rectangle.js";

export default class NSWEngine {
  #dataFilePath = "./data.json";
  #imagesPath = "";
  #images = [];
  #soundsPath = "";
  #sounds = [];
  #musicTracksPath = "";
  #musicTracks = [];
  #descriptionFontSize = 24;
  #exitFontSize = 16;
  #exitLabelMargin = 16;
  #touchZoneLongSide = 240;
  #touchZoneShortSide = 120;

  constructor() {}
  get dataFilePath() {
    return this.#dataFilePath;
  }
  get imagesPath() {
    return this.#imagesPath;
  }
  get images() {
    return this.#images;
  }
  get soundsPath() {
    return this.#soundsPath;
  }
  get sounds() {
    return this.#sounds;
  }
  get musicTracksPath() {
    return this.#musicTracksPath;
  }
  get musicTracks() {
    return this.#musicTracks;
  }
  get currentRoom() {
    return this.data.rooms[this.currentRoomId];
  }
  get textColor() {
    return this.currentRoom.textColor;
  }
  get backgroundColor() {
    return this.currentRoom.backgroundColor;
  }
  start(game) {
    this.game = game;
    this.data = game.content.data;
    this.currentRoomId = 0;

    const upTouchZonePosX =
      game.canvas.width * 0.5 - this.#touchZoneLongSide * 0.5;
    const upTouchZonePosY = 0;

    this.upTouchZone = new Rectangle(
      upTouchZonePosX,
      upTouchZonePosY,
      this.#touchZoneLongSide,
      this.#touchZoneShortSide,
      0,
      "red"
    );

    const downTouchZonePosX = upTouchZonePosX;
    const downTouchZonePosY = game.canvas.height - this.#touchZoneShortSide;

    this.downTouchZone = new Rectangle(
      downTouchZonePosX,
      downTouchZonePosY,
      this.#touchZoneLongSide,
      this.#touchZoneShortSide,
      0,
      "red"
    );

    const leftTouchZonePosX = 0;
    const leftTouchZonePosY =
      game.canvas.height * 0.5 - this.#touchZoneLongSide * 0.5;

    this.leftTouchZone = new Rectangle(
      leftTouchZonePosX,
      leftTouchZonePosY,
      this.#touchZoneShortSide,
      this.#touchZoneLongSide,
      0,
      "red"
    );

    const rightTouchZonePosX = game.canvas.width - this.#touchZoneShortSide;
    const rightTouchZonePosY = leftTouchZonePosY;

    this.rightTouchZone = new Rectangle(
      rightTouchZonePosX,
      rightTouchZonePosY,
      this.#touchZoneShortSide,
      this.#touchZoneLongSide,
      0,
      "red"
    );
  }
  update(game) {
    this.handleKeyboardInput(game);
    this.handlePointerInput(game);
  }
  handleKeyboardInput(game) {
    const input = game.input;
    if (input.isKeyPressed(input.keys.UP)) {
      this.go("north");
    }
    if (input.isKeyPressed(input.keys.DOWN)) {
      this.go("south");
    }
    if (input.isKeyPressed(input.keys.LEFT)) {
      this.go("west");
    }
    if (input.isKeyPressed(input.keys.RIGHT)) {
      this.go("east");
    }
  }
  handlePointerInput(game) {
    const input = game.input;

    if (input.isClick()) {
      this.checkForPointerActions(input.pointerPosition);
    }
  }
  checkForPointerActions(pointerPosition) {
    if (this.upTouchZone.contains(pointerPosition.x, pointerPosition.y)) {
      this.go("north");
    } else if (
      this.downTouchZone.contains(pointerPosition.x, pointerPosition.y)
    ) {
      this.go("south");
    } else if (
      this.leftTouchZone.contains(pointerPosition.x, pointerPosition.y)
    ) {
      this.go("west");
    } else if (
      this.rightTouchZone.contains(pointerPosition.x, pointerPosition.y)
    ) {
      this.go("east");
    }
  }
  go(direction) {
    if (!this.currentRoom[direction]) {
      return;
    }
    this.currentRoomId = this.currentRoom[direction].linkTo;
    console.log(this.currentRoomId);
  }
  draw(context) {
    this.drawBackground(context);
    this.drawRoomDescription(context);
    this.drawRoomExits(context);
  }
  drawTouchZones(context) {
    this.upTouchZone.draw(context);
    this.downTouchZone.draw(context);
    this.leftTouchZone.draw(context);
    this.rightTouchZone.draw(context);
  }
  drawBackground(context) {
    drawRectangle(
      context,
      0,
      0,
      context.canvas.width,
      context.canvas.height,
      0,
      this.backgroundColor
    );
  }
  drawRoomDescription(context) {
    this.descriptionSplitStrings().forEach((line, index) => {
      const descriptionString = line;
      const descriptionWidth = stringWidth(
        context,
        descriptionString,
        this.#descriptionFontSize
      );
      const posX = context.canvas.width * 0.5 - descriptionWidth * 0.5;
      const posY =
        context.canvas.height * 0.5 -
        this.#descriptionFontSize *
          this.descriptionSplitStrings().length *
          0.5 +
        index * this.#descriptionFontSize;

      drawText(
        context,
        descriptionString,
        this.#descriptionFontSize,
        this.textColor,
        posX,
        posY
      );
    });
  }
  descriptionSplitStrings() {
    const description = this.currentRoom.description;

    const words = description.split(" ");

    const lines = [];
    const maxCharsPerLine = 28;
    let currentLineId = 0;

    words.forEach((word) => {
      const currentLine = lines[currentLineId];
      if (!currentLine) {
        lines[currentLineId] = word;
        return;
      }

      if (currentLine.length < maxCharsPerLine) {
        lines[currentLineId] = `${currentLine} ${word}`;
        return;
      }

      if (currentLine.length >= maxCharsPerLine) {
        currentLineId++;
        lines[currentLineId] = word;
      }
    });

    return lines;
  }
  drawRoomExits(context) {
    this.drawNorthExit(context);
    this.drawSouthExit(context);
    this.drawWestExit(context);
    this.drawEastExit(context);
  }
  drawNorthExit(context) {
    if (!this.currentRoom.north) {
      return;
    }

    const label = this.currentRoom.north.label;
    const labelWidth = stringWidth(context, label, this.#exitFontSize);
    const posX = context.canvas.width * 0.5 - labelWidth * 0.5;
    const posY = this.#exitLabelMargin;

    drawText(context, label, this.#exitFontSize, this.textColor, posX, posY);
  }
  drawSouthExit(context) {
    if (!this.currentRoom.south) {
      return;
    }

    const label = this.currentRoom.south.label;
    const labelWidth = stringWidth(context, label, this.#exitFontSize);
    const posX = context.canvas.width * 0.5 - labelWidth * 0.5;
    const posY =
      context.canvas.height - this.#exitFontSize - this.#exitLabelMargin;

    drawText(context, label, this.#exitFontSize, this.textColor, posX, posY);
  }
  drawWestExit(context) {
    if (!this.currentRoom.west) {
      return;
    }

    const label = this.currentRoom.west.label;
    const labelWidth = stringWidth(context, label, this.#exitFontSize);
    const posX = this.#exitLabelMargin;
    const posY = context.canvas.height * 0.5 - this.#exitFontSize * 0.5;

    drawText(context, label, this.#exitFontSize, this.textColor, posX, posY);
  }
  drawEastExit(context) {
    if (!this.currentRoom.east) {
      return;
    }

    const label = this.currentRoom.east.label;
    const labelWidth = stringWidth(context, label, this.#exitFontSize);
    const posX = context.canvas.width - labelWidth - this.#exitLabelMargin;
    const posY = context.canvas.height * 0.5 - this.#exitFontSize * 0.5;

    drawText(context, label, this.#exitFontSize, this.textColor, posX, posY);
  }
}
