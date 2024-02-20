function cloneCanvas() {
	        //create a new canvas
	        var newCanvas = document.createElement('canvas');
	        var context = newCanvas.getContext('2d');

	        //set dimensions
	        newCanvas.width = htmlElement.width;
	        newCanvas.height = htmlElement.height;

	        //apply the old canvas to the new one
	        context.drawImage(htmlElement, 0, 0);

	        //return the new canvas
	        return newCanvas;
	    }