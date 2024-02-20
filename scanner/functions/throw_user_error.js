function throw_user_error(args) {
  const validate_args = Joi.validate(args, schema_throw_user_error);

  // Ensure all necesasry info was privided
  if ( validate_args.error) {
    // Tricky case here as we failed to rais exception, so log all data we have
    // and still rais generic exception
    console.log(
      'throw_user_error got invalid parameters: '
      + validate_args.annotate()
    );
    console.dir(args);
    throw new Error('Failed to throw user errors');
  }

  let system_error_message,
      user_error_message;

  // Special case when user is lazy and specified generic error message to be
  // used for system and customer level
  if ( typeof args === 'string' ) {
    system_error_message = user_error_message = args;
  } else {
    system_error_message = args.system_error;
    user_error_message   = args.user_error;
  }

  let exception = new Error( system_error_message );

  if ( user_error_message ) {
    exception.user_error_message = user_error_message;
  }

  exception.tom_error = true;

  throw exception;
}