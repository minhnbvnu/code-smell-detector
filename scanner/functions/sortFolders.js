function sortFolders(folders) {
	folders.forEach(folder => {
		folder.children = sortFolders(folder.children)
	})
	return folders.sort((a, b) => (a.title > b.title ? 1 : -1))
}