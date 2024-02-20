function validateEmailString(emailListString) {
    var emailList = _.compact(_.map(emailListString.split(','), function (email) {
      return email.trim();
    }));

    if (emailList.length < 1) {
      return false;
    }

    var emailListValidation = _.map(emailList, function (email) {
      return win.booktype.utils.validateEmail(email);
    });

    return _.every(emailListValidation);
  }