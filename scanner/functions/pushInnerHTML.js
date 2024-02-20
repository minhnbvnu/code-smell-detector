function pushInnerHTML(target, innerHTML, children) {
              if (innerHTML != null) {
                if (children != null) {
                  throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
                }
                if (typeof innerHTML !== "object" || !("__html" in innerHTML)) {
                  throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
                }
                var html = innerHTML.__html;
                if (html !== null && html !== void 0) {
                  {
                    checkHtmlStringCoercion(html);
                  }
                  target.push(stringToChunk("" + html));
                }
              }
            }