function applyCallback() {
          if (!self.hasString && !self.hasFalse) {
            onTrue();
          } else if (!self.hasString && self.hasFalse) {
            onFalse();
          } else {
            onString();
          }
        }