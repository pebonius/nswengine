import { drawSpriteFromSheet } from "./graphics.js";

export default class Sprite {
  #spriteSheet;
  #spriteIndex;
  #positionX;
  #positionY;
  #flipX = false;
  #flipY = false;
  #scaleX = 1;
  #scaleY = 1;
  #rotationDeg = 0;

  constructor(spriteSheet, spriteIndex) {
    this.#spriteSheet = spriteSheet;
    this.spriteIndex = spriteIndex;
  }
  get spriteSheet() {
    return this.#spriteSheet;
  }
  get spriteIndex() {
    return this.#spriteIndex;
  }
  set spriteIndex(value) {
    if (!Number.isInteger(value)) {
      throw new Error("value must be a safe integer");
    }

    this.#spriteIndex = value;
  }
  get positionX() {
    return this.#positionX;
  }
  set positionX(value) {
    if (!Number.isSafeInteger) {
      throw new Error(
        `value must be a safe integer and you give me ${value}!!!`
      );
    }

    this.#positionX = value;
  }
  get positionY() {
    return this.#positionY;
  }
  set positionY(value) {
    if (!Number.isSafeInteger) {
      throw new Error(
        `value must be a safe integer and you give me ${value}!!!`
      );
    }

    this.#positionY = value;
  }
  get flipX() {
    return this.#flipX;
  }
  set flipX(value) {
    if (value !== true && value !== false) {
      throw new Error(
        `value should be true or false and you give me ${value}!!!`
      );
    }

    this.#flipX = value;
  }
  get flipY() {
    return this.#flipY;
  }
  set flipY(value) {
    if (value !== true && value !== false) {
      throw new Error(
        `value should be true or false and you give me ${value}!!!`
      );
    }

    this.#flipY = value;
  }
  get scaleX() {
    return this.#scaleX;
  }
  set scaleX(value) {
    if (!Number.isSafeInteger) {
      throw new Error(
        `value must be a safe integer and you give me ${value}!!!`
      );
    }

    this.#scaleX = value;
  }
  get scaleY() {
    return this.#scaleY;
  }
  set scaleY(value) {
    if (!Number.isSafeInteger) {
      throw new Error(
        `value must be a safe integer and you give me ${value}!!!`
      );
    }

    this.#scaleY = value;
  }
  get scaleY() {
    return this.#scaleY;
  }
  set scaleY(value) {
    if (!Number.isSafeInteger) {
      throw new Error(
        `value must be a safe integer and you give me ${value}!!!`
      );
    }

    this.#scaleY = value;
  }
  get rotationDeg() {
    return this.#rotationDeg;
  }
  set rotationDeg(value) {
    if (!Number.isSafeInteger) {
      throw new Error(
        `value must be a safe integer and you give me ${value}!!!`
      );
    }

    this.#rotationDeg = value;
  }
  draw(context) {
    drawSpriteFromSheet(
      context,
      this.#spriteSheet,
      this.#spriteIndex,
      this.#positionX,
      this.#positionY,
      this.#flipX,
      this.#flipY,
      this.#scaleX,
      this.#scaleY,
      this.#rotationDeg
    );
  }
}
