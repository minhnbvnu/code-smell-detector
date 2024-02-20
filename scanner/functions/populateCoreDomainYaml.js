function populateCoreDomainYaml(bot_id, intents) {
    //get entities by botid
    let domain_yml_obj = {};
    var endpoints_yml_obj = {};
    var credentials_yml_obj = { rest: "" };
    var endpoints_yml_obj = {};
    var credentials_yml_obj = { rest: "" };
    $scope.stories_md = '';
    Bot.get({ bot_id: bot_id }, function (data) {
      $scope.stories_md = data.story_details;
      if (data.endpoint_enabled) {
        endpoints_yml_obj.action_endpoint = { "url": data.endpoint_url };
      }
      $scope.credentials_yml = yaml.stringify(credentials_yml_obj);
      $http({ method: 'GET', url: appConfig.api_endpoint_v2 + '/rasa/url' }).then(
        function (response) {
          endpoints_yml_obj.nlu = response.data;
          $scope.endpoints_yml = yaml.stringify(endpoints_yml_obj);
        },
        function (errorResponse) {
          console.log("Error Message while Getting Messages." + errorResponse);
        });
    });

    BotEntities.query({ bot_id: bot_id }, function (allEntities) {
      let requiredSlots = allEntities.filter(
        entity => entity.slot_data_type !== 'NOT_USED' && entity.slot_data_type !== ''
      );
      if (requiredSlots.length > 0) {
        //build slots
        let slots_yml_str = requiredSlots
          .map(function (slot) {
            return (
              '"' +
              slot["entity_name"] +
              '":{"type":"' +
              slot["slot_data_type"] +
              '"}'
            );
          })
          .join(',');
        domain_yml_obj.slots = JSON.parse('{' + slots_yml_str + '}');
      }

      if (intents.length > 0) {
        //build intents
        domain_yml_obj.intents = intents.map(function (intent) {
          return intent['intent_name'];
        });
      }

      if (allEntities.length > 0) {
        //build entities
        domain_yml_obj.entities = allEntities.map(function (entity) {
          return entity['entity_name'];
        });
      }
      domain_yml_obj.action_factory = 'remote';

      BotActions.query({ bot_id: bot_id }, function (actionsList) {
        if (actionsList != null && actionsList.length > 0) {
          //build actions
          domain_yml_obj.actions = actionsList.map(function (action) {
            return action['action_name'];
          });

          let action_ids = actionsList
            .map(function (action) {
              return action['action_id'];
            }).toString();

          $http({ method: 'GET', url: appConfig.api_endpoint_v2 + '/action_responses?action_ids=' + action_ids }).then(
            function (data) {
              if (data.data.length > 0) {
                let responsesArrObj = {};
                data.data.map(function (response) {
                  let response_templete = {};
                  if (!responsesArrObj.hasOwnProperty(response.action_name)) {
                    responsesArrObj[response.action_name] = [];
                  }
                  //add response text if there is one
                  if (response.response_text != null && response.response_text !== '') {
                    response_templete.text = response.response_text;
                  }
                  //add buttons if there are any
                  if (response.buttons_info != null && response.buttons_info !== '') {
                    response_templete.buttons = response.buttons_info.map(
                      function (button) {
                        let buttonObj = {};
                        buttonObj.title = button.title;
                        buttonObj.payload = button.payload;
                        return buttonObj;
                      }
                    );
                  }
                  //add image if it is available.
                  if (response.response_image_url != null && response.response_image_url !== '') {
                    response_templete.image = response.response_image_url;
                  }
                  responsesArrObj[response.action_name].push(response_templete);
                });
                domain_yml_obj.templates = responsesArrObj;
              }
              //build templetes
              try {
                if (!angular.equals(domain_yml_obj, {}))
                  $scope.domain_yml = yaml.stringify(domain_yml_obj);
              } catch (e) { }
            },
            function () { }
          );
        }
      });
    });
  }