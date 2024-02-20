function calcOptions(options) {
      return options ? angular.extend({}, defaults, options) : defaults;
    }