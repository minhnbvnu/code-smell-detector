async function copyThree() {
    await fse.copy(
        path.resolve(threeBuildDir, DEBUG ? 'three.js' : 'three.min.js'),
        path.resolve(staticDir, 'three.js')
    );
    if (DEBUG) {
        console.log('Copied three.js to NB extension static folder');
    } else {
        console.log('Copied minified three.js to NB extension static folder');
    }
}