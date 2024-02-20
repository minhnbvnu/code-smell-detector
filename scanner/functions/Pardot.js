function Pardot(source) {
      window.piVersion = '1.0.2';
      window.piScriptNum = 0;
      window.piScriptObj = [];
      window.checkNamespace = noopFunc;
      window.getPardotUrl = noopStr;
      window.piGetParameter = noopNull;
      window.piSetCookie = noopFunc;
      window.piGetCookie = noopStr;
      function piTracker() {
        window.pi = {
          tracker: {
            visitor_id: '',
            visitor_id_sign: '',
            pi_opt_in: '',
            campaign_id: ''
          }
        };
        window.piScriptNum += 1;
      }
      window.piResponse = noopFunc;
      window.piTracker = piTracker;
      piTracker();
      hit(source);
    }