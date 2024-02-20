function checkLayers(layers) {
		for (var lid=0; lid<layers.length; lid++) {
			var layer = layers[lid];
			if (layer.visible) { // only deal with visible layers
				var checkItemGroups = [layer.pathItems, layer.symbolItems, layer.compoundPathItems];
				all_groups = [];
				traverseGroups(layer);
				// feedback.push('layer.groupItems '+layer.groupItems.length);
				// alert('groups: '+groups.length);
				for (var g=0; g<all_groups.length; g++) {
					checkItemGroups.push(all_groups[g].pathItems);
					checkItemGroups.push(all_groups[g].symbolItems);
					checkItemGroups.push(all_groups[g].compoundPathItems);
				}
				for (var cig=0; cig<checkItemGroups.length; cig++) {
					for (var item_i=0; item_i<checkItemGroups[cig].length; item_i++) {
						var check_item = checkItemGroups[cig][item_i],
							item_bnds = check_item.visibleBounds;
						// bounds are [left,-top,right,-bottom]
						if (item_bnds[0] > artbnds[2] ||
							item_bnds[2] < artbnds[0] ||
							item_bnds[1] < artbnds[3] ||
							item_bnds[3] > artbnds[1]) {
							if (!check_item.hidden) {
								hidden.push(check_item);
								check_item.hidden = true;
							}
						}
					}
				}
				if (layer.layers.length > 0) checkLayers(layer.layers);
			}
		}
		function traverseGroups(groupItems) {
			for (var g=0;g<groupItems.length;g++) {
				// check group bounds
				var bnds = groupItems[g].visibleBounds;
				if (bnds[0] > artbnds[2] || bnds[2] < artbnds[0] || bnds[1] < artbnds[3] || bnds[3] > artbnds[1]) {
					// group entirely out of artboard, so ignore
					groupItems[g].hidden = true;
					hidden.push(groupItems[g]);
				} else {
					// recursively check sub-groups
					all_groups.push(groupItems[g]);
					if (groupItems[g].groupItems.length > 0) {
						traverseGroups(groupItems[g].groupItems);
					}
				}
			}
		}
	}