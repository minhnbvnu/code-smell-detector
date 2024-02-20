function resetPreset(kind) {
    var oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let capitalizedPreset = latest_preset_name.charAt(0).toUpperCase() + latest_preset_name.slice(1);
            let buttonId = "load" + capitalizedPreset;
            // document.getElementById(buttonId).classList.remove('btn-light-saved');
            // document.getElementById(buttonId).classList.add('btn-light');
            closeSetLoadTestModal();
            getSavedPresets();
            if (kind == 'k-inv') {
                console.log("[DELETE-K-INV-PROGRAM] " + latest_preset_name + " deleted");
                deleteChaosProgramButton(latest_preset_name);
            }
            else {
                console.log("[RESET-PRESETS] " + latest_preset_name + " restored with default preset");
            }
            var now = new Date().toLocaleString().replace(',','')
            $('#alert_placeholder_programming_mode').replaceWith(alert_div + '[' + now + '] ' + latest_preset_name + ' preset has been restored with default code</div>');
            //$('#alert_placeholder').replaceWith(alert_div + '[' + now + '] ' + latest_preset_name + ' preset has been restored with default code</div>');
        }
    };;
    if (kind == 'k-inv') {
        console.log("[RESET-PRESETS] Deleting " + latest_preset_name + " lang " + latest_preset_lang);
    }
    oReq.open("POST", k8s_url + "/chaos/loadpreset/reset?name="+ latest_preset_name.toLowerCase() + "&lang="+ latest_preset_lang);
    oReq.send({});
}