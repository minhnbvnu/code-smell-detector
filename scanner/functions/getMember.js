function getMember(entry) {
    var user;

    // Try by phone number
    user = _.find(LIST, {
        phone: phone.normalize(entry)
    });
    if (user) return user;

    return _.find(LIST, {
        username: username.normalize(entry)
    });
}