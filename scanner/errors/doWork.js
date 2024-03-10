function doWork() {
          var endTime = (win['PR_SHOULD_USE_CONTINUATION'] ?
          clock['now']() + 250 /* ms */ :
            Infinity);
          for (; k < elements.length && clock['now']() < endTime; k++) {
            var cs = elements[k];

            // Look for a preceding comment like
            // <?prettify lang="..." linenums="..."?>
            var attrs = EMPTY;
            {
              for (var preceder = cs; (preceder = preceder.previousSibling);) {
                var nt = preceder.nodeType;
                // <?foo?> is parsed by HTML 5 to a comment node (8)
                // like <!--?foo?-->, but in XML is a processing instruction
                var value = (nt === 7 || nt === 8) && preceder.nodeValue;
                if (value
                    ? !/^\??prettify\b/.test(value)
                    : (nt !== 3 || /\S/.test(preceder.nodeValue))) {
                  // Skip over white-space text nodes but not others.
                  break;
                }
                if (value) {
                  attrs = {};
                  value.replace(
                    /\b(\w+)=([\w:.%+-]+)/g,
                    function (_, name, value) { attrs[name] = value; });
                  break;
                }
              }
            }

            var className = cs.className;
            if ((attrs !== EMPTY || prettyPrintRe.test(className))
              // Don't redo this if we've already done it.
              // This allows recalling pretty print to just prettyprint elements
              // that have been added to the page since last call.
              && !prettyPrintedRe.test(className)) {

              // make sure this is not nested in an already prettified element
              var nested = false;
              for (var p = cs.parentNode; p; p = p.parentNode) {
                var tn = p.tagName;
                if (preCodeXmpRe.test(tn)
                  && p.className && prettyPrintRe.test(p.className)) {
                  nested = true;
                  break;
                }
              }
              if (!nested) {
                // Mark done.  If we fail to prettyprint for whatever reason,
                // we shouldn't try again.
                cs.className += ' prettyprinted';

                // If the classes includes a language extensions, use it.
                // Language extensions can be specified like
                //     <pre class="prettyprint lang-cpp">
                // the language extension "cpp" is used to find a language handler
                // as passed to PR.registerLangHandler.
                // HTML5 recommends that a language be specified using "language-"
                // as the prefix instead.  Google Code Prettify supports both.
                // http://dev.w3.org/html5/spec-author-view/the-code-element.html
                var langExtension = attrs['lang'];
                if (!langExtension) {
                  langExtension = className.match(langExtensionRe);
                  // Support <pre class="prettyprint"><code class="language-c">
                  var wrapper;
                  if (!langExtension && (wrapper = childContentWrapper(cs))
                    && codeRe.test(wrapper.tagName)) {
                    langExtension = wrapper.className.match(langExtensionRe);
                  }

                  if (langExtension) { langExtension = langExtension[1]; }
                }

                var preformatted;
                if (preformattedTagNameRe.test(cs.tagName)) {
                  preformatted = 1;
                } else {
                  var currentStyle = cs['currentStyle'];
                  var defaultView = doc.defaultView;
                  var whitespace = (
                    currentStyle
                      ? currentStyle['whiteSpace']
                      : (defaultView
                    && defaultView.getComputedStyle)
                      ? defaultView.getComputedStyle(cs, null)
                      .getPropertyValue('white-space')
                      : 0);
                  preformatted = whitespace
                    && 'pre' === whitespace.substring(0, 3);
                }

                // Look for a class like linenums or linenums:<n> where <n> is the
                // 1-indexed number of the first line.
                var lineNums = attrs['linenums'];
                if (!(lineNums = lineNums === 'true' || +lineNums)) {
                  lineNums = className.match(/\blinenums\b(?::(\d+))?/);
                  lineNums =
                    lineNums
                      ? lineNums[1] && lineNums[1].length
                      ? +lineNums[1] : true
                      : false;
                }
                if (lineNums) { numberLines(cs, lineNums, preformatted); }

                // do the pretty printing
                var prettyPrintingJob = {
                  langExtension: langExtension,
                  sourceNode: cs,
                  numberLines: lineNums,
                  pre: preformatted,
                  sourceCode: null,
                  basePos: null,
                  spans: null,
                  decorations: null
                };
                applyDecorator(prettyPrintingJob);
              }
            }
          }
          if (k < elements.length) {
            // finish up in a continuation
            win.setTimeout(doWork, 250);
          } else if ('function' === typeof opt_whenDone) {
            opt_whenDone();
          }
        }