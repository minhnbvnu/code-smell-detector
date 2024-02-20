function registerAnimator(name, ctor) {
      if (ctors[name])
        throw new Error('Animator ' + name + ' is already registered.');
      ctors[name] = ctor;
      if (pendingAnimations[name]) {
        for (var i = 0; i < pendingAnimations[name].length; i++) {
          pendingAnimations[name][i](ctor);
        }
        delete pendingAnimations[name];
      }
    }