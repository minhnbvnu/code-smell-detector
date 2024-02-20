function attachToEditor(editor) {
    editor.codeLensProviders = [];
    editor.renderer.on("afterRender", renderWidgets);
    editor.$codeLensClickHandler = function(e) {
        var command = e.target.lensCommand;
        if (command)
            editor.execCommand(command.id, command.arguments);
    };
    editor.container.addEventListener("click", editor.$codeLensClickHandler);
    editor.$updateLenses = function() {
        var session = editor.session;
        if (!session) return;

        if (!session.widgetManager) {
            session.widgetManager = new LineWidgets(session);
            session.widgetManager.attach(editor);
        }

        var providersToWaitNum = editor.codeLensProviders.length;
        var lenses = [];
        editor.codeLensProviders.forEach(function(provider) {
            provider.provideCodeLenses(session, function(currentLenses) {
                currentLenses.forEach(function(lens) {
                    lenses.push(lens);
                });
                providersToWaitNum--;
                if (providersToWaitNum == 0) {
                    applyLenses();
                }
            });
        });

        function applyLenses() {
            var cursor = session.selection.cursor;
            var oldRow = session.documentToScreenRow(cursor);
            exports.setLenses(session, lenses);

            var lastDelta = session.$undoManager && session.$undoManager.$lastDelta;
            if (lastDelta && lastDelta.action == "remove" && lastDelta.lines.length > 1)
                return;
            var row = session.documentToScreenRow(cursor);
            var lineHeight = editor.renderer.layerConfig.lineHeight;
            var top = session.getScrollTop() + (row - oldRow) * lineHeight;
            session.setScrollTop(top);
        }
    };
    var updateLenses = lang.delayedCall(editor.$updateLenses);
    editor.$updateLensesOnInput = function() {
        updateLenses.delay(250);
    };
    editor.on("input", editor.$updateLensesOnInput);
}