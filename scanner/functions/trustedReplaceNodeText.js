function trustedReplaceNodeText(source, nodeName, textMatch, pattern, replacement) {
        var uboAliases = ["replace-node-text.js", "rpnt.js", "sed.js"];
        if (uboAliases.includes(source.name)) {
          replacement = pattern;
          pattern = textMatch;
          for (var _len = arguments.length, extraArgs = new Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
            extraArgs[_key - 5] = arguments[_key];
          }
          for (var i = 0; i < extraArgs.length; i += 1) {
            var arg = extraArgs[i];
            if (arg === "condition") {
              textMatch = extraArgs[i + 1];
              break;
            }
          }
        }
        var _parseNodeTextParams = parseNodeTextParams(nodeName, textMatch, pattern),
          selector = _parseNodeTextParams.selector,
          nodeNameMatch = _parseNodeTextParams.nodeNameMatch,
          textContentMatch = _parseNodeTextParams.textContentMatch,
          patternMatch = _parseNodeTextParams.patternMatch;
        var handleNodes = function handleNodes(nodes) {
          return nodes.forEach(function (node) {
            var shouldReplace = isTargetNode(node, nodeNameMatch, textContentMatch);
            if (shouldReplace) {
              replaceNodeText(source, node, patternMatch, replacement);
            }
          });
        };
        if (document.documentElement) {
          handleExistingNodes(selector, handleNodes);
        }
        observeDocumentWithTimeout(function (mutations) {
          return handleMutations(mutations, handleNodes);
        });
      }