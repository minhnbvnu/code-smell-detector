function basicFixture(loc) {
      return new Promise((resolve, reject) => {
        fixture(html`<api-console modelLocation="${loc}"></api-console>`)
          .then((element) => {
            element.addEventListener('model-load-success', () => resolve(element));
            element.addEventListener('model-load-error', () => reject(element));
          })
      });
    }