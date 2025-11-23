"use strict";

function chain(...fns) {
  for (const fn of fns) {
    if (typeof fn !== "function") {
      throw new TypeError("Expected functions only");
    }
  }

  return (input) => {
    let val = input;
    for (const fn of fns) {
      val = fn(val);
    }
    return val;
  };
}

module.exports = { chain };
