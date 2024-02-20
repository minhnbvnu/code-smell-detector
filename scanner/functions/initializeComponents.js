function initializeComponents() {
		var left = Ui.getAdoptedComponent('alignLeft');
		var right = Ui.getAdoptedComponent('alignRight');
		var center = Ui.getAdoptedComponent('alignCenter');
		var alignLeft = function () {
			center.setState(false);
			right.setState(false);
			if (BlockManager._activeBlock) {
				var alignment = BlockManager._activeBlock.attr('align');
				BlockManager._activeBlock.attr('align',
					('left' === alignment) ? 'none' : 'left');
				return true;
			}
			return false;
		};
		var alignRight = function () {
			left.setState(false);
			center.setState(false);
			if (BlockManager._activeBlock) {
				var alignment = BlockManager._activeBlock.attr('align');
				BlockManager._activeBlock.attr('align',
					('right' === alignment) ? 'none' : 'right');
				return true;
			}
			return false;
		};
		var alignCenter = function () {
			left.setState(false);
			right.setState(false);
			if (BlockManager._activeBlock) {
				BlockManager._activeBlock.attr('align', 'center');
				return true;
			}
			return false;
		}

		if (left) {
			var clickLeft = left.click;
			left.click = function () {
				if (!alignLeft()) {
					clickLeft();
				}
			};
			components.push(left);
		} else {
			components.push(Ui.adopt('imgAlignLeft', ToggleButton, {
				tooltip: 'Align left',
				text: 'Align left',
				click: alignLeft
			}));
		}

		if (right) {
			var clickRight = right.click;
			right.click = function () {
				if (!alignRight()) {
					clickRight();
				}
			};
			components.push(right);
		} else {
			components.push(Ui.adopt('imgAlignRight', ToggleButton, {
				tooltip: 'Align right',
				text: 'Align right',
				click: alignRight
			}));
		}

		if (center) {
			var clickCenter = center.click;
			center.click = function () {
				if (!alignCenter()) {
					clickCenter();
				}
			};
			components.push(center);
		} else {
			components.push(Ui.adopt('imgAlignCenter', ToggleButton, {
				tooltip: 'Align center',
				text: 'Align center',
				click: alignCenter
			}));
		}

		components.push(Ui.adopt('imgAlignClear', ToggleButton, {
			tooltip: 'Remove alignment',
			text: 'Remove alignment',
			click: function () {
				if (BlockManager._activeBlock) {
					BlockManager._activeBlock.attr('align', 'none');
				}
			}
		}));
	}