function reportWithoutPrivateMetadata() {
      if (dismissSubscription) {
        dismissSubscription.dispose();
      }
      delete error.privateMetadata;
      delete error.privateMetadataDescription;
      reportFn(error);
      if (notification) {
        notification.dismiss();
      }
    }