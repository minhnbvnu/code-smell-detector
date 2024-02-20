function PolyRelFormatter(intl, isEnglish, opts) {
      this.opts = Object.assign({
        style: "long"
      }, opts);

      if (!isEnglish && hasRelative()) {
        this.rtf = getCachedRTF(intl, opts);
      }
    }