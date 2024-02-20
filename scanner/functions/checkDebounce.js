function checkDebounce({ Vue, key, /* objBase,*/ args }) {
  // config
  const config = args[args.length - 1];
  if (!config || !config.debounce) return null;
  // fn
  if (!__fnDebounce) {
    __fnDebounce = Vue.prototype.$meta.util.debounce(apiDebounce, Vue.prototype.$meta.config.api.debounce);
  }
  // promise
  return new Promise((resolve, reject) => {
    const callback = function (err, res) {
      if (err) return reject(err);
      return resolve(res);
    };
    // push
    __invokes.push({ key, args, callback });
    __fnDebounce({ Vue });
  });
}