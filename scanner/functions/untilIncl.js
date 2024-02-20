function untilIncl(node) {
			return (null != getOverride(node)
					|| hasContext(node)
					|| isReusable(node)
					|| isUpperBoundary(node));
		}