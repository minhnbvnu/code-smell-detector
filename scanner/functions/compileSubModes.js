function compileSubModes(mode,language){mode.sub_modes=[];for(var i=0;i<mode.contains.length;i++){for(var j=0;j<language.modes.length;j++){if(language.modes[j].className==mode.contains[i]){mode.sub_modes[mode.sub_modes.length]=language.modes[j]}}}}