function generateDataToJSON(regex, intents, expressions, params, synonyms, variants) {
    /*
    let tmpData = {};
    let tmpIntent = {};
    let tmpExpression = {};
    let tmpParam = {};
    tmpData.rasa_nlu_data = {};
    tmpData.rasa_nlu_data.common_examples = [];
    if (typeof synonyms !== 'undefined') {
      tmpData.rasa_nlu_data.entity_synonyms = [];
      for (let synonym_i = 0; synonym_i < synonyms.length; synonym_i++) {
        let variants_synonyme = variants
          .filter(function (obj) {
            return obj.synonym_id === synonyms[synonym_i].synonym_id;
          })
          .map(function (obj) {
            return obj.synonym_value;
          });
        if (variants_synonyme.length !== 0) {
          tmpData.rasa_nlu_data.entity_synonyms.push({
            value: synonyms[synonym_i].synonym_reference,
            synonyms: variants_synonyme
          });
        }
      }
    }
    if (regex.length > 0) {
      tmpData.rasa_nlu_data.regex_features = [];
    }

    for (let regex_i = 0; regex_i < regex.length; regex_i++) {
      tmpData.rasa_nlu_data.regex_features.push({
        name: regex[regex_i].regex_name,
        pattern: regex[regex_i].regex_pattern
      });
    }

    for (let intent_i = 0; intent_i <= intents.length - 1; intent_i++) {
      let expressionList = expressions.filter(
        expression => expression.intent_id === intents[intent_i].intent_id
      );
      if (expressionList !== undefined) {
        for (let expression_i = 0; expression_i <= expressionList.length - 1; expression_i++) {
          tmpIntent = {};
          tmpExpression = {};

          tmpIntent.text = expressionList[expression_i].expression_text;
          tmpIntent.intent = intents[intent_i].intent_name;

          tmpIntent.entities = [];
          tmpIntent.expression_id = expressionList[expression_i].expression_id;

          let parameterList = params.filter(
            param =>
              param.expression_id === expressionList[expression_i].expression_id
          );
          if (parameterList !== undefined) {
            for (let parameter_i = 0; parameter_i <= parameterList.length - 1; parameter_i++) {
              tmpParam = {};
              tmpParam.start = parameterList[parameter_i].parameter_start;
              tmpParam.end = parameterList[parameter_i].parameter_end;
              tmpParam.value = parameterList[parameter_i].parameter_value;
              tmpParam.entity = parameterList[parameter_i].entity_name;
              tmpIntent.entities.push(tmpParam);

              //Check for common errors
              if (tmpParam.entity === null) {
                $scope.generateError = 'Entity is null';
              }
            }
            tmpData.rasa_nlu_data.common_examples.push(tmpIntent);
          }
        }
      }
    }

    for (let i = 0; i <= tmpData.rasa_nlu_data.common_examples.length - 1; i++) {
      let parameterList = params.filter(
        param =>
          param.expression_id ===
          tmpData.rasa_nlu_data.common_examples[i].expression_id
      );
      if (tmpData.rasa_nlu_data.common_examples[i].entities.length !== parameterList.length
      ) {
        let missingEntities = parameterList.filter(
          param =>
            param.entity_id !==
            tmpData.rasa_nlu_data.common_examples[i].entities[0].entity_id
        );
        for (let parameter_i = 0; parameter_i <= missingEntities.length - 1; parameter_i++) {
          tmpParam = {};
          let start = tmpData.rasa_nlu_data.common_examples[i].text.indexOf(
            missingEntities[parameter_i].parameter_value
          );
          let end = missingEntities[parameter_i].parameter_value.length + start;
          tmpParam.start = start;
          tmpParam.end = end;
          tmpParam.value = missingEntities[parameter_i].parameter_value;
          tmpParam.entity = missingEntities[parameter_i].entity_name;
          tmpData.rasa_nlu_data.common_examples[i].entities.push(tmpParam);
        }
      }
      delete tmpData.rasa_nlu_data.common_examples[i].expression_id;
    }

    let botToTrain = $scope.objectFindByKey($scope.botList, 'bot_id', $scope.bot.bot_id);

    let dataToPost = {};
    dataToPost.config = botToTrain.bot_config;
    dataToPost.out = botToTrain.output_folder;
    dataToPost.nlu = tmpData;

    $scope.exportdata = tmpData;
    $scope.generateError = '';
    */
  }