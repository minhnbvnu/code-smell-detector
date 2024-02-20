function refreshDimensions() {
      var hasData = data.length > 0;

      if (hasData && (heightData.computed || widthData.computed)) {
        computeStyleDimensions();
      }

      if (hasData && heightData.computed) {
        heightData.value = computedStyleDimensions.height;
        if (!heightData.value) {
          throw new Error('collection-repeat tried to compute the height of repeated elements "' +
            repeatExpr + '", but was unable to. Please provide the "item-height" attribute. ' +
            'http://ionicframework.com/docs/api/directive/collectionRepeat/');
        }
      } else if (!heightData.dynamic && heightData.getValue) {
        // If it's a constant with a getter (eg percent), we just refresh .value after resize
        heightData.value = heightData.getValue();
      }

      if (hasData && widthData.computed) {
        widthData.value = computedStyleDimensions.width;
        if (!widthData.value) {
          throw new Error('collection-repeat tried to compute the width of repeated elements "' +
            repeatExpr + '", but was unable to. Please provide the "item-width" attribute. ' +
            'http://ionicframework.com/docs/api/directive/collectionRepeat/');
        }
      } else if (!widthData.dynamic && widthData.getValue) {
        // If it's a constant with a getter (eg percent), we just refresh .value after resize
        widthData.value = widthData.getValue();
      }
      // Dynamic dimensions aren't updated on resize. Since they're already dynamic anyway,
      // .getValue() will be used.

      getRepeatManager().refreshLayout();
    }