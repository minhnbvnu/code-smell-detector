function isAnyIeVersion() {
        var agent = navigator.userAgent.toLowerCase();
        return agent.indexOf('msie') !== -1 || agent.indexOf('trident') !== -1 || agent.indexOf(' edge/') !== -1;
      }