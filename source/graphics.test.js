import { distance, normalizeRotationDegrees } from "./graphics.js";
import { doesNotThrow, throws, is } from "./unitTesting.js";

function normalizeRotationDegreesValidValuesTest() {
  const validValues = [-120, 0, 1, 90, 3232879243];
  validValues.forEach((value) => {
    doesNotThrow(() => {
      normalizeRotationDegrees(value);
    });
  });
}

function normalizeRotationDegreesInvalidValuesTest() {
  const invalidValues = ["0", "something", undefined, null, { x: 0 }, []];
  invalidValues.forEach((value) => {
    throws(() => {
      normalizeRotationDegrees(value);
    });
  });
}

function normalizeRotationDegreesNormalizesDegrees() {
  is(normalizeRotationDegrees(360), 0);
  is(normalizeRotationDegrees(365), 5);
  is(normalizeRotationDegrees(3605), 5);
  is(normalizeRotationDegrees(-360), 0);
  is(normalizeRotationDegrees(-365), 355);
  is(normalizeRotationDegrees(-3605), 355);
}

function distanceInvalidPointATest() {
  const invalidValues = ["0", "something", undefined, null, { x: 0 }, []];

  invalidValues.forEach((value) => {
    throws(() => {
      distance(value, { x: 10, y: 10 });
    });
  });
}

function distanceInvalidPointBTest() {
  const invalidValues = ["0", "something", undefined, null, { x: 0 }, []];

  invalidValues.forEach((value) => {
    throws(() => {
      distance({ x: 10, y: 10 }, value);
    });
  });
}

function distanceCalculatesCorrectDistance() {
  const pointA = { x: 0, y: 0 };
  const pointB = { x: 1, y: 1 };
  const pointC = { x: -1, y: -1 };
  const pointD = { x: 0, y: 0 };
  const pointE = { x: 1, y: 0 };
  const pointF = { x: 0, y: Number.MAX_SAFE_INTEGER };

  is(distance(pointA, pointB).toFixed(5), (1.4142135).toFixed(5));
  is(distance(pointA, pointC).toFixed(5), (1.4142135).toFixed(5));
  is(distance(pointA, pointD), 0);
  is(distance(pointA, pointE), 1);
  is(distance(pointA, pointF), Number.MAX_SAFE_INTEGER);
}

export const graphicsTests = [
  normalizeRotationDegreesValidValuesTest,
  normalizeRotationDegreesInvalidValuesTest,
  normalizeRotationDegreesNormalizesDegrees,
  distanceInvalidPointATest,
  distanceInvalidPointBTest,
  distanceCalculatesCorrectDistance,
];
