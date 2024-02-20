function getNonChildrenInnerMarkup(props) {
            var innerHTML = props.dangerouslySetInnerHTML;
            if (innerHTML != null) {
              if (innerHTML.__html != null) {
                return innerHTML.__html;
              }
            } else {
              var content = props.children;
              if (typeof content === "string" || typeof content === "number") {
                return escapeTextForBrowser(content);
              }
            }
            return null;
          }