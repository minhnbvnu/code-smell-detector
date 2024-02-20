function fetchMatchedScriptList(){
    browser.tabs.getSelected(null, (tab) => {
        browserRunUrl = tab.url;
        browser.runtime.sendMessage({ from: "bootstrap", operate: "fetchScripts", url: browserRunUrl, digest: "yes" }, (response) => {
            try{
//                let userLibraryScripts = response.body; //JSON.parse(response.body);
//                userLibraryScripts.forEach((userLibraryScript) => {
//                    let urlParse = new URL(browserRunUrl)
//
//                    if (matchesCheck(userLibraryScript, urlParse)) {
//                        scriptStateList.push(userLibraryScript);
//                    }
//                });
                scriptStateList = response.body;
                
                //fetch register menu from popup to content
                // browser.runtime.sendMessage({ from: "popup", operate: "fetchRegisterMenuCommand" });
                renderScriptContent(scriptStateList);
                fetchMatchedScriptConsole();
            }catch(e){
                console.log(e);
            }
        });
    });
}