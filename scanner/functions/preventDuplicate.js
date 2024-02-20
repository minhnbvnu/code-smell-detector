function preventDuplicate(filenames, newName) {
        let idx = 2;
        let testName = newName
        while (testName in filenames) {
            testName = `${newName} (${idx})`
            idx += 1;
        }
        return testName
    }