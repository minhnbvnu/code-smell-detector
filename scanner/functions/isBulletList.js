function isBulletList(text) {
      return /^[\s\u00a0]*[\u2022\u00b7\u00a7\u25CF]\s*/.test(text);
    }