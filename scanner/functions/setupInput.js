function setupInput(input, opts) {

        if (!FileReaderJS.enabled) {
            return;
        }
        var instanceOptions = extend(extend({}, FileReaderJS.opts), opts);

        input.addEventListener("change", inputChange, false);
        input.addEventListener("drop", inputDrop, false);

        function inputChange(e) {
            processFileList(e, input.files, instanceOptions);
        }

        function inputDrop(e) {
            e.stopPropagation();
            e.preventDefault();
            processFileList(e, e.dataTransfer.files, instanceOptions);
        }
    }