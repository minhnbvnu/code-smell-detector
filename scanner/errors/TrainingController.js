function TrainingController($scope, $rootScope, $interval, $http, Rasa_Status, Bot, BotRegex, ExpressionParameters, IntentExpressions, BotEntities, BotActions, BotSynonyms, SynonymsVariants, appConfig, Stories, Response, Actions) {
                  let synonymsIds = synonyms.map(function (item) {
                    return item['synonym_id'];
                  });
                      function (variants) {
                        $scope.bot_data.variants = variants;
                        variants = $scope.cleanResponse(variants);
                        generateNLUData(regex, intents, expressions, params, synonyms, variants);
                      },
                      function (error) {
                        $scope.generateError = error;
                        $scope.exportdata = undefined;
                      }
  function generateNLUData(regex, intents, expressions, params, synonyms, variants) {
  function generateDataToJSON(regex, intents, expressions, params, synonyms, variants) {