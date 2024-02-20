function normalizePhone(num) {
    try {
        var phoneNumber = phoneUtil.parse(num, 'MY');
        return phoneUtil.format(phoneNumber, phone.PhoneNumberFormat.INTERNATIONAL);
    } catch (e) {
        return num;
    }
}