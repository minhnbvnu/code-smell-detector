function testBeforeWriteTokenCalled(name, html, type, expectedAmount) {
    it(name, done => {
      let amount = 0;
      const div = document.createElement('div');
      div.id = name.replace(/\s/g, '-');
      document.body.appendChild(div);
      postscribe(div, html, {
        beforeWriteToken: tok => {
          if (tok.tagName === type && tok.type !== 'endTag') {
            amount++;
          }
          return tok;
        },
        done: () => {
          expect(amount === expectedAmount).to.be.ok();
          done();
        }
      });
    });
  }