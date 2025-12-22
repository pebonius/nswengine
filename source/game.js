import Debug from "./debug.js";
import { clearContext } from "./graphics.js";
import InputManager from "./input.js";
import ContentManager from "./content.js";
import SoundManager from "./sound.js";

export default class Game {
  #lastUpdateTime = Date.now();
  #updateRate = 15;
  #startingScene;

  constructor(startingScene) {
    this.input = new InputManager();
    this.content = new ContentManager();
    this.sound = new SoundManager();
    this.#startingScene = startingScene;
    this.content.onFinishedLoading = () => {
      this.start();
    };
    this.content.loadContent(
      startingScene.dataFilePath,
      startingScene.imagesPath,
      startingScene.images,
      startingScene.soundsPath,
      startingScene.sounds,
      startingScene.musicTracksPath,
      startingScene.musicTracks
    );
  }
  start() {
    this.currentScene = this.#startingScene;
    this.currentScene.start(this);
    this.running = true;
    this.gameLoop();
    Debug.log("game started");
  }
  gameLoop() {
    if (!this.currentScene) {
      this.running = false;
      return;
    }

    this.update(this.currentScene);

    if (this.running) {
      requestAnimationFrame(() => this.gameLoop());
    }
  }
  update(scene) {
    if (Date.now() < this.#lastUpdateTime + this.#updateRate) {
      return;
    }

    this.input.update();
    scene.update(this);

    this.#lastUpdateTime = Date.now();
  }
}
