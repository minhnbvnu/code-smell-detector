function sortTutorialsBySection(tutorials, navList) {
    const packages = {};

    for (const tutorial in navList) {
        packages[navList[tutorial].sectionId] = packages[navList[tutorial].sectionId] || {
            title: navList[tutorial].sectionTitle,
            tutorials: [],
        };
    }

    tutorials.children.forEach((tutorial) => {
        packages[navList[tutorial.longname].sectionId].tutorials.push(tutorial);
    });
    return packages;
}