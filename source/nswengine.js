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
    return this.data.rooms[this.currentRoomId];
  }
  get textColor() {
    return this.currentRoom.textColor;
  }
  get backgroundColor() {
    return this.currentRoom.backgroundColor;
  }
  get font() {
    return !this.currentRoom.font ? this.#defaultFont : this.currentRoom.font;
  }
  getExitButton(direction) {
    return document.querySelector(`#${direction}-exit-button`);
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

    gameContainer.style.backgroundColor = this.backgroundColor;
    gameContainer.style.color = this.textColor;
  }
  setFont() {
    const gameContainer = document.querySelector("#game-container");

    gameContainer.style.fontFamily = this.font;
  }
  displayRoomDescription() {
    const roomDescriptionDiv = document.querySelector("#room-description");
    roomDescriptionDiv.textContent = this.currentRoom.description;
  }
  displayExit(direction) {
    const exitButton = this.getExitButton(direction);

    if (!this.currentRoom[direction]) {
      exitButton.style.display = "none";
      return;
    }

    exitButton.style.display = "block";
    exitButton.textContent = this.currentRoom[direction].label;
  }
}
