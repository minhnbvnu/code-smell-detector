function getAlignmentButton(alignment) {
		switch (alignment) {
		case 'left':
			return Ui.getAdoptedComponent('alignLeft');
		case 'center':
			return Ui.getAdoptedComponent('alignCenter');
		case 'right':
			return Ui.getAdoptedComponent('alignRight');
		}
		return null;
	}