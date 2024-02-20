function isPhone(num) {
    try {
        var phoneNumber = phoneUtil.parse(num, 'MY');
        return true;
    } catch (e) {
        return false;
    }
}