function createProjectMenu() {
	const menu = new Menu();

	if (process.platform === 'darwin' || process.platform === 'win32') {
		menu.append(new MenuItem({
			label: 'Follow Finder',
			type: 'checkbox',
			checked: true
		}));

		menu.append(new MenuItem({type: 'separator'}));
	}

	if (recentProjects.length > 0) {
		for (const el of recentProjects) {
			menu.append(new MenuItem({
				label: el.name,
				type: 'radio',
				checked: el.name === currentProject.name
			}));
		}

		menu.append(new MenuItem({type: 'separator'}));
	}

	menu.append(new MenuItem({
		label: 'Open Project...',
		click() {
			dialog.showOpenDialog(null, {
				title: 'Pick a project',
				properties: ['openDirectory'],
				defaultPath: path.resolve('..')
			}, dirs => {
				if (!dirs) {
					return;
				}

				setActiveProject(dirs[0]);
				addRecentProject(currentProject);
				createTrayMenu();
			});
		}
	}));

	menu.append(new MenuItem({type: 'separator'}));

	menu.append(new MenuItem({
		label: 'Clear',
		click() {
			recentProjects.length = 0;
			createTrayMenu();
		}
	}));

	return menu;
}