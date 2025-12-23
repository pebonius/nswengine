import Debug from "./debug.js";

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
  #defaultLabel = "not defined";

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
  get currentRoom() {
    return this.data.rooms.find((room) => room.id === this.currentRoomId);
  }
  get currentTextColor() {
    const roomTextColor = this.currentRoom.textColor;
    return roomTextColor ? roomTextColor : this.#defaultTextColor;
  }
  get currentBackgroundColor() {
    const roomBackgroundColor = this.currentRoom.backgroundColor;
    return roomBackgroundColor
      ? roomBackgroundColor
      : this.#defaultBackgroundColor;
  }
  get currentDescription() {
    const roomDescription = this.currentRoom.description;

    if (roomDescription === "") {
      return roomDescription;
    }

    return roomDescription ? roomDescription : this.#defaultDescription;
  }
  get currentFont() {
    return !this.currentRoom.font ? this.#defaultFont : this.currentRoom.font;
  }
  getExitButton(direction) {
    return document.querySelector(`#${direction}-exit-button`);
  }
  getExitLabel(direction) {
    const label = this.currentRoom[direction].label;

    if (label === "") {
      return label;
    }

    return label ? label : this.#defaultLabel;
  }
  start(game) {
    this.game = game;
    this.data = game.content.data;
    this.currentRoomId = 0;
    this.displayCurrentRoom();
  }
  addButtonOnClickEvents() {
    ["north", "south", "west", "east"].forEach((direction) => {
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
  go(direction) {
    if (!this.currentRoom[direction]) {
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
    this.displayExit("north");
    this.displayExit("south");
    this.displayExit("west");
    this.displayExit("east");
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

    if (Array.isArray(this.currentDescription)) {
      this.displayDescriptionArray(roomDescriptionDiv);
    } else if (typeof this.currentDescription === "string") {
      this.displayDescriptionString(roomDescriptionDiv);
    }
  }
  displayDescriptionString(roomDescriptionDiv) {
    roomDescriptionDiv.style.whiteSpace = "normal";
    roomDescriptionDiv.textContent = this.currentDescription;
  }
  displayDescriptionArray(roomDescriptionDiv) {
    const htmlContent = this.currentDescription.join("<br>");
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
