function viewportUpdate() {
  // unit tests in viewport.unit.js

  var initWidth = viewportProperties.width;
  var initHeight = viewportProperties.height;
  var p = ionic.Platform;
  var version = p.version();
  var DEVICE_WIDTH = 'device-width';
  var DEVICE_HEIGHT = 'device-height';
  var orientation = ionic.viewport.orientation();

  // Most times we're removing the height and adding the width
  // So this is the default to start with, then modify per platform/version/oreintation
  delete viewportProperties.height;
  viewportProperties.width = DEVICE_WIDTH;

  if (p.isIPad()) {
    // iPad

    if (version > 7) {
      // iPad >= 7.1
      // https://issues.apache.org/jira/browse/CB-4323
      delete viewportProperties.width;

    } else {
      // iPad <= 7.0

      if (p.isWebView()) {
        // iPad <= 7.0 WebView

        if (orientation == 90) {
          // iPad <= 7.0 WebView Landscape
          viewportProperties.height = '0';

        } else if (version == 7) {
          // iPad <= 7.0 WebView Portait
          viewportProperties.height = DEVICE_HEIGHT;
        }
      } else {
        // iPad <= 6.1 Browser
        if (version < 7) {
          viewportProperties.height = '0';
        }
      }
    }

  } else if (p.isIOS()) {
    // iPhone

    if (p.isWebView()) {
      // iPhone WebView

      if (version > 7) {
        // iPhone >= 7.1 WebView
        delete viewportProperties.width;

      } else if (version < 7) {
        // iPhone <= 6.1 WebView
        // if height was set it needs to get removed with this hack for <= 6.1
        if (initHeight) viewportProperties.height = '0';

      } else if (version == 7) {
        //iPhone == 7.0 WebView
        viewportProperties.height = DEVICE_HEIGHT;
      }

    } else {
      // iPhone Browser

      if (version < 7) {
        // iPhone <= 6.1 Browser
        // if height was set it needs to get removed with this hack for <= 6.1
        if (initHeight) viewportProperties.height = '0';
      }
    }

  }

  // only update the viewport tag if there was a change
  if (initWidth !== viewportProperties.width || initHeight !== viewportProperties.height) {
    viewportTagUpdate();
  }
}