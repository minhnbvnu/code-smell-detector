function loadUserRules(contentBlockerInfo) {
        ipcRenderer.send('renderer-to-main', JSON.stringify({
            'type': 'getUserRules',
        }));

        ipcRenderer.on('getUserRulesResponse', (e, arg) => {
            /* eslint-disable-next-line no-unused-vars */
            hasContent = !!arg.content;
            const userRulesText = (arg.content || []).join('\n');
            editor.setValue(userRulesText, 1);
            applyChangesBtn.classList.add('disabled');
            const userrulesNum = editorUtils.countRules(userRulesText);
            utils.setUserrulesNum(userrulesNum);
            contentBlockerInfo.userRulesNum = userrulesNum;
        });
    }