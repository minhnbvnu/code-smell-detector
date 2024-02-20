function handleKeyUp(event){
			var key = event.key;

			if (!key && event.keyIdentifier){
				// safari on osX ...
				var id = event.keyIdentifier;
				id = id.replace("U+","");
				key = String.fromCharCode(parseInt(id,16)).toLowerCase();
			}

            var keyCode = event.keyCode;

			if (isMetaKeyCode(keyCode)) isMetaKeyDown = false;

            if (key && (keyCode>40) && (keyCode<200)){
                var keyboardTable = KEYBOARDTABLE[SETTINGS.keyboardTable] || KEYBOARDTABLE.azerty;
                var keyboardNote = keyboardTable[key];

                if (typeof keyboardNote === "number"){
                    return me.handleNoteOff((currentOctave*12) + keyboardNote);
                }
            }


		}