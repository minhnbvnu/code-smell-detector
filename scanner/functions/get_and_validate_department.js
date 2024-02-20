function get_and_validate_department(args) {
  var req             = args.req,
      index           = args.suffix,
      company         = args.company,
      // If no_suffix is set then parameter names are considered without "indexes"
      no_suffix        = args.no_suffix,
      department_name = args.department_name;

  // Get user parameters
  let
    name      = validator.trim(req.body[no_suffix ? 'name'      : 'name__'+index]),
    allowance = validator.trim(req.body[no_suffix ? 'allowance' : 'allowance__'+index]),
    boss_id   = validator.trim(req.body[no_suffix ? 'boss_id'   : 'boss_id__'+index]),
    include_public_holidays = validator.toBoolean(
      req.body[no_suffix ? 'include_public_holidays' : 'include_public_holidays__'+index]
    ),
    is_accrued_allowance = validator.toBoolean(
      req.body[no_suffix ? 'is_accrued_allowance' : 'is_accrued_allowance__'+index]
    );

  // Validate provided parameters
  //
  // New allowance should be from range of (0;50]
  if (!validator.isFloat(allowance)) {
    req.session.flash_error(
      'New allowance for '+department_name+' should be numeric'
    );
  } else if (!((0 <= allowance) && (allowance <= 50))) {
    req.session.flash_error(
      'New allowance for '+department_name+' should be between 0.5 and 50 days'
    );
  }
  // New manager ID should be numeric and from within
  // current company
  if (!validator.isNumeric( boss_id ) ) {
    req.session.flash_error(
      'New boss reference for '+department_name+' should be numeric'
    );
  } else if ( ! _.contains(
    _.map( company.users, function(user){ return String(user.id) }),
      String(boss_id)
  )) {
    req.session.flash_error(
      'New boss for '+department_name+' is unknown'
    );
  }

  return {
    allowance               : allowance,
    bossId                  : boss_id,
    include_public_holidays : include_public_holidays,
    is_accrued_allowance    : is_accrued_allowance,
    name                    : name,
  };
}