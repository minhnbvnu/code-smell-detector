            setTimeout(function() {
              window.removeEventListener("unhandledrejection", listener);
              done();
            });
            setTimeout(function() {
              expect(count).to.eq(1);
              done();
            });