function DragBehavior(blockObject) {
		this.blockObject = blockObject;
		this.$element = blockObject.$element;
		this.insertBeforeOrAfterMode = false;
		if (this.$element[0].nodeName === 'DIV') {
			// this drag/drop behaviour is only suitable for DIV-blocks
			// inline drag/drop is initialized somewhere else (block.js)
			this.setDraggable();
		}
	}