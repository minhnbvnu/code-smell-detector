function find_els_at_point(xy, els, prev, zoom_cache) {
			// test for pointer-events: none: https://www.shacknews.com/article/114834/should-you-choose-vulkan-or-directx-12-in-red-dead-redemption-2
			if (false && _nir_debug_)
				console_log("find_els_at_point", deepcopy(xy), deepcopy(els), deepcopy(prev));
			var first_run = false;
			if (!prev) {
				prev = new_set();
				first_run = true;
			}
			if (zoom_cache === void 0) {
				try {
					zoom_cache = new Map();
				} catch (e) {
					zoom_cache = null;
				}
			}
			var ret = [];
			var afterret = [];
			var els_mode = get_single_setting("mouseover_find_els_mode");
			if (!els) {
				var orig_els = document.elementsFromPoint(xy[0], xy[1]);
				els = [];
				for (var _i = 0, orig_els_1 = orig_els; _i < orig_els_1.length; _i++) {
					var el_2 = orig_els_1[_i];
					if (!set_has(exclude_find_els, el_2))
						els.push(el_2);
				}
				afterret = els;
				if (_nir_debug_) {
					console_log("find_els_at_point (elsfrompoint)", deepcopy(els));
				}
				if (els_mode === "simple")
					return els;
			}
			for (var i = 0; i < els.length; i++) {
				if (i > 0 && first_run && els_mode === "hybrid") {
					ret.push(els[i]);
					continue;
				}
				var el = els[i];
				if (set_has(prev, el))
					continue;
				set_add(prev, el);
				var el_has_children = false;
				var el_children = null;
				var el_shadow_children = null;
				if (el.childElementCount > 0) {
					el_children = el.children;
					el_has_children = true;
				}
				if (el.shadowRoot && el.shadowRoot.childElementCount > 0) {
					el_shadow_children = el.shadowRoot.children;
					el_has_children = true;
				}
				// FIXME: should we stop checking if not in bounding client rect?
				// this would depend on the fact that children are always within the bounding rect
				//  - probably not, there are cases where the parent div has a size of 0, but children have proper sizes
				if (el_has_children) {
					// reverse, because the last element is (usually) the highest z
					var newchildren = [];
					if (el_children) {
						for (var j = el_children.length - 1; j >= 0; j--) {
							newchildren.push(el_children[j]);
						}
					}
					// shadow is above non-shadow?
					if (el_shadow_children) {
						for (var j = el_shadow_children.length - 1; j >= 0; j--) {
							newchildren.push(el_shadow_children[j]);
						}
					}
					var newels = find_els_at_point(xy, newchildren, prev, zoom_cache);
					for (var j = 0; j < newels.length; j++) {
						var newel = newels[j];
						//console_log("about to add", newel, deepcopy(ret))
						if (array_indexof(ret, newel) < 0) {
							//console_log("adding", newel);
							ret.push(newel);
						}
					}
				}
				// youtube links on: https://old.reddit.com/r/anime/comments/btlmky/wt_mushishi_a_beautifully_melancholic_take_on_the/
				// they pop up outside of the cursor
				var rect = get_bounding_client_rect(el, zoom_cache);
				if (rect && rect.width > 0 && rect.height > 0 &&
					rect.left <= xy[0] && rect.right >= xy[0] &&
					rect.top <= xy[1] && rect.bottom >= xy[1] &&
					array_indexof(ret, el) < 0) {
					ret.push(el);
				}
			}
			for (var i = 0; i < afterret.length; i++) {
				if (array_indexof(ret, afterret[i]) < 0)
					ret.push(afterret[i]);
			}
			if (_nir_debug_ && ret.length > 0) {
				console_log("find_els_at_point (unsorted ret)", shallowcopy(ret));
			}
			if (first_run && els_mode === "hybrid") {
				return ret;
			}
			var get_zindex_raw = function(el) {
				var zindex = get_computed_style(el).zIndex;
				var parent_zindex = 0;
				if (el.parentElement) {
					var parent_zindex = get_zindex(el.parentElement); // + 0.001; // hack: child elements appear above parent elements
					// don't use the above hack, it breaks z-ordering, the indexOf thing works already
				}
				if (zindex === "auto") {
					return parent_zindex;
				} else {
					zindex = parseFloat(zindex);
					// https://robertsspaceindustries.com/orgs/LUG/members
					if (zindex < parent_zindex)
						return parent_zindex + zindex; // hack:
					// <div style="z-index: 9"></div>
					// <div style="z-index: 10">
					//   <div style="z-index: 2">this is above z-index: 9 because it's a child of z-index: 10</div>
					// </div>
					else
						return zindex;
				}
			};
			var get_zindex = function(el) {
				if (zoom_cache) {
					var cached = map_get(zoom_cache, el);
					if (!cached || !("zIndex" in cached)) {
						var zindex = get_zindex_raw(el);
						if (cached) {
							cached.zIndex = zindex;
						} else {
							map_set(zoom_cache, el, {
								zIndex: zindex
							});
						}
						return zindex;
					} else {
						return cached.zIndex;
					}
				} else {
					return get_zindex_raw(el);
				}
			};
			// TODO: only sort elements that were added outside of elementsFromPoint
			ret.sort(function(a, b) {
				var a_zindex, b_zindex;
				a_zindex = get_zindex(a);
				b_zindex = get_zindex(b);
				//console_log(a_zindex, b_zindex, a, b);
				if (b_zindex === a_zindex) {
					// Don't modify the sort order
					return array_indexof(ret, a) - array_indexof(ret, b);
				} else {
					// opposite because we want it to be reversed (largest first)
					return b_zindex - a_zindex;
				}
			});
			if (_nir_debug_ && ret.length > 0)
				console_log("find_els_at_point (ret)", els, shallowcopy(ret), xy);
			return ret;
		}