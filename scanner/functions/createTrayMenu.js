function createTrayMenu() {
	const menu = new Menu();

	menu.append(new MenuItem({
		label: currentProject.name,
		submenu: createProjectMenu()
	}));

	if (currentProject.tasks && currentProject.tasks.length > 0) {
		menu.append(new MenuItem({type: 'separator'}));

		for (const el of currentProject.tasks) {
			menu.append(new MenuItem({
				label: el,
				click() {
					runTask(el);
				}
			}));
		}
	}

	menu.append(new MenuItem({type: 'separator'}));
	menu.append(new MenuItem({
		label: process.platform === 'darwin' ? `Quit ${app.getName()}` : 'Quit',
		click: app.quit
	}));

	tray.setContextMenu(menu);

	return menu;
}