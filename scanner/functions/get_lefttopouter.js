function get_lefttopouter() {
					var style = outerdiv.currentStyle || window.getComputedStyle(outerdiv);
					return [style.marginLeft + style.borderLeftWidth,
						style.marginTop + style.borderTopWidth];
				}