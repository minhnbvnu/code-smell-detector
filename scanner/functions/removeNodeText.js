function removeNodeText(source, nodeName, textMatch) {
        var _parseNodeTextParams = parseNodeTextParams(nodeName, textMatch),
          selector = _parseNodeTextParams.selector,
          nodeNameMatch = _parseNodeTextParams.nodeNameMatch,
          textContentMatch = _parseNodeTextParams.textContentMatch;
        var handleNodes = function handleNodes(nodes) {
          return nodes.forEach(function (node) {
            var shouldReplace = isTargetNode(node, nodeNameMatch, textContentMatch);
            if (shouldReplace) {
              var ALL_TEXT_PATTERN = /^[\s\S]*$/;
              var REPLACEMENT = "";
              replaceNodeText(source, node, ALL_TEXT_PATTERN, REPLACEMENT);
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