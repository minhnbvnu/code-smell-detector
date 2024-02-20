function getGroupTemplate(callbackResult) {
      callbackResult = typeof callbackResult === 'undefined' ? {} : callbackResult;
      return {
        style: callbackResult.style || group.options.drawPoints.style,
        size: callbackResult.size || group.options.drawPoints.size,
        className: callbackResult.className || group.className
      };
    }