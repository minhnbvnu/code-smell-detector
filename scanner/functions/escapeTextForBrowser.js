function escapeTextForBrowser(text) {
              if (typeof text === "boolean" || typeof text === "number") {
                return "" + text;
              }
              return escapeHtml(text);
            }