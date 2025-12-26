export const maxNumber = Number.MAX_SAFE_INTEGER;

// CLIENT
export const isRunningLocally = () => {
  try {
    return (
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1" ||
      location.hostname === ""
    );
  } catch {
    return false;
  }
};

export const isRunningInChrome = () => {
  return !!window.chrome;
};

export const isRunningInFirefox = () => {
  return navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
};

// END OF CLIENT

// FETCHING

export const noCacheHeaders = () => {
  const headers = new Headers();
  headers.append("pragma", "no-cache");
  headers.append("cache-control", "no-cache");
  return headers;
};

export const noCacheInit = () => {
  const init = {
    method: "GET",
    headers: noCacheHeaders(),
  };
  return init;
};

// END OF FETCHING

// ARRAYS

export const checkForArray = (value, valueName) => {
  if (!Array.isArray(value)) {
    throw TypeError("Provided " + valueName + " must be an Array");
  }
};

export const removeFromArray = (array, element) => {
  checkForArray(array, "array");

  if (!arrayContains(array, element)) {
    throw new Error(`array does not include ${element}`);
  }

  const i = array.indexOf(element);
  array.splice(i, 1);
};

export const arrayContains = (array, element) => {
  checkForArray(array, "array");

  return array.includes(element);
};

export const cloneArray = (array) => {
  return array.slice(0);
};

// END OF ARRAYS

export const clamp = (number, min, max) => {
  if (!isNumber(number) || !isNumber(min) || !isNumber(max)) {
    throw TypeError("Provided number, min, max must be numbers.");
  }
  if (min >= max) {
    throw RangeError("Provided min must be smaller than max.");
  }
  return Math.min(Math.max(number, min), max);
};

export const isNumber = (value) => {
  return Number.isSafeInteger(value) || isFloat(value);
};

export const isFloat = (value) => {
  if (typeof value !== "number") {
    return false;
  }
  return Number(value) === value && value % 1 !== 0;
};

export const isString = (value) => {
  return typeof value === "string";
};

export const isNonEmptyString = (value) => {
  return isString(value) && value !== "";
};

export const isFunction = (value) => {
  return typeof value === "function";
};

export const isBool = (value) => {
  return value === true || value === false;
};

export const isColor = (color) => {
  return CSS.supports("color", color);
};
