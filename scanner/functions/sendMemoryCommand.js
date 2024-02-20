function sendMemoryCommand(commandID, itm) {
        let items = document.querySelectorAll('#panel > .mempanel > .memory-item');
        let idx = Array.from(items).indexOf(itm);
        _memComm(commandID, idx);
        if (commandID == memoryCommandIDs.mc) {
            let panel = document.querySelector('#panel > .mempanel');
            panel.removeChild(itm);
        }
    }