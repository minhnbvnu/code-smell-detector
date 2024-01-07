function reportWithPrivateMetadata() {
      if (error.metadata == null) {
        error.metadata = {};
      }
      for (let key in error.privateMetadata) {
        let value = error.privateMetadata[key];
        error.metadata[key] = value;
      }
      reportWithoutPrivateMetadata();
    }