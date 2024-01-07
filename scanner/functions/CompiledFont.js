constructor(fontMatrix) {
      if (this.constructor === CompiledFont) {
        (0, _util.unreachable)("Cannot initialize CompiledFont.");
      }

      this.fontMatrix = fontMatrix;
      this.compiledGlyphs = Object.create(null);
      this.compiledCharCodeToGlyphId = Object.create(null);
    }