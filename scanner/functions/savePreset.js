function savePreset(action) {
    console.log("[SAVE-PRESET-CHAOSPROGRAM] Saving item...");
    var presetName = "";
    presetBody = $("#currentLoadTest").val();
    console.log("[SAVE-PRESET-CHAOSPROGRAM] Saving " + presetBody);

    if (action == "save-chaos-program") {
        presetLang = "k-inv";
        presetName = codename + "-" + rand_id();
        latest_preset_lang = "k-inv";
        console.log("[SAVE-PRESET-CHAOSPROGRAM] lang: " + presetLang + " name:" + presetName);
        presetBody =  $('#chaosProgramTextArea').val();
        document.getElementById("resetToDefaultButton").style.display = "none";
        document.getElementById("deleteChaosProgramButton").style.display = "block";
    }
    else if (latest_preset_lang == "k-inv") {
        presetLang = "k-inv";
        presetName = codename;
        latest_preset_lang = "k-inv";
        console.log("[SAVE-PRESET-CHAOSPROGRAM] lang: " + presetLang + " name:" + codename);
        presetBody = $('#currentLoadTest').val();
        document.getElementById("resetToDefaultButton").style.display = "none";
        document.getElementById("deleteChaosProgramButton").style.display = "block";
    }
    else {
        presetLang = latest_preset_lang;
        presetName = latest_preset_name;    
        document.getElementById("resetToDefaultButton").style.display = "block";
        document.getElementById("deleteChaosProgramButton").style.display = "none";
    }

    //console.log("Saving preset. name:" + presetName + ", lang:" + presetName + ", body: " + presetBody);
    var oReq = new XMLHttpRequest();

    oReq.open("POST", k8s_url + "/chaos/loadpreset/save?name=" + presetName + "&lang=" + presetLang, true);

    oReq.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200 && (action == "apply" || action == "save-chaos-program")) {
            if (latest_preset_lang == "k-inv") {
                console.log("[SAVE-PRESET-CHAOSPROGRAM] Payload: " + $('#currentLoadTest').val());
                if ($('#currentLoadTest').val() != "") {
                    presetBody = $('#currentLoadTest').val();
                } 
                   
                //$('#chaosProgramTextArea').val(presetBody);
                
                document.getElementById("chaosProgramTextArea").value = presetBody;
            } 
            else {
                presetBody = $('#chaosProgramTextArea').val(`chaos-codename: ${codename}
jobs:
  ${presetName}-job:
    additional-labels:
        chaos-controller: kubeinvaders
        chaos-lang: ${presetLang}
        chaos-type: loadtest
        chaos-codename: ${codename}
    image: docker.io/luckysideburn/chaos-exec:v1.0.4
    command: bash
    args:
    - start.sh
    - ${presetLang}
    - code=${btoa(presetBody).trim()}

experiments:
- name: ${presetName}-exp
  job: ${presetName}-job
  loop: 5`);
            }
        }
    };;

    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.send(presetBody);
    closeSetLoadTestModal();
    
    if (action != "save-chaos-program") {
        let presetNameCapitalized = presetName.charAt(0).toUpperCase() + presetName.slice(1);
        var buttonId = "load" + presetNameCapitalized.trim();
        // document.getElementById(buttonId).classList.remove('btn-light');
        // document.getElementById(buttonId).classList.add('btn-light-saved');
    }
    else {
        console.log("[SAVE-PRESET-CHAOSPROGRAM] Creating new button for lang: " + presetLang + " name:" + presetName);
        createChaosProgramButton(presetName, 'k-inv'); 
    }

    getSavedPresets();

    if (action == "apply" && programming_mode_switch == false){
        startProgrammingMode();
    }
}