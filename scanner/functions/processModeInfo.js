function processModeInfo(buffer,lexem,end){var current_mode=modes[modes.length-1];if(end){result+=processBuffer(current_mode.buffer+buffer,current_mode);return false};var new_mode=subMode(lexem,current_mode);if(new_mode){result+=processBuffer(current_mode.buffer+buffer,current_mode);startNewMode(new_mode,lexem);relevance+=new_mode.relevance;return new_mode.returnBegin};var end_level=endOfMode(modes.length-1,lexem);if(end_level){var markup=current_mode.noMarkup?'':'</span>';if(current_mode.returnEnd){result+=processBuffer(current_mode.buffer+buffer,current_mode)+markup}else if(current_mode.excludeEnd){result+=processBuffer(current_mode.buffer+buffer,current_mode)+markup+escape(lexem)}else{result+=processBuffer(current_mode.buffer+buffer+lexem,current_mode)+markup};while(end_level>1){markup=modes[modes.length-2].noMarkup?'':'</span>';result+=markup;end_level--;modes.length--};modes.length--;modes[modes.length-1].buffer='';if(current_mode.starts){for(var i=0;i<language.modes.length;i++){if(language.modes[i].className==current_mode.starts){startNewMode(language.modes[i],'');break}}};return current_mode.returnEnd};if(isIllegal(lexem,current_mode))throw'Illegal';}