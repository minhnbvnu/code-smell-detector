function buildTest(data, file) {

  if (data.live_environment === false) {
    return;
  }

  if (data.ignore) {
    return;
  }

  describeForTest(data, `${data.description} ('${file}')`, () => {
    let spy, rootDirPath;

    const root = () => rootDirPath;

    beforeEach('package activation', () => {
      rootDirPath = fsp.absolute(temp.mkdirSync('kite'));
      spy = sinon.spy(KiteAPI, 'request');
      kite._activate();
    })
    afterEach('package deactivation', () => {
      spy.restore();
      kite.deactivate();
    })

    withKite(kiteSetup(data.setup.kited), () => {
      const block = () => {
        data.test.reverse().reduce((f, s) => {
          switch (s.step) {
            case 'action':
              return buildAction(s, f, root);
            case 'expect':
              return buildExpectation(s, f, root);
            case 'expect_not':
              return buildExpectation(s, f, root, true);
            default:
              return f;
          }
        }, () => {})();
      };

      if(!inLiveEnvironment()) {
        block();
      } else {
        beforeEach('live setup', () => {
          KiteConnect.client = new NodeClient('localhost', '56624');
          return KiteConnect.request({
            path: '/testapi/request-history/reset',
            method: 'POST',
          });
        });

        block();
      }
    });
  });
}