function emailVerified (user) {
  return user.emails.some(function (email) {
    return email.verified
  })
}