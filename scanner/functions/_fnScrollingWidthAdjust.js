function _fnScrollingWidthAdjust ( oSettings, n )
		{
			if ( oSettings.oScroll.sX === "" && oSettings.oScroll.sY !== "" )
			{
				/* When y-scrolling only, we want to remove the width of the scroll bar so the table
				 * + scroll bar will fit into the area avaialble.
				 */
				var iOrigWidth = $(n).width();
				n.style.width = _fnStringToCss( $(n).outerWidth()-oSettings.oScroll.iBarWidth );
			}
			else if ( oSettings.oScroll.sX !== "" )
			{
				/* When x-scrolling both ways, fix the table at it's current size, without adjusting */
				n.style.width = _fnStringToCss( $(n).outerWidth() );
			}
		}