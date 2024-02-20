function munge(outer, inner) {
            let whole = void 0;

            if (inner.whole && outer.whole) {
              whole = inner.whole.intersection(outer.whole);

              if (!whole) {
                return void 0;
              }
            }

            const part = inner.part.intersection(outer.part);

            if (!part) {
              return void 0;
            }

            const context = inner.combineContext(outer);
            return new Hap(whole, part, inner.value, context);
          }