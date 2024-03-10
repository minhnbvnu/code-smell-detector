function createGMApisWithUserScript(userscript, uuid, version, scriptWithoutComment, installType) {
        let grants = userscript.grants;
        let source = 'const _uuid = "' + uuid + '";\n\n';
        source += 'const iconUrl = "' + userscript.icon + '";\n\n';
        source += 'const usName = "' + userscript.name + '";\n\n';
        source += 'const _version = "' + version + '";\n\n';
        native.nslog("createGMApisWithUserScripte-- " + installType);
        if (grants.includes('unsafeWindow') || installType == 'page') {
            native.nslog("page create");
            source += 'const _userscript = ' + JSON.stringify(userscript) +';\n';
            source += injectJavaScript(userscript, version);
            return source;
        }
        source += 'let GM = {};\n\n';
        source += 'let GM_info=' + GM_info(userscript, version) + '\n';
        source += 'GM.info = GM_info;\n';
        source += 'let __stroge = await _fillStroge();\n\n';
        source += 'let __resourceTextStroge = await _fillAllResourceTextStroge();\n\n';
        source += 'let __resourceUrlStroge = await _fillAllResourceUrlStroge();\n\n';
        source += 'let __RMC_CONTEXT = {};\n\n';

        source += 'browser.runtime.sendMessage({ from: "gm-apis", uuid: _uuid, operate: "clear_GM_log" });\n';
        source += 'browser.runtime.onMessage.addListener((request, sender, sendResponse) => {\n';
        source += '\t\tlet message_uuid=request.uuid;\nlet UUID_RMC_CONTEXT=__RMC_CONTEXT[_uuid];\n';
        source += '\t\t\tconsole.log("source___fetchRegisterMenuCommand1111=",message_uuid,_uuid,request,__RMC_CONTEXT);\n';
        source += '\t\tif (request.from == "background" && request.operate == "fetchRegisterMenuCommand" && message_uuid == _uuid){\n';
        source += '\t\t\tconsole.log("source___fetchRegisterMenuCommand222=",request,__RMC_CONTEXT);\n';
        source += '\t\t\tbrowser.runtime.sendMessage({from:"content",data:UUID_RMC_CONTEXT,uuid:_uuid,operate:"giveRegisterMenuCommand"});\n}\n';
        source += '\t\telse if (request.from == "background" && request.operate == "execRegisterMenuCommand" && message_uuid == _uuid){\n';
        source += '\t\t\tconsole.log("menuId=",request.id,UUID_RMC_CONTEXT);\n let menuId = request.id;\n let place=-1;\n';
        source += '\t\tif(UUID_RMC_CONTEXT && UUID_RMC_CONTEXT != "[]" && UUID_RMC_CONTEXT.length>0){\nUUID_RMC_CONTEXT.forEach((item, index)=>{\n\t\tif(item.id == menuId){\nplace = index;\n return false;\n}\n}\n)}';
        source += '\t\tif(place>=0){\nUUID_RMC_CONTEXT[place]["commandFunc"]();\n}\n}\n';
        source += '\t\t\treturn true;\n'
        source += '});\n\n';

        if (grants.includes('GM_listValues')) {
            source += 'function GM_listValues (){ return __stroge}\n\n';
        }

        if (grants.includes('GM.listValues')) {
            source += 'GM.listValues = ' + _fillStroge.toString() + '\n\n';
        }

        if (grants.includes('GM_deleteValue')) {
            source += GM_deleteValue.toString() + '\n\n';
        }

        if (grants.includes('GM.deleteValue')) {
            source += 'GM.deleteValue = ' + deleteValue_p.toString() + '\n\n';
        }

        if (grants.includes('GM_setValue')) {
            source += GM_setValue.toString() + '\n\n';
        }

        if (grants.includes('GM.setValue')) {
            source += 'GM.setValue = ' + setValue_p.toString() + '\n\n';
        }

        if (grants.includes('GM_getValue')) {
            source += GM_getValue.toString() + '\n\n';
        }

        if (grants.includes('GM.getValue')) {
            source += 'GM.getValue = ' + getValue_p.toString() + '\n\n';
        }

        if (grants.includes('GM.registerMenuCommand')) {
            source += 'GM.registerMenuCommand = ' + GM_registerMenuCommand.toString() + '\n\n';
        }

        if (grants.includes('GM_registerMenuCommand')) {
            source += GM_registerMenuCommand.toString() + '\n\n';
        }

        if (grants.includes('GM.unregisterMenuCommand')) {
            source += 'GM.unregisterMenuCommand = ' + GM_unregisterMenuCommand.toString() + '\n\n';
        }

        if (grants.includes('GM_unregisterMenuCommand')) {
            source += GM_unregisterMenuCommand.toString() + '\n\n';
        }

        if (grants.includes('GM_addStyle')) {
            source += GM_addStyle.toString() + '\n\n';
        }

        if (grants.includes('GM.addStyle')) {
            source += 'GM.addStyle = ' + GM_addStyle.toString() + '\n\n';
        }

        if (grants.includes('GM_openInTab')) {
            source += GM_openInTab.toString() + '\n\n';
        }
        if (grants.includes('GM.openInTab')) {
            source += 'GM.openInTab = ' + GM_openInTab.toString() + '\n\n';
        }

        if (grants.includes('GM_getResourceURL')) {
            source += GM_getResourceURL.toString() + '\n\n';
        }
        if (grants.includes('GM_getResourceUrl')) {
            source += 'GM_getResourceUrl =' + GM_getResourceURL.toString() + '\n\n';
        }

        if (grants.includes('GM.getResourceURL') || grants.includes('GM.getResourceUrl')) {
            source += 'GM.getResourceURL = ' + getResourceURL_p.toString() + '\n\n';
            source += 'GM.getResourceUrl = ' + getResourceURL_p.toString() + '\n\n';
        }

        if (grants.includes('GM.getResourceText')) {
            source += 'GM.getResourceText = ' + getResourceText_p.toString() + '\n\n';
        }

        if (grants.includes('GM_getResourceText')) {
            source += GM_getResourceText.toString() + '\n\n';
        }

        if (grants.includes('GM_xmlhttpRequest')) {
            source += GM_xmlhttpRequest.toString() + '\n\n';
        }

        if (grants.includes('GM.xmlHttpRequest')) {
            source += 'GM.xmlHttpRequest = ' + GM_xmlhttpRequest.toString() + '\n\n';
        }

        if (grants.includes('GM_notification') || grants.includes('GM.notification') ) {
            source += GM_notification.toString() + '\n\n';
            source += "GM.notification = " + GM_notification.toString() + '\n\n';
        }
        if (grants.includes('GM_download') || grants.includes('GM.download')) {
            source += GM_download.toString() + '\n\n';
            source += "GM.download = " + GM_download.toString() + '\n\n';
        }
        if (grants.includes('GM_setClipboard') || grants.includes('GM.setClipboard')) {
            source += GM_setClipboard.toString() + '\n\n';
            source += "GM.setClipboard = " + GM_setClipboard.toString() + '\n\n';
        }

        //add GM_log by default
        source += GM_log.toString() + '\n\n';

        // source += injectJavaScript.toString() + ';\n\ninjectJavaScript();\n';

        source += _fillStroge.toString() + '\n\n';

        source += _fillAllResourceTextStroge.toString() + '\n\n';

        source += _fillAllResourceUrlStroge.toString() + '\n\n';
//        native.nslog("native-source" + source);
        return source;
    }