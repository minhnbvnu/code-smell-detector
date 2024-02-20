function getFullyMatchedCommandOrNull(command) {
          if (keys.length < command.keys.length) {
            // Matches part of a multi-key command. Buffer and wait for next
            // stroke.
            inputState.keyBuffer.push(key);
            return null;
          } else {
            if (command.keys[keys.length - 1] == 'character') {
              inputState.selectedCharacter = selectedCharacter;
            }
            // Clear the buffer since a full match was found.
            inputState.keyBuffer = [];
            return command;
          }
        }