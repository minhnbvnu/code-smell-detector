function itCallsEvent(name, src, callCount = 1) {
    it(callCount === 0 ? `does not call ${name} for ${src}` : `calls ${name} for ${src}`, done => {
      const handlerName = `postscribe_${name}_handler`;
      window[handlerName] = sinon.spy();

      const options = {};
      options.done = () => {
        expect(window[handlerName].callCount).to.be.equal(callCount);
        done();
      };
      options.error = err => {
        console.error(err);
      };

      postscribe(document.body, `<script ${name}="${handlerName}();" src="${src}"></script>`, options);
    });
  }