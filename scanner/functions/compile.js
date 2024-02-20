function compile($compileNodes, transcludeFn, maxPriority, ignoreDirective,
                        previousCompileContext) {
      if (!($compileNodes instanceof jqLite)) {
        // jquery always rewraps, whereas we need to preserve the original selector so that we can
        // modify it.
        $compileNodes = jqLite($compileNodes);
      }

      var NOT_EMPTY = /\S+/;

      // We can not compile top level text elements since text nodes can be merged and we will
      // not be able to attach scope data to them, so we will wrap them in <span>
      for (var i = 0, len = $compileNodes.length; i < len; i++) {
        var domNode = $compileNodes[i];

        if (domNode.nodeType === NODE_TYPE_TEXT && domNode.nodeValue.match(NOT_EMPTY) /* non-empty */) {
          jqLiteWrapNode(domNode, $compileNodes[i] = document.createElement('span'));
        }
      }

      var compositeLinkFn =
              compileNodes($compileNodes, transcludeFn, $compileNodes,
                           maxPriority, ignoreDirective, previousCompileContext);
      compile.$$addScopeClass($compileNodes);
      var namespace = null;
      return function publicLinkFn(scope, cloneConnectFn, options) {
        assertArg(scope, 'scope');

        if (previousCompileContext && previousCompileContext.needsNewScope) {
          // A parent directive did a replace and a directive on this element asked
          // for transclusion, which caused us to lose a layer of element on which
          // we could hold the new transclusion scope, so we will create it manually
          // here.
          scope = scope.$parent.$new();
        }

        options = options || {};
        var parentBoundTranscludeFn = options.parentBoundTranscludeFn,
          transcludeControllers = options.transcludeControllers,
          futureParentElement = options.futureParentElement;

        // When `parentBoundTranscludeFn` is passed, it is a
        // `controllersBoundTransclude` function (it was previously passed
        // as `transclude` to directive.link) so we must unwrap it to get
        // its `boundTranscludeFn`
        if (parentBoundTranscludeFn && parentBoundTranscludeFn.$$boundTransclude) {
          parentBoundTranscludeFn = parentBoundTranscludeFn.$$boundTransclude;
        }

        if (!namespace) {
          namespace = detectNamespaceForChildElements(futureParentElement);
        }
        var $linkNode;
        if (namespace !== 'html') {
          // When using a directive with replace:true and templateUrl the $compileNodes
          // (or a child element inside of them)
          // might change, so we need to recreate the namespace adapted compileNodes
          // for call to the link function.
          // Note: This will already clone the nodes...
          $linkNode = jqLite(
            wrapTemplate(namespace, jqLite('<div>').append($compileNodes).html())
          );
        } else if (cloneConnectFn) {
          // important!!: we must call our jqLite.clone() since the jQuery one is trying to be smart
          // and sometimes changes the structure of the DOM.
          $linkNode = JQLitePrototype.clone.call($compileNodes);
        } else {
          $linkNode = $compileNodes;
        }

        if (transcludeControllers) {
          for (var controllerName in transcludeControllers) {
            $linkNode.data('$' + controllerName + 'Controller', transcludeControllers[controllerName].instance);
          }
        }

        compile.$$addScopeInfo($linkNode, scope);

        if (cloneConnectFn) cloneConnectFn($linkNode, scope);
        if (compositeLinkFn) compositeLinkFn(scope, $linkNode, $linkNode, parentBoundTranscludeFn);
        return $linkNode;
      };
    }