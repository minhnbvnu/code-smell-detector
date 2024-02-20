async function copyBundleToDocs() {
    await fse.copy(
        path.resolve(buildDir, 'index.js'),
        path.resolve(docStaticDir, 'jupyter-threejs.js')
    );
    console.log('Copied bundle to docs folder');
}