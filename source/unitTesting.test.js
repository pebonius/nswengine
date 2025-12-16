import { is, are, throws, doesNotThrow } from "./unitTesting.js";

function isTest() {
  is(true, true);
  is(2, 2);
  is("something", "something");
  is(1.234, 1.234);
}

function areTest() {
  is(are([true, true], true), true);
}

function throwTest() {
  throws(() => {
    throw new Error("some error");
  });
}

function doesNotThrowTest() {
  doesNotThrow(() => {
    const someValue = 0;
  });
}

export const testTests = [isTest, areTest, throwTest, doesNotThrowTest];
