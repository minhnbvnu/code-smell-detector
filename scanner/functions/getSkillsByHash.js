function getSkillsByHash(skills_hash, skills, asciiOffset) {
    var pairs = [];

    //break the hash back down into skill/value pairs, one character at a time
    var hashCharacters = skills_hash.split('');
    for (var i = 0; i < hashCharacters.length; i++) {
      if (!Number(hashCharacters[i])) { //if the current character is not a number,
        var skill = getSkillById(skills, hashCharacters[i].charCodeAt(0) - asciiOffset); //convert the character to a skill id and look it up
        if (skill) {
          var points = Number(hashCharacters[i + 1]) || 1; //default to 1 point if the number is not specified next
          pairs.push({
            skill: skill
            , points: points
          });
        }
      }
    }
    return pairs;
  }