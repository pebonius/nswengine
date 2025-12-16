import { drawRectangle, normalizeRotationDegrees } from "./graphics.js";

export default class Rectangle {
  #x = 0;
  #y = 0;
  #width = 0;
  #height = 0;
  #rotationDeg = 0;
  #color = "black";

  constructor(x, y, width, height, rotationDeg, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rotationDeg = rotationDeg;
    this.color = color;
  }
  get x() {
    return this.#x;
  }
  set x(value) {
    if (!Number.isInteger(value)) {
      throw new RangeError(
        `provided value should be an integer, and was ${typeof value}`
      );
    }

    this.#x = value;
  }
  get y() {
    return this.#y;
  }
  set y(value) {
    if (!Number.isInteger(value)) {
      throw new RangeError(
        `provided value should be an integer, and was ${typeof value}`
      );
    }

    this.#y = value;
  }
  get width() {
    return this.#width;
  }
  set width(value) {
    if (!Number.isInteger(value)) {
      throw new RangeError(
        `provided value should be an integer, and was ${typeof value}`
      );
    }

    this.#width = value;
  }
  get height() {
    return this.#height;
  }
  set height(value) {
    if (!Number.isInteger(value)) {
      throw new RangeError(
        `provided value should be an integer, and was ${typeof value}`
      );
    }

    this.#height = value;
  }
  get rotationDeg() {
    return this.#rotationDeg;
  }
  set rotationDeg(value) {
    if (!Number.isInteger(value)) {
      throw new RangeError(
        `provided value should be an integer, and was ${typeof value}`
      );
    }

    this.#rotationDeg = normalizeRotationDegrees(value);
  }
  get color() {
    return this.#color;
  }
  set color(value) {
    if (typeof value !== "string") {
      throw new RangeError(
        `provided value should be a string, and was ${typeof value}`
      );
    }

    this.#color = value;
  }
  /**
   * NOTE: this method is stupid right now because it only works for non-rotated rectangles.
   * tells you if rectangle is at least partially in viewport of a canvas
   *
   * @param {*} canvas canvas to check
   * @returns true if rectangle at least partially in viewport
   */
  isInViewPort(canvas) {
    return (
      this.x > 1 - this.width &&
      this.x + 1 < canvas.width &&
      this.y > 1 - this.height &&
      this.y + 1 < canvas.height
    );
  }
  /**
   * NOTE: this method is stupid right now because it only works for non-rotated rectangles.
   * tells you if rectangle is fully in viewport of a canvas
   *
   * @param {*} canvas canvas to check
   * @returns true if rectangle fully in viewport
   */
  isFullyInViewport(canvas) {
    return (
      this.x > 0 &&
      this.x + this.width < canvas.width &&
      this.y > 0 &&
      this.y + this.height < canvas.height
    );
  }
  /**
   * NOTE: this method is stupid right now because it only works for non-rotated rectangles.
   * tells you if rectangle contains a point
   *
   * @param x x of point you want to test - must be a safe integer
   * @param y y of point you want to test - must be a safe integer
   *
   * @returns true if rectangle contains point
   */
  contains(x, y) {
    if (!Number.isSafeInteger(x) || !Number.isSafeInteger(y)) {
      throw new Error("x and y must be safe integers");
    }

    return (
      x >= this.x &&
      x < this.x + this.width &&
      y >= this.y &&
      y < this.y + this.height
    );
  }
  /**
   * draws rectangle within provided 2d context
   *
   * @param context 2d context of canvas to draw rectangle to
   */
  draw(context) {
    drawRectangle(
      context,
      this.x,
      this.y,
      this.width,
      this.height,
      this.rotationDeg,
      this.color
    );
  }
}
