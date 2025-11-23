"use strict";

function link(...handlers) {
  const listeners = [];

  function run(value) {
    if (handlers.length === 0) return value;

    let current = value;
    try {
      for (let i = handlers.length - 1; i >= 0; i--) {
        current = handlers[i](current);
      }
      return current;
    } catch (err) {
      for (const fn of listeners) fn(err);
      return null;
    }
  }

  run.on = (ev, fn) => {
    if (ev === "error") listeners.push(fn);
  };

  return run;
}

module.exports = { link };
