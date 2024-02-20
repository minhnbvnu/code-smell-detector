function trimUserDetails(options) {
  return trimMultiple(options, ['username', 'email', 'phoneNumber']);
}