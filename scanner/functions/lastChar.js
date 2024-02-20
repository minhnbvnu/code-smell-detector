function lastChar(keys) {
      var match = /^.*(<[^>]+>)$/.exec(keys);
      var selectedCharacter = match ? match[1] : keys.slice(-1);
      if (selectedCharacter.length > 1){
        switch(selectedCharacter){
          case '<CR>':
            selectedCharacter='\n';
            break;
          case '<Space>':
            selectedCharacter=' ';
            break;
          default:
            selectedCharacter='';
            break;
        }
      }
      return selectedCharacter;
    }