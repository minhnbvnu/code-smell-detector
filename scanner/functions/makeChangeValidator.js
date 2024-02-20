function makeChangeValidator() {
      var self;
      return (self = {
        dataLength: 0,
        width: 0,
        height: 0,
        // A resize triggers a refresh only if we have data, the scrollView has size,
        // and the size has changed.
        resizeRequiresRefresh: function(newWidth, newHeight) {
          var requiresRefresh = self.dataLength && newWidth && newHeight &&
            (newWidth !== self.width || newHeight !== self.height);

          self.width = newWidth;
          self.height = newHeight;

          return !!requiresRefresh;
        },
        // A change in data only triggers a refresh if the data has length, or if the data's
        // length is less than before.
        dataChangeRequiresRefresh: function(newData) {
          var requiresRefresh = newData.length > 0 || newData.length < self.dataLength;

          self.dataLength = newData.length;

          return !!requiresRefresh;
        }
      });
    }