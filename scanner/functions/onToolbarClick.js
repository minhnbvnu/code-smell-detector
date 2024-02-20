function onToolbarClick(editor) {
    document.querySelector('.vditor-toolbar').addEventListener("click", (e) => {
        let type;
        for (let i = 0; i < 3; i++) {
            if (type = e.path[i].dataset.type) break;
        }
        if (type == 'outline') {
            handler.emit("saveOutline", editor.vditor.options.outline.enable)
        }
    })
}