function utf8CharByteCount(character) {
        var c = character.charCodeAt();
        // Not c then 0, else c < 128 then 1, else c < 2048 then 2, else 3
        return !c ? 0 : c < 128 ? 1 : c < 2048 ? 2 : 3;
      }