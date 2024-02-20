function pointEvent( type, clientX, clientY ) {
		let event = { clientX, clientY, altKey, shiftKey };
		return type === 'touch' ? { touches: [ event ] } : event;
	}