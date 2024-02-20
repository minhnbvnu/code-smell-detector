function bindDock() {
	document.addEventListener('DOMContentLoaded', () => {
		const titleObserver = new MutationObserver(mutations => {
			mutations.forEach((mutation) => {
				const title = mutation.target.text;
				if (title === 'Messenger') {
					// All notifications cleared, set to zero.
					//
					// Note, seems like most languages reset title back to "Messenger" 
					// after notifications cleared
					ipcRenderer.send(constants.DOCK_COUNT, 0);
					return;
				}
				
				if (!title.startsWith('(')) {
					// Flickers between "x messaged you" and "(x) Messenger".
					//
					// Note: We don't check text fragment here as "messaged you" could 
					// be localized
					return;
				}

				const currentDockCount = parseInt(title.substr(1, (title.lastIndexOf(')') - 1))) || 0;
				ipcRenderer.send(constants.DOCK_COUNT, currentDockCount);
			});
		});
		
		titleObserver.observe(
			document.querySelector('title'), 
			{
				characterData: true,
				subtree: true,
				childList: true,
			}
		);
	});
}