import { drawText } from "./graphics.js";

export default class TestingHud {
  /**
   *
   */
  #pointerPositionString;

  constructor() {}
  update(game) {
    const pointerPositionX = game.input.pointerPosition
      ? game.input.pointerPosition.x.toFixed(2)
      : "?";
    const pointerPositionY = game.input.pointerPosition
      ? game.input.pointerPosition.y.toFixed(2)
      : "?";

    this.#pointerPositionString = `pointer pos x: ${pointerPositionX}, y: ${pointerPositionY}`;
  }
  draw(context) {
    drawText(context, this.#pointerPositionString, 20, "white", 5, 5);
  }
}
