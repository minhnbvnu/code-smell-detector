function drawMousePath(mouseX, mouseY) {
        if (painting == 'undo') {
            paintColor = "#ffffff"
        }
        if (painting == 'blur') {
            paintColor = "#000000"
        }
        else if (painting == 'paint') {
            paintColor = (paintColorForm.style.backgroundColor)// change to color
        }
    switch(brush){
		case 'round':
			interpolatePath(ctx, lastPos.x, lastPos.y, mouseX, mouseY, brushSize);
    		interpolatePath(tempCtx, lastPos.x, lastPos.y, mouseX, mouseY, brushSize);
			break;
		case 'area':
			areaDraw(ctx, mouseX, mouseY, true);
			areaDraw(tempCtx, mouseX, mouseY, false);
			break;
        case 'tap':
            tapDraw(ctx, mouseX, mouseY, brushSize);
            tapDraw(tempCtx, mouseX, mouseY, brushSize);
            break;
		default:
			//this means that brush had either no value or an unlisted value, which should never happen
			console.log('brush switch error')
	}
}