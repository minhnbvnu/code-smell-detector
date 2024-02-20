function trustedReplaceNodeText$1(source, nodeName, textMatch, pattern, replacement) {
      var uboAliases = ['replace-node-text.js', 'rpnt.js', 'sed.js'];

      /**
       * UBO replaceNodeText scriptlet has different signature:
       * function replaceNodeText(nodeName, pattern, replacement, ...extraArgs) {...}
       *
       * with extra params being passed as ['paramname', paramvalue]
       */
      if (uboAliases.includes(source.name)) {
        replacement = pattern;
        pattern = textMatch;
        // eslint-disable-next-line prefer-destructuring, prefer-rest-params
        for (var _len = arguments.length, extraArgs = new Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
          extraArgs[_key - 5] = arguments[_key];
        }
        for (var i = 0; i < extraArgs.length; i += 1) {
          var arg = extraArgs[i];
          if (arg === 'condition') {
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
            replaceNodeText(source, node, patternMatch, replacement);
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