function getPlacementStyle(placement) {
	    var style = void 0;
	    switch (placement) {
	        case 'topLeft':
	            style = {
	                left: 0,
	                top: defaultTop,
	                bottom: 'auto'
	            };
	            break;
	        case 'topRight':
	            style = {
	                right: 0,
	                top: defaultTop,
	                bottom: 'auto'
	            };
	            break;
	        case 'bottomLeft':
	            style = {
	                left: 0,
	                top: 'auto',
	                bottom: defaultBottom
	            };
	            break;
	        default:
	            style = {
	                right: 0,
	                top: 'auto',
	                bottom: defaultBottom
	            };
	            break;
	    }
	    return style;
	}