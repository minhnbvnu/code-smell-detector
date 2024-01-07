function buildAndWatchStandaloneExamples() {
    return {
        name: 'build-and-watch-standalone-examples',
        buildStart() {
            if (NODE_ENV === 'development') {
                watch(this, 'scripts/generate-standalone-files.mjs');
                watch(this, 'src/examples');
            }
        },
        generateBundle() {
            const cmd = `cross-env NODE_ENV=${NODE_ENV} ENGINE_PATH=${ENGINE_PATH} npm run build:standalone`;
            console.log(cmd);
            exec(cmd);
        }
    };
}