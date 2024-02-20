function Matomo(source) {
      var Tracker = function Tracker() {};
      Tracker.prototype.setDoNotTrack = noopFunc;
      Tracker.prototype.setDomains = noopFunc;
      Tracker.prototype.setCustomDimension = noopFunc;
      Tracker.prototype.trackPageView = noopFunc;
      var AsyncTracker = function AsyncTracker() {};
      AsyncTracker.prototype.addListener = noopFunc;
      var matomoWrapper = {
        getTracker: Tracker,
        getAsyncTracker: AsyncTracker
      };
      window.Piwik = matomoWrapper;
      hit(source);
    }