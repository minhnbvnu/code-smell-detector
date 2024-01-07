constructor(setting) {
    this.setting = setting;
    this.live = new Map();

    const initLocal = NativeConstructor => {
      this.nativeRegistry = new NativeWatcherRegistry(normalizedPath => {
        const nativeWatcher = new NativeConstructor(normalizedPath);

        this.live.set(normalizedPath, nativeWatcher);
        const sub = nativeWatcher.onWillStop(() => {
          this.live.delete(normalizedPath);
          sub.dispose();
        });

        return nativeWatcher;
      });
    };

    if (setting === 'atom') {
      initLocal(AtomNativeWatcher);
    } else if (setting === 'experimental') {
      //
    } else if (setting === 'poll') {
      //
    } else {
      initLocal(NSFWNativeWatcher);
    }

    this.isShuttingDown = false;
  }