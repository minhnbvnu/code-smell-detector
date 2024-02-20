function onCodeEditorDividerDrag(event) {
    if (codeEditorDividerInDrag) {
	const codePlusFrame = document.getElementById('codePlusFrame');
        const topHeight = Math.min(codePlusFrame.clientHeight - 6, Math.max(0, event.clientY - 26 - 24));
	codePlusFrame.style.gridTemplateRows = `auto ${topHeight}px auto 1fr`;
        localStorage.setItem('codeDividerTop', Math.round(topHeight));
	event.preventDefault();
        
        // Do not resize the aceEditor while dragging most of the time--it is slow. Wait until onCodeEditorDividerDragEnd()
        if (Math.random() < 0.07) {
            aceEditor.resize();
        }
    }
}