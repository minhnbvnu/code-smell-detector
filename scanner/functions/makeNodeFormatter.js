function makeNodeFormatter(nodeName, leftPoint, rightPoint) {
		function hasContext(node) {
			return nodeName === node.nodeName;
		}

		function clearContext(node) {
			if (nodeName === node.nodeName) {
				removeShallowAdjust(node, leftPoint, rightPoint);
			}
		}

		function clearContextRec(node) {
			Dom.walkRec(node, clearContext);
		}

		function setContext(node) {
			if (ensureWrapper(node, nodeName, hasContext, leftPoint, rightPoint)) {
				// Because the node was wrapped with a context, and if
				// the node itself has the context, it should be cleared
				// to avoid nested contexts.
				clearContextRec(node);
			} else {
				// Because the node itself has the context and was not
				// wrapped, we must only clear its children.
				Dom.walk(node.firstChild, clearContextRec);
			}
		}

		return {
			hasContext: hasContext,
			getOverride: Fn.noop,
			clearOverride: Fn.noop,
			pushDownOverride: Fn.noop,
			setContext: setContext,
			isUpperBoundary: isUpperBoundary_default
		};
	}