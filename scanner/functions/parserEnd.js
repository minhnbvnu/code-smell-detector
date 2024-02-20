function parserEnd(err) {
      var idx = alive_parsers.indexOf[this];

      /* istanbul ignore if */
      if (idx < 0) return;

      /* istanbul ignore if */
      if (err) last_error = err;

      proxy.unpipe(this);
      this.removeAllListeners();
      alive_parsers.splice(idx, 1);

      if (alive_parsers.length) return;

      // if all parsers finished without success -> fail.
      reject(last_error || new ProbeError('unrecognized file format', 'ECONTENT'));
    }