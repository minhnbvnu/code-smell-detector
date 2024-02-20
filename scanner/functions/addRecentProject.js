function addRecentProject(project) {
	recentProjects = recentProjects.filter(x => x.name !== project.name);

	if (recentProjects.length === 10) {
		recentProjects.pop();
	}

	recentProjects.unshift(project);
}