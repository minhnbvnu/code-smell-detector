function checkBuiltInVMAndNodeVM (cb) {
    if (typeof process === 'undefined') {
        // eslint-disable-next-line n/no-callback-literal
        cb('JSONPath vm', () => {
            //
        });
        return;
    }
    [
        'Node vm',
        'JSONPath vm'
    ].forEach((vmType) => {
        const checkingBrowserVM = vmType === 'JSONPath vm';
        cb(
            vmType,
            checkingBrowserVM
                ? () => {
                    global.jsonpath = global.jsonpathBrowser;
                }
                : () => {
                    global.jsonpath = global.jsonpathNodeVM;
                }
        );
    });
}