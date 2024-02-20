function loadPreset(tool, lang) {
    let decodedStringAtoB = "";
    console.log("[GET-PRESETS] Loaded preset for " + tool + " with lang " + lang);

    latest_preset_name = tool;
    latest_preset_lang = lang;
    console.log("[GET-PRESETS] |" + lang + "|");

    if (lang == "k-inv") {
      loadSavedPreset(tool, lang, $('#chaosProgramTextArea').text());
      if (tool.toLowerCase() == "default") {
        document.getElementById("resetToDefaultButton").style.display = "none";
        document.getElementById("deleteChaosProgramButton").style.display = "none";
      } else {
        document.getElementById("resetToDefaultButton").style.display = "none";
        document.getElementById("deleteChaosProgramButton").style.display = "block";
      }
    } else {
      console.log("[GET-PRESETS] foo Loaded preset for " + tool + " with lang " + lang);
      console.log("[GET-PRESET] loadPresetsCodeJson " +loadPresetsCodeJson);
      loadPresetsCodeParsed = JSON.parse(loadPresetsCodeJson);
      decodedStringAtoB = atob(loadPresetsCodeParsed[tool]);
      loadSavedPreset(tool, lang, decodedStringAtoB);
      document.getElementById("resetToDefaultButton").style.display = "block";
      document.getElementById("deleteChaosProgramButton").style.display = "none";
    }
    $("#presetLang").val(lang);
    $("#presetName").val(tool);
    $('#setLoadTestModal').modal('show');
    modal_opened = true;
    log_tail_switch = false;
    log_tail_div.style.display = "none";
    log_tail_screen.style.display = "none"
    $("#logConsoleButton").text("Start Logs Tail");
    if (programming_mode_switch == false) {
      startProgrammingMode();
    }
  }