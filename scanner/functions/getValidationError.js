function getValidationError(number, countryCode) {
  try {
    var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    var numberObj = phoneUtil.parseAndKeepRawInput(number, countryCode);
    return phoneUtil.isPossibleNumberWithReason(numberObj);
  } catch (e) {
    //console.log(e);

    // here I convert thrown errors into ValidationResult enums (if possible)
    // errors are from i18n.phonenumbers.Error in the file https://github.com/googlei18n/libphonenumber/blob/master/javascript/i18n/phonenumbers/phonenumberutil.js
    if (e.message == i18n.phonenumbers.Error.INVALID_COUNTRY_CODE) {
      return i18n.phonenumbers.PhoneNumberUtil.ValidationResult.INVALID_COUNTRY_CODE;
    }
    if (e.message == i18n.phonenumbers.Error.TOO_SHORT_AFTER_IDD || e.message == i18n.phonenumbers.Error.TOO_SHORT_NSN) {
      return i18n.phonenumbers.PhoneNumberUtil.ValidationResult.TOO_SHORT;
    }
    if (e.message == i18n.phonenumbers.Error.TOO_LONG) {
      return i18n.phonenumbers.PhoneNumberUtil.ValidationResult.TOO_LONG;
    }

    // broken
    return -99;
  }
}