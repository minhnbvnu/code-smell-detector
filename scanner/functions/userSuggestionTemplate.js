function userSuggestionTemplate(context) {
      var template = templates.suggestion;
      return $(template(context)).attr("id", _.guid());
    }