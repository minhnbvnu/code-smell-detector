function debounceByName(func, timeout = 300) {
  let timers = {};
  return (...args) => {
    const name = args[0];
    clearTimeout(timers[name]);
    // console.log('CLEARING', name);
    timers[name] = setTimeout(() => {
      // console.log('APPLYING', name);
      func.apply(this, args);
    }, timeout);
  };
}