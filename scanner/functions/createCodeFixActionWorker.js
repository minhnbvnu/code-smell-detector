function createCodeFixActionWorker(fixName8, description2, changes, fixId51, fixAllDescription, command) {
            return { fixName: fixName8, description: description2, changes, fixId: fixId51, fixAllDescription, commands: command ? [command] : void 0 };
        }