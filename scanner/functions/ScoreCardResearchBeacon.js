function ScoreCardResearchBeacon(source) {
      window.COMSCORE = {
        purge() {
          // eslint-disable-next-line no-underscore-dangle
          window._comscore = [];
        },
        beacon() {}
      };
      hit(source);
    }