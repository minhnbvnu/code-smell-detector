function get_and_validate_user_parameters(args) {
    var req         = args.req,
        item_name   = args.item_name,
        require_password = args.require_password || false;

    // Get user parameters
    var name     = validator.trim(req.body['name']),
        lastname = validator.trim(req.body['lastname']),
        email    = validator.trim(req.body['email_address']),
        department_id     = validator.trim(req.body['department']),
        start_date        = validator.trim(req.body['start_date']),
        end_date          = validator.trim(req.body['end_date']),
        adjustment        = validator.trim(req.body['adjustment']),
        password          = validator.trim(req.body['password_one']),
        password_confirm  = validator.trim(req.body['password_confirm']),
        admin             = validator.toBoolean(req.body['admin']),
        auto_approve      = validator.toBoolean(req.body['auto_approve']);

    // Validate provided parameters

    if (!validator.isEmail(email)) {
        req.session.flash_error(
            'New email of '+item_name+' should be valid email address'
        );
    }

    if (!validator.isNumeric(department_id)) {
        req.session.flash_error(
            'New department number of '+item_name+' should be a valid number'
        );
    }

    if (adjustment && ! validator.isFloat(adjustment) ) {
      req.session.flash_error(
        'New allowance adjustment of '+item_name+' should be a valid number'
      );
    } else if (adjustment && ! ( adjustment % 1 === 0 || Math.abs( adjustment % 1 ) === 0.5 )) {
      req.session.flash_error(
        'New allowance adjustment of '+item_name+' should be either whole integer number or with half'
      );
    }

    start_date = req.user.company.normalise_date( start_date );

    if (!validator.isDate(start_date)) {
      req.session.flash_error(
        'New start date for '+item_name+' should be valid date'
      );
    }

    if (end_date ){

      end_date = req.user.company.normalise_date( end_date );

      if ( ! validator.isDate(end_date)) {
        req.session.flash_error(
          'New end date for '+item_name+' should be valid date'
        );
      }
    }

    if (
        start_date &&
        end_date &&
        moment.utc(start_date).toDate() > moment.utc(end_date).toDate()
    ){
        req.session.flash_error(
            'End date for '+item_name+' is before start date'
        );
    }

    if (password && password !== password_confirm) {
      req.session.flash_error('Confirmed password does not match initial one');
    }

    if (require_password && ! password) {
      req.session.flash_error('Password is required');
    }

    if ( req.session.flash_has_errors() ) {
        throw new Error( 'Got validation errors' );
    }

    // Normalize email as we operate only with lower case letters in emails
    email = email.toLowerCase();

    var attributes = {
        name         : name,
        lastname     : lastname,
        email        : email,
        DepartmentId : department_id,
        start_date   : start_date,
        end_date     : (end_date || null),
        admin        : admin,
        auto_approve : auto_approve,
    };

    if (adjustment || String(adjustment) === '0') {
      attributes.adjustment = adjustment;
    }

    if ( password ) {
      attributes.password = password;
    }

    return attributes;
}