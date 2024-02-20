function getExampleNumber(countryCode, national, numberType) {
  try {
    var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    var numberObj = phoneUtil.getExampleNumberForType(countryCode, numberType);
    var format = (national) ? i18n.phonenumbers.PhoneNumberFormat.NATIONAL : i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL;
    return phoneUtil.format(numberObj, format);
  } catch (e) {
    return "";
  }
}