function updateCodeEditorSession(url, bodyText) {
    console.assert(bodyText !== undefined, 'bodyText required');

    const session = codeEditorSessionMap.get(url);

    console.assert(session, 'Editor session not found!');
    console.assert(session.aux.url === url, 'Inconsistent url in codeEditorSessionMap');

    if (typeof bodyText === 'undefined' || typeof bodyText === 'null') {
        bodyText = '\n';
    } else if (typeof bodyText !== 'string') {
        bodyText = WorkJSON.stringify(bodyText, undefined, 4);
    }

    if (session.errorMarker) { session.removeMarker(session.errorMarker); }

    if (session.getValue() !== bodyText) {
        // Update the value only when it has changed, to avoid
        // disturbing the active line. Calling setValue()
        // resets the undo history, which is what we want when
        // the disk version has changed. Tell the onChange
        // handler that it can ignore the change because it is
        // programmatic and does not require saving or autocorrect.
        session.aux.ignoreChange = true;
        session.setValue(bodyText);
        session.aux.ignoreChange = false;
    }
}