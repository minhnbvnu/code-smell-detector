function loadAllowlistDomains() {
        const response = ipcRenderer.sendSync('renderer-to-main', JSON.stringify({
            'type': 'getAllowlistDomains',
        }));
        /* eslint-disable-next-line no-unused-vars */
        hasContent = !!response.content;
        editor.setValue(response.content || '', 1);
        applyChangesBtn.classList.add('disabled');
        const allowlistedNum = editorUtils.countRules(response.content);
        utils.setAllowlistInfo(allowlistedNum);
        contentBlockerInfo.allowlistedNum = allowlistedNum;
        // focus editor after changing allowlist mode
        allowlistEditor.focus();
    }