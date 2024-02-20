function removeNodeText$1(source, nodeName, textMatch) {
      var _parseNodeTextParams = parseNodeTextParams(nodeName, textMatch),
        selector = _parseNodeTextParams.selector,
        nodeNameMatch = _parseNodeTextParams.nodeNameMatch,
        textContentMatch = _parseNodeTextParams.textContentMatch;

      /**
       * Handles nodes by removing text content of matched nodes
       *
       * Note: instead of drilling down all the arguments for both replace-node-text
       * and trusted-replace-node-text scriptlets, only the handler is being passed
       *
       * @param {Node[]} nodes nodes to handle
       * @returns {void}
       */
      var handleNodes = function handleNodes(nodes) {
        return nodes.forEach(function (node) {
          var shouldReplace = isTargetNode(node, nodeNameMatch, textContentMatch);
          if (shouldReplace) {
            var ALL_TEXT_PATTERN = /^[\s\S]*$/;
            var REPLACEMENT = '';
            replaceNodeText(source, node, ALL_TEXT_PATTERN, REPLACEMENT);
          }
        });
      };

      // Apply dedicated handler to already rendered nodes...
      if (document.documentElement) {
        handleExistingNodes(selector, handleNodes);
      }

      // and newly added nodes
      observeDocumentWithTimeout(function (mutations) {
        return handleMutations(mutations, handleNodes);
      });
    }