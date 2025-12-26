import Debug from "./debug.js";
import { isColor } from "./utilities.js";

export default class NSWEngine {
  #dataFilePath = "./data.json";
  #imagesPath = "";
  #images = [];
  #soundsPath = "";
  #sounds = [];
  #musicTracksPath = "";
  #musicTracks = [];
  #defaultFont = "Arial";
  #defaultBackgroundColor = "cornflowerblue";
  #defaultTextColor = "white";
  #defaultDescription = "not defined";
  #defaultExitLabel = "not defined";

  constructor() {
    this.addButtonOnClickEvents();
  }
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
  get defaultFont() {
    return this.#defaultFont;
  }
  get defaultBackgroundColor() {
    return this.#defaultBackgroundColor;
  }
  get defaultTextColor() {
    return this.#defaultTextColor;
  }
  get defaultDescription() {
    return this.#defaultDescription;
  }
  get defaultExitLabel() {
    return this.#defaultExitLabel;
  }
  get directions() {
    return {
      n: "north",
      s: "south",
      w: "west",
      e: "east",
    };
  }
  get allDirections() {
    return [
      this.directions.n,
      this.directions.s,
      this.directions.w,
      this.directions.e,
    ];
  }
  get currentRoom() {
    return this.data.rooms.find((room) => room.id === this.currentRoomId);
  }
  get currentTextColor() {
    const roomTextColor = this.currentRoom.textColor;

    if (roomTextColor === undefined) {
      return this.defaultTextColor;
    }

    if (!isColor(roomTextColor)) {
      Debug.log(
        `room ${this.currentRoomId}: \'${roomTextColor}\' is not a valid textColor`
      );
      return this.defaultTextColor;
    }

    return roomTextColor;
  }
  get currentBackgroundColor() {
    const roomBackgroundColor = this.currentRoom.backgroundColor;

    if (roomBackgroundColor === undefined) {
      return this.defaultBackgroundColor;
    }

    if (!isColor(roomBackgroundColor)) {
      Debug.log(
        `room ${this.currentRoomId}: \'${roomBackgroundColor}\' is not a valid backgroundColor`
      );
      return this.defaultBackgroundColor;
    }

    return roomBackgroundColor;
  }
  get currentDescription() {
    const roomDescription = this.currentRoom.description;

    if (roomDescription === undefined) {
      Debug.log(`room ${this.currentRoomId}: no room description found`);
      return this.defaultDescription;
    }

    return roomDescription;
  }
  get currentFont() {
    const roomFont = this.currentRoom.font;

    if (roomFont === undefined) {
      return this.defaultFont;
    }

    return roomFont;
  }
  getExitButton(direction) {
    return document.querySelector(`#${direction}-exit-button`);
  }
  getExitLabel(direction) {
    const label = this.currentRoom[direction].label;

    if (label === "") {
      return label;
    }

    return label ? label : this.defaultExitLabel;
  }
  start(game) {
    this.game = game;
    this.data = game.content.data;
    this.currentRoomId = 0;
    this.displayCurrentRoom();
  }
  addButtonOnClickEvents() {
    this.allDirections.forEach((direction) => {
      const exitButton = this.getExitButton(direction);

      exitButton.onclick = () => {
        this.go(direction);
      };
    });
  }
  update(game) {
    this.handleKeyboardInput(game);
  }
  handleKeyboardInput(game) {
    const input = game.input;
    if (input.isKeyPressed(input.keys.UP)) {
      this.go(this.directions.n);
    }
    if (input.isKeyPressed(input.keys.DOWN)) {
      this.go(this.directions.s);
    }
    if (input.isKeyPressed(input.keys.LEFT)) {
      this.go(this.directions.w);
    }
    if (input.isKeyPressed(input.keys.RIGHT)) {
      this.go(this.directions.e);
    }
  }
  go(direction) {
    if (!this.currentRoom[direction]) {
      return;
    }
    if (this.currentRoom[direction].linkTo === undefined) {
      Debug.log(`no \'linkTo\' provided for \'${direction}\' exit`);
      return;
    }
    this.currentRoomId = this.currentRoom[direction].linkTo;
    this.displayCurrentRoom();
    Debug.log(`entering room ${this.currentRoomId}`);
  }
  displayCurrentRoom() {
    if (!this.currentRoom) {
      throw new Error(
        `room with id \'${this.currentRoomId}\' was not defined in data.json`
      );
    }

    this.setColors();
    this.setFont();
    this.displayRoomDescription();
    this.allDirections.forEach((direction) => {
      this.displayExit(direction);
    });
  }
  setColors() {
    const gameContainer = document.querySelector("#game-container");

    gameContainer.style.backgroundColor = this.currentBackgroundColor;
    gameContainer.style.color = this.currentTextColor;
  }
  setFont() {
    const gameContainer = document.querySelector("#game-container");

    gameContainer.style.fontFamily = this.currentFont;
  }
  displayRoomDescription() {
    const roomDescriptionDiv = document.querySelector("#room-description");
    const description = this.currentDescription;

    if (Array.isArray(description)) {
      this.displayDescriptionArray(roomDescriptionDiv, description);
    } else if (typeof description === "string") {
      this.displayDescriptionString(roomDescriptionDiv, description);
    }
  }
  displayDescriptionString(roomDescriptionDiv, description) {
    roomDescriptionDiv.style.whiteSpace = "normal";
    roomDescriptionDiv.textContent = description;
  }
  displayDescriptionArray(roomDescriptionDiv, description) {
    const htmlContent = description.join("<br>");
    roomDescriptionDiv.style.whiteSpace = "preserve nowrap";
    roomDescriptionDiv.innerHTML = htmlContent;
  }
  displayExit(direction) {
    const exitButton = this.getExitButton(direction);

    if (!this.currentRoom[direction]) {
      exitButton.style.display = "none";
      return;
    }

    exitButton.style.display = "block";
    exitButton.textContent = this.getExitLabel(direction);
  }
}
