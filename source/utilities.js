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

export const checkForTypeError = (value, valueName, type) => {
  if (!(value instanceof type)) {
    const typeObject = new type();
    throw TypeError(
      "Provided " +
        valueName +
        " must be instance of " +
        typeObject.constructor.name +
        "."
    );
  }
};

// ARRAYS

export const checkForArray = (value, valueName) => {
  if (!Array.isArray(value)) {
    throw TypeError("Provided " + valueName + " must be an Array");
  }
};

export const clearArray = (array) => {
  checkForArray(array, "array");

  array.length = 0;
};

export const firstElementInArray = (array) => {
  checkForArray(array, "array");

  return array.find((x) => x !== undefined);
};

export const lastElementInArray = (array) => {
  checkForArray(array, "array");

  if (array.length <= 0) {
    return undefined;
  }

  return array[array.length - 1];
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

export const checkForTypeErrorNum = (value, valueName) => {
  if (!isNumber(value)) {
    throw TypeError("Provided " + valueName + " must be a number.");
  }
};

export const isDefined = (value) => {
  return value !== null && value !== undefined;
};

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
  return Number(value) === value;
};

export const isFloat = (number) => {
  return isNumber(number) && number % 1 !== 0;
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

export const hasProperty = (object, checkedProperty) => {
  return Object.keys(object).some((key) => {
    return key == checkedProperty;
  });
};

export const checkForProps = (object, props) => {
  props.forEach((element) => {
    if (!hasProperty(object, element)) {
      throw new Error(`${object} does not have property ${element}`);
    }
  });
};

export const hasValue = (object, checkedValue) => {
  return Object.values(object).some((value) => {
    return value == checkedValue;
  });
};

export const removeDead = (array) => {
  if (!Array.isArray(array)) {
    throw TypeError("array must be an array duh");
  }

  for (let i = array.length - 1; i > -1; i--) {
    if (array[i].isDead) {
      array.splice(i, 1);
    }
  }
};

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (+max + 1 - +min) + +min);
};

export const randomFloat = (min, max) => {
  return Math.random() * (+max - +min) + +min;
};

export const passPercentileRoll = (chance) => {
  if (!(isNumber(chance) || isFloat(chance))) {
    throw new TypeError("Provided chance must be a number or float.");
  }
  if (chance <= 0) {
    return false;
  } else if (chance >= 100) {
    return true;
  } else {
    return randomFloat(0, 100) <= chance;
  }
};

export const msToTimeString = (ms) => {
  if (!Number.isSafeInteger(ms)) {
    return "";
  }

  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  const hoursString = hours < 10 ? `0${hours}` : hours;
  const minutesString = minutes < 10 ? `0${minutes}` : minutes;
  const secondsString = seconds < 10 ? `0${seconds}` : seconds;

  return `${hoursString}:${minutesString}:${secondsString}`;
};
