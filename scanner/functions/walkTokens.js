function walkTokens(tokens) {
                        for (var i = 0; i < tokens.length; i++) {
                          if (j >= keys.length) {
                            break;
                          }
                          var token = tokens[i];
                          if (typeof token === 'string' || token.content && typeof token.content === 'string') {
                            var k = keys[j];
                            var t = env.tokenStack[k];
                            var s = typeof token === 'string' ? token : token.content;
                            var placeholder = getPlaceholder(language, k);
                            var index = s.indexOf(placeholder);
                            if (index > -1) {
                              ++j;
                              var before = s.substring(0, index);
                              var middle = new Prism.Token(language, Prism.tokenize(t, env.grammar), 'language-' + language, t);
                              var after = s.substring(index + placeholder.length);
                              var replacement = [];
                              if (before) {
                                replacement.push.apply(replacement, walkTokens([before]));
                              }
                              replacement.push(middle);
                              if (after) {
                                replacement.push.apply(replacement, walkTokens([after]));
                              }
                              if (typeof token === 'string') {
                                tokens.splice.apply(tokens, [
                                  i,
                                  1
                                ].concat(replacement));
                              } else {
                                token.content = replacement;
                              }
                            }
                          } else if (token.content) {
                            walkTokens(token.content);
                          }
                        }
                        return tokens;
                      }