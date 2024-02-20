function buildTutorials(tutorials, sortedTutorials) {
    helper.setTutorials(tutorials);

    fs.mkPath(path.join(outDir, 'tutorials'));

    for (const section in sortedTutorials) {
        sortedTutorials[section].tutorials.forEach((tutorial) => {
            const url = path.join('tutorials', `${tutorial.name}.html`);
            generate(`Tutorial : ${sortedTutorials[section].title} - ${tutorial.title}`, tutorial.parse(), url, 'tutorial.tmpl');
        });
    }

    // Copy images resources
    const fromDir = path.join(__dirname, 'tutorials/images');
    const images = fs.ls(fromDir, 3);
    images.forEach((filename) => {
        const toDir = path.join(fs.toDir(filename.replace(fromDir, outDir)), 'tutorials/images');
        fs.mkPath(toDir);
        fs.copyFileSync(filename, toDir);
    });
}