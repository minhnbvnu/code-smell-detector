function bindMenuBarDragHandles() {
	// Login screen
	document.addEventListener('DOMContentLoaded', () => {
		const loginBodyElem = document.querySelector('._3v_o');
		if (!loginBodyElem) {
			return;
		}
		const draggableHeader = document.createElement('div');
		draggableHeader.style = '-webkit-app-region: drag; height: 40px;';
		document.querySelector('body').appendChild(draggableHeader);
	});
	
	// Left column
	whenUIChromeLoaded(() => {
		const leftColumnElem = document.querySelector('._1enh._7q1s');
		const leftColumnBeforeElem = document.querySelector('._6-xk');
		const draggableLeftColumnHeaderElem = document.querySelector('.draggableLeftColumnHeader');
		if (!leftColumnElem || !leftColumnBeforeElem || draggableLeftColumnHeaderElem) {
			return;
		}
		const draggableHeader = document.createElement('div');
		draggableHeader.className = 'draggableLeftColumnHeader';
		draggableHeader.style = '-webkit-app-region: drag; height: 28px;';
		leftColumnElem.insertBefore(draggableHeader, leftColumnBeforeElem);
	});
}