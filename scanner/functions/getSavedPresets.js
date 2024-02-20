function getSavedPresets() {
    var oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            if ((this.responseText.trim() != "nil") && (this.responseText.trim() != "")) {
                console.log("[GET-PRESETS] Response from backend: <" + this.responseText.trim() + ">");
                var savedPresets = this.responseText.split(",");
                for (i = 0; i < savedPresets.length; i++) {
                    var currentPresetName = savedPresets[i].split("_")[1];
                    currentPresetName = currentPresetName.charAt(0).toUpperCase() + currentPresetName.slice(1);
                    //console.log("[GET-PRESETS] computing preset: " + currentPresetName);
                    var buttonId = "load" + currentPresetName.trim();
                    // console.log("[GET-PRESETS] Change border color of buttonId: " + buttonId);
                    // console.log(document.getElementById(buttonId));
                    if (document.getElementById(buttonId) == null){
                        console.log("[GET-PRESETS] Appending button to loadButtonGroup. id: " + buttonId + " presetname: " + currentPresetName.trim());
                        latest_preset_lang = "k-inv";
                        createChaosProgramButton(currentPresetName.trim(), latest_preset_lang);                      
                    } else {
                        // document.getElementById(buttonId).classList.remove('btn-light');
                        // document.getElementById(buttonId).classList.add('btn-light-saved');
                    }
                }
            } else {
                console.log("[GET-PRESETS] There is no saved presets in Redis");
            }
        }
    };;
    oReq.open("GET", k8s_url + "/chaos/loadpreset/savedpresets");
    oReq.send();
}