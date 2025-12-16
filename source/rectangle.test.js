import Rectangle from "./rectangle.js";
import { is, throws } from "./unitTesting.js";

function nonRotatedRectContainsTest() {
  const rect = new Rectangle(0, 0, 3, 3, 0, "white");

  is(rect.contains(0, 0), true);
  is(rect.contains(2, 0), true);
  is(rect.contains(0, 2), true);
  is(rect.contains(2, 2), true);
  is(rect.contains(-1, 0), false);
  is(rect.contains(0, -1), false);
  is(rect.contains(-1, -1), false);
  is(rect.contains(3, 0), false);
  is(rect.contains(0, 3), false);
  is(rect.contains(3, 3), false);

  const invalidValues = [
    "0",
    "something",
    undefined,
    null,
    { prop: "value" },
    [],
  ];

  invalidValues.forEach((value) => {
    throws(() => {
      rect.contains(invalidValues, 0);
    });
  });

  invalidValues.forEach((value) => {
    throws(() => {
      rect.contains(0, invalidValues);
    });
  });

  invalidValues.forEach((value) => {
    throws(() => {
      rect.contains(invalidValues, invalidValues);
    });
  });
}

export const rectangleTests = [nonRotatedRectContainsTest];
