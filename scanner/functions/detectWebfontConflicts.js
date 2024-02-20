function detectWebfontConflicts() {
    var linkTags = Array.from(DOCUMENT.getElementsByTagName('link')).filter(function (t) {
      return !t.hasAttribute(detectionIgnoreAttr);
    });
    var styleTags = Array.from(DOCUMENT.getElementsByTagName('style')).filter(function (t) {
      if (t.hasAttribute(detectionIgnoreAttr)) {
        return false;
      } // If the browser has loaded the FA5 CSS, let's not test that <style> element.
      // Its enough that we'll be testing for traces of the corresponding JS being loaded, and testing
      // this <style> would only produce a false negative anyway.


      if (WINDOW.FontAwesomeConfig && t.innerText.match(new RegExp("svg:not\\(:root\\)\\.".concat(WINDOW.FontAwesomeConfig.replacementClass)))) {
        return false;
      }

      return true;
    });

    function runDiag(scriptOrLinkTag, md5) {
      var diagFrame = DOCUMENT.createElement('iframe'); // Using "visibility: hidden; position: absolute" instead of "display: none;" because
      // Firefox will not return the expected results for getComputedStyle if our iframe has display: none.

      diagFrame.setAttribute('style', 'visibility: hidden; position: absolute; height: 0; width: 0;');
      var testIconId = 'fa-test-icon-' + md5;
      var iTag = DOCUMENT.createElement('i');
      iTag.setAttribute('class', 'fa fa-coffee');
      iTag.setAttribute('id', testIconId);
      var diagScript = DOCUMENT.createElement('script');
      diagScript.setAttribute('id', diagScriptId); // WARNING: this function will be toString()'d and assigned to innerText of the diag script
      // element that we'll be putting into a diagnostic iframe.
      // That means that this code won't compile until after the outer script has run and injected
      // this code into the iframe. There are some compile time errors that might occur there.
      // For example, using single line (double-slash) comments like this one inside that function
      // will probably cause it to choke. Chrome will show an error like this:
      // Uncaught SyntaxError: Unexpected end of input

      var diagScriptFun = function diagScriptFun(nodeUnderTestId, testIconId, md5, parentOrigin) {
        parent.FontAwesomeDetection.__pollUntil({
          fn: function fn() {
            var iEl = document.getElementById(testIconId);
            var computedStyle = window.getComputedStyle(iEl);
            var fontFamily = computedStyle.getPropertyValue('font-family');

            if (!!fontFamily.match(/FontAwesome/) || !!fontFamily.match(/Font Awesome 5/)) {
              return true;
            } else {
              return false;
            }
          }
        }).then(function () {
          var node = document.getElementById(nodeUnderTestId);
          parent.postMessage({
            type: 'fontawesome-conflict',
            technology: 'webfont',
            href: node.href,
            innerText: node.innerText,
            tagName: node.tagName,
            md5: md5
          }, parentOrigin);
        }).catch(function (e) {
          var node = document.getElementById(nodeUnderTestId);

          if (e === 'timeout') {
            parent.postMessage({
              type: 'no-conflict',
              technology: 'webfont',
              href: node.src,
              innerText: node.innerText,
              tagName: node.tagName,
              md5: md5
            }, parentOrigin);
          } else {
            console.error(e);
          }
        });
      };

      var parentOrigin = WINDOW.location.origin === 'file://' ? '*' : WINDOW.location.origin;
      diagScript.innerText = "(".concat(diagScriptFun.toString(), ")('").concat(nodeUnderTestId, "', '").concat(testIconId || 'foo', "', '").concat(md5, "', '").concat(parentOrigin, "');");

      diagFrame.onload = function () {
        diagFrame.contentWindow.addEventListener('error', silenceErrors, true);
        diagFrame.contentDocument.head.appendChild(diagScript);
        diagFrame.contentDocument.head.appendChild(scriptOrLinkTag);
        diagFrame.contentDocument.body.appendChild(iTag);
      };

      domready(function () {
        return DOCUMENT.body.appendChild(diagFrame);
      });
    }

    var cssByMD5 = {};

    for (var i = 0; i < linkTags.length; i++) {
      var linkUnderTest = DOCUMENT.createElement('link');
      linkUnderTest.setAttribute('id', nodeUnderTestId);
      linkUnderTest.setAttribute('href', linkTags[i].href);
      linkUnderTest.setAttribute('rel', linkTags[i].rel);
      var md5ForLink = md5ForNode(linkTags[i]);
      linkUnderTest.setAttribute(md5Attr, md5ForLink);
      cssByMD5[md5ForLink] = linkTags[i];
      runDiag(linkUnderTest, md5ForLink);
    }

    for (var _i = 0; _i < styleTags.length; _i++) {
      var styleUnderTest = DOCUMENT.createElement('style');
      styleUnderTest.setAttribute('id', nodeUnderTestId);
      var md5ForStyle = md5ForNode(styleTags[_i]);
      styleUnderTest.setAttribute(md5Attr, md5ForStyle);
      styleUnderTest.innerText = styleTags[_i].innerText;
      cssByMD5[md5ForStyle] = styleTags[_i];
      runDiag(styleUnderTest, md5ForStyle);
    }

    return cssByMD5;
  }