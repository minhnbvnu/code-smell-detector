function generateTests(docs) {
    docs.forEach(doc => {
        const guard = doc.guard;
        let skip = false;
        let skipText = '';

        if (guard && guards[guard]) {
            if (!guards[guard]()) {
                skip = true;
                skipText = '[SKIP] ';
            }
        }

        describe(skipText + doc.file + '/' + (doc.name || 'suite'), () => {
            if (doc.err) {
                it('has errors', () => {
                    assert.ok(false, doc.err);
                });
            } else {
                (doc.tests || []).forEach(t => {
                    const fn = async function() {
                        const genOnly = (doc.opts || {}).generateOnly;
                        const noCoverage = (doc.opts || {}).noCoverage;
                        if (doc.inputSourceMapClass) {
                            doc.inputSourceMap = new NonPojo(
                                doc.inputSourceMap
                            );
                        }
                        const v = verifier.create(
                            doc.code,
                            doc.opts || {},
                            doc.instrumentOpts,
                            doc.inputSourceMap
                        );
                        const test = clone(t);
                        const args = test.args;
                        const out = test.out;
                        delete test.args;
                        delete test.out;
                        if (!genOnly && !noCoverage) {
                            await v.verify(args, out, test);
                        }
                        if (noCoverage) {
                            assert.equal(v.code, v.generatedCode);
                        }
                    };
                    if (skip) {
                        it.skip(t.name || 'default test', fn);
                    } else {
                        it(t.name || 'default test', fn);
                    }
                });
            }
        });
    });
}