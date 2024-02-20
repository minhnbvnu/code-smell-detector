function testFixture(fixturesDir, useJSXTextNode) {

        return filename => {
            const code = shelljs.cat(`${path.resolve(fixturesDir, filename)}.src.js`);
            const config = {
                useJSXTextNode,
                jsx: true
            };
            test(`fixtures/${filename}.src`, testUtils.createSnapshotTestBlock(code, config));
        };
    }