function pushStyle(target, responseState, style) {
              if (typeof style !== "object") {
                throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
              }
              var isFirst = true;
              for (var styleName in style) {
                if (!hasOwnProperty.call(style, styleName)) {
                  continue;
                }
                var styleValue = style[styleName];
                if (styleValue == null || typeof styleValue === "boolean" || styleValue === "") {
                  continue;
                }
                var nameChunk = void 0;
                var valueChunk = void 0;
                var isCustomProperty = styleName.indexOf("--") === 0;
                if (isCustomProperty) {
                  nameChunk = stringToChunk(escapeTextForBrowser(styleName));
                  {
                    checkCSSPropertyStringCoercion(styleValue, styleName);
                  }
                  valueChunk = stringToChunk(escapeTextForBrowser(("" + styleValue).trim()));
                } else {
                  {
                    warnValidStyle$1(styleName, styleValue);
                  }
                  nameChunk = processStyleName(styleName);
                  if (typeof styleValue === "number") {
                    if (styleValue !== 0 && !hasOwnProperty.call(isUnitlessNumber, styleName)) {
                      valueChunk = stringToChunk(styleValue + "px");
                    } else {
                      valueChunk = stringToChunk("" + styleValue);
                    }
                  } else {
                    {
                      checkCSSPropertyStringCoercion(styleValue, styleName);
                    }
                    valueChunk = stringToChunk(escapeTextForBrowser(("" + styleValue).trim()));
                  }
                }
                if (isFirst) {
                  isFirst = false;
                  target.push(styleAttributeStart, nameChunk, styleAssign, valueChunk);
                } else {
                  target.push(styleSeparator, nameChunk, styleAssign, valueChunk);
                }
              }
              if (!isFirst) {
                target.push(attributeEnd);
              }
            }