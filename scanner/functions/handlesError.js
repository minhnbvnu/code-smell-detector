function handlesError(html) {
      // Naming finish b/c the callback to postscribe is already called done
      return finish => {
        let oldOnError = window.onerror;
        window.onerror = null;

        const div = document.createElement('div');
        document.body.appendChild(div);

        postscribe(div, html, {
          error(err) {
            window.onerror = oldOnError;
            expect(err).to.be.ok();
            finish();
          },
          done() {
            window.onerror = oldOnError;
            finish();
          }
        });
      };
    }