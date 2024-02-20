function setApi(api) {
      if (api.isApi) {
        svc.prototype.api = api;
      } else {
        svc.prototype.api = new Api(api);
      }
    }