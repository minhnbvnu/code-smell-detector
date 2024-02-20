function generateNLUData(regex, intents, expressions, params, synonyms, variants) {
    let tmpData = "";
    
    //Loop through Intents --> Examples (expressions) --> Entities --> Parameters
    for (let intent_i = 0; intent_i < intents.length; intent_i++) {
      let expressionList = expressions.filter(
        expression => expression.intent_id === intents[intent_i].intent_id
      );
      tmpData += "## intent:" + intents[intent_i].intent_name + "\n"; 
      if (expressionList.length > 0) {
        for (let expression_i = 0; expression_i < expressionList.length; expression_i++) {
          //Add parameters to expression
          var expression = expressionList[expression_i].expression_text;
          let parameterList = params.filter(
            param => param.expression_id === expressionList[expression_i].expression_id
          );
          if (parameterList.length > 0) {
            for (let parameter_i = 0; parameter_i < parameterList.length; parameter_i++) {
              expression = expression.splice(parameterList[parameter_i].parameter_end, 0, "](" + parameterList[parameter_i].entity_name + ")").splice(parameterList[parameter_i].parameter_start, 0, "[");
            }
          }
          tmpData += "- " + expression + "\n";
        }
      }
    }
    tmpData += "\n";

    if (synonyms) {
      for (let synonym_i = 0; synonym_i < synonyms.length; synonym_i++) {
        tmpData += "## synonym:" + synonyms[synonym_i].synonym_reference + "\n";
        for (let synonym_variant_i = 0; synonym_variant_i < variants.length; synonym_variant_i++) {
          //The additional properties of the factory method is causing problems
          if (variants[synonym_variant_i].synonym_id == synonyms[synonym_i].synonym_id) {
            tmpData += "- " + variants[synonym_variant_i].synonym_value + "\n";
          }
        }
      }
      tmpData += "\n";
    }

    if (regex) {
      for (let regex_i = 0; regex_i < regex.length; regex_i++) {
        tmpData += "## regex:" + regex[regex_i].regex_name;
        tmpData += "- " + regex[regex_i].regex_pattern + "\n\n";
      }
    }

    $scope.raw_data.nlu = tmpData;
    $scope.getCoreData();
  }