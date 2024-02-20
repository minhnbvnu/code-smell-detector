function validate_email_to_be_free(args) {
  let validate_args = Joi.validate(args, validate_email_to_be_free_schema);

  if (validate_args.error) {
    Exception.throw_user_error({
      system_error : 'validate_email_to_be_free failed arguments validation',
      user_error   : 'Failed to validate email',
    });
  }

  return Models
    .User
    .find_by_email(args.email)
    .then(user => {

      if (user) {
        Exception.throw_user_error(
          'Email is already in use'
        );
      }

      return Promise.resolve();
  });
}