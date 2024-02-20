function extract_user_error_message(error) {
  if ( ! error ) {
    return null;
  }

  if (typeof error === 'string') {
    return error;
  }

  if ( error.hasOwnProperty( 'user_error_message' )) {
    return error.user_error_message;
  }

  return 'N/A';
}