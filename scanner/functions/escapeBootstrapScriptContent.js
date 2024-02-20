function escapeBootstrapScriptContent(scriptText) {
              {
                checkHtmlStringCoercion(scriptText);
              }
              return ("" + scriptText).replace(scriptRegex, scriptReplacer);
            }