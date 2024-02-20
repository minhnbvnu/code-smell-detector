function resetOverflow (el) {
		if (!isInitialized()) return;
		if (this && this.tagName) el = this; // BOUND to element
		var $P;
		if (isStr(el))
			$P = $Ps[el];
		else if ($(el).data("layoutRole"))
			$P = $(el);
		else
			$(el).parents().each(function(){
				if ($(this).data("layoutRole")) {
					$P = $(this);
					return false; // BREAK
				}
			});
		if (!$P || !$P.length) return; // INVALID

		var
			pane	= $P.data("layoutEdge")
		,	s		= state[pane]
		,	CSS		= s.cssSaved || {}
		;
		// reset the zIndex
		if (!s.isSliding && !s.isResizing)
			$P.css("zIndex", options.zIndexes.pane_normal);

		// reset Overflow - if necessary
		$P.css( CSS );

		// clear var
		s.cssSaved = false;
	}