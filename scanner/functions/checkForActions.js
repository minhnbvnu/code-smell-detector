function checkForActions(messages_response) {
    if (messages_response.confidence && messages_response.confidence >= 1) {
      var body = { 'conversation_id': $scope.selected_conversation.conversation_id, action: { 'name': messages_response.scores[0].action } };
      $http.post(appConfig.api_endpoint_v2 + '/rasa/conversations/execute', JSON.stringify(body)).then(function (response) {
        if (response.data && response.data.tracker) {
            var typing = {};
            typing.event = "bot"
            typing.text = " .... ";
            $scope.transactions.push(typing);
            
            $timeout(function () {
              $scope.transactions.pop();
              $scope.selected_conversation.conversation = JSON.stringify(response.data);
              $scope.transactions = response.data.tracker.events;
              $scope.loadConversationStory($scope.selected_conversation.conversation_id);
              scrollToMessage();
            }, 1000);
        }
      },
        function (errorResponse) {
          //
        }
      );
    }
  }