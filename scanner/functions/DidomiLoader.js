function DidomiLoader(source) {
      function UserConsentStatusForVendorSubscribe() {}
      UserConsentStatusForVendorSubscribe.prototype.filter = function () {
        return new UserConsentStatusForVendorSubscribe();
      };
      UserConsentStatusForVendorSubscribe.prototype.subscribe = noopFunc;
      function UserConsentStatusForVendor() {}
      UserConsentStatusForVendor.prototype.first = function () {
        return new UserConsentStatusForVendorSubscribe();
      };
      UserConsentStatusForVendor.prototype.filter = function () {
        return new UserConsentStatusForVendorSubscribe();
      };
      UserConsentStatusForVendor.prototype.subscribe = noopFunc;
      var DidomiWrapper = {
        isConsentRequired: falseFunc,
        getUserConsentStatusForPurpose: trueFunc,
        getUserConsentStatus: trueFunc,
        getUserStatus: noopFunc,
        getRequiredPurposes: noopArray,
        getUserConsentStatusForVendor: trueFunc,
        Purposes: {
          Cookies: 'cookies'
        },
        notice: {
          configure: noopFunc,
          hide: noopFunc,
          isVisible: falseFunc,
          show: noopFunc,
          showDataProcessing: trueFunc
        },
        isUserConsentStatusPartial: falseFunc,
        on() {
          return {
            actions: {},
            emitter: {},
            services: {},
            store: {}
          };
        },
        shouldConsentBeCollected: falseFunc,
        getUserConsentStatusForAll: noopFunc,
        getObservableOnUserConsentStatusForVendor() {
          return new UserConsentStatusForVendor();
        }
      };
      window.Didomi = DidomiWrapper;
      var didomiStateWrapper = {
        didomiExperimentId: '',
        didomiExperimentUserGroup: '',
        didomiGDPRApplies: 1,
        didomiIABConsent: '',
        didomiPurposesConsent: '',
        didomiPurposesConsentDenied: '',
        didomiPurposesConsentUnknown: '',
        didomiVendorsConsent: '',
        didomiVendorsConsentDenied: '',
        didomiVendorsConsentUnknown: '',
        didomiVendorsRawConsent: '',
        didomiVendorsRawConsentDenied: '',
        didomiVendorsRawConsentUnknown: ''
      };
      window.didomiState = didomiStateWrapper;
      var tcData = {
        eventStatus: 'tcloaded',
        gdprApplies: false,
        listenerId: noopFunc,
        vendor: {
          consents: []
        },
        purpose: {
          consents: []
        }
      };

      // https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md#how-does-the-cmp-provide-the-api
      var __tcfapiWrapper = function __tcfapiWrapper(command, version, callback) {
        if (typeof callback !== 'function' || command === 'removeEventListener') {
          return;
        }
        callback(tcData, true);
      };
      window.__tcfapi = __tcfapiWrapper;
      var didomiEventListenersWrapper = {
        stub: true,
        push: noopFunc
      };
      window.didomiEventListeners = didomiEventListenersWrapper;
      var didomiOnReadyWrapper = {
        stub: true,
        push(arg) {
          if (typeof arg !== 'function') {
            return;
          }
          if (document.readyState !== 'complete') {
            window.addEventListener('load', function () {
              setTimeout(arg(window.Didomi));
            });
          } else {
            setTimeout(arg(window.Didomi));
          }
        }
      };
      window.didomiOnReady = window.didomiOnReady || didomiOnReadyWrapper;
      if (Array.isArray(window.didomiOnReady)) {
        window.didomiOnReady.forEach(function (arg) {
          if (typeof arg === 'function') {
            try {
              setTimeout(arg(window.Didomi));
            } catch (e) {
              /* empty */
            }
          }
        });
      }
      hit(source);
    }