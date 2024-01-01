function tickTime (time, delta) {
      var key;
      for (key in tickProperties) {
        tickProperties[key] = time;
      }
      self.shader.update(tickProperties);
    }