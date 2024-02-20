function promisifyModule(mod) {
  var newMod = _.clone(mod);

  _.each(_.methods(mod), (method) => {
    var original = mod[method];
    newMod[method] = function(...args) {
      return BB.promisify(original.bind(this))(...args);
    };
  });

  return newMod;
}