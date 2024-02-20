function inputDrop(e) {
            e.stopPropagation();
            e.preventDefault();
            processFileList(e, e.dataTransfer.files, instanceOptions);
        }