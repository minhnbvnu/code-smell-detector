function reportResults (tests) {
        // Todo: Look instead on `id=log` and possibly `id=summary` or
        //      `id=metadata_cache` if we add one (and `id=metadata_cache`?)
        // Insert our own reporting to be ready once tests evaluate
        const trs = [...document.querySelectorAll('table#results > tbody > tr')];
        const jsonOutput = {
            test: '/indexeddb/' + fileName.replace(/\.js$/u, '.htm'),
            subtests: [],
            status: 'OK', // When does the status at this level change?
            message: null // When does the message at this level change?
        };
        trs.forEach((tr, i) => {
            const test = tests[i];
            const tds = [...tr.querySelectorAll('td')].map((td) => td.textContent);
            const [statusText] = tds; // 2nd is testName
            let [,, assertions, messageWithAnyStack] = tds;
            if (messageWithAnyStack === undefined) {
                messageWithAnyStack = assertions;
                assertions = undefined;
            }
            write(statusText, test.status);
            if (!shimNS.files[statusText].includes(fileName)) { shimNS.files[statusText].push(fileName); }
            if (shimNS.fileMap) {
                if (!shimNS.fileMap.has(fileName)) { shimNS.fileMap.set(fileName, [0, 0]); }
                const [pass, total] = shimNS.fileMap.get(fileName);
                shimNS.fileMap.set(fileName, [pass + (test.status === 0), total + 1]);
            }
            if (shimNS.jsonOutput) {
                jsonOutput.subtests.push({
                    name: test.name,
                    status: statusText.toUpperCase(),
                    message: test.message || null
                });
            }
            shimNS.writeln(' (' + fileName + '): ' + test.name);
            if (assertions) { shimNS.writeln(assertions); }
            if (test.message && test.stack) {
                shimNS.writeStack(test.message || ' ', test.stack);
            }
        });
        if (shimNS.jsonOutput) { shimNS.jsonOutput.results.push(jsonOutput); }
        shimNS.finished();
    }