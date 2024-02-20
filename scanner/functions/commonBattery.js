function commonBattery(windows) {
    const p = windows ? path.win32.parse : path.posix.parse;
    const s = windows ? '\\' : '/';
    return function() {
        beforeEach(() => {
            Path.tester.setParserAndSep(p, s);
        });
        afterEach(() => {
            Path.tester.reset();
        });
        [
            { s: '/', out: '' },
            { s: '/foo', out: 'foo' },
            { s: '/foo/bar/baz.txt', out: 'foo/bar/baz.txt' }
        ].forEach(t => {
            it('returns "' + t.out + '" on "' + t.s + '"', () => {
                const p = new Path(t.s);
                assert.equal(p.toString(), t.out);
            });
        });
    };
}