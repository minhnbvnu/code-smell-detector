function detachFromEditor(editor) {
    editor.off("input", editor.$updateLensesOnInput);
    editor.renderer.off("afterRender", renderWidgets);
    if (editor.$codeLensClickHandler)
        editor.container.removeEventListener("click", editor.$codeLensClickHandler);
}