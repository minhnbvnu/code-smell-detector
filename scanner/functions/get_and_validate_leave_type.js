function get_and_validate_leave_type(args) {
  let
    req       = args.req,
    suffix    = args.suffix,
    item_name = args.item_name;

  // Get user parameters
  let
    name          = validator.trim(req.body['name__'+suffix]),
    color        = validator.trim(req.body['color__'+suffix]) || 'leave_type_color_1',
    limit        = validator.trim(req.body['limit__'+suffix]) || 0,
    first_record = validator.trim(req.body['first_record'])   || 0,
    use_allowance = validator.toBoolean(
      req.body['use_allowance__'+suffix]
    ),
    auto_approve = validator.toBoolean(
      req.body['auto_approve__'+suffix]
    );

  // If no name for leave type was provided: do nothing - treat case
  // as no need to update the leave type
  if ( ! name ) {
    return false;
  }

  // VPP TODO move that into resusable component
  let throw_user_error = function(message){
    let error = new Error(message);
    error.user_message = message;
    throw error;
  };

  // Validate provided parameters
  if ( ! validator.matches(color, /^leave_type_color_\d+$/)) {
    throw_user_error( 'New color for '+item_name+' should be valid css class' );
  }

  if ( ! validator.isNumeric(limit) ){
    throw_user_error( 'New limit for '+item_name+' should be a valide number' );

  } else if ( limit < 0) {
    throw_user_error( 'New limit for '+item_name+' should be positive number or 0' );
  }

  return {
    name          : name,
    color         : color,
    use_allowance : use_allowance,
    auto_approve  : auto_approve,
    limit         : limit,
    sort_order    : ( (first_record && (String(first_record)===String(suffix))? 1 : 0) ),
  };
}