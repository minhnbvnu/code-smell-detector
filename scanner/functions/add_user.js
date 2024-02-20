function add_user(args) {
  let validated_args = Joi.validate(args, add_user_interface_schema);

  if (validated_args.error) {
    console.log('An error occured when validatin parameters for add_user: ');
    console.dir(validated_args);
    Exception.throw_user_error({
      system_error : 'Failed to add new due to validation errors',
      user_error : 'Failed to add user',
    });
  }

  // Use validated (and expanded) arguments object
  args = validated_args.value;

  let attributes = {};

  attributes.email        = args.email.toLowerCase();
  attributes.lastname     = args.lastname;
  attributes.name         = args.name;
  attributes.companyId    = args.company_id;
  attributes.DepartmentId = args.department_id;

  attributes.password     = Models.User.hashify_password(args.password);
  attributes.admin        = args.admin;
  attributes.auto_approve = args.auto_approve;
  attributes.end_date     = args.end_date;

  // Pass start date inky if it is set, otherwise rely on database to use
  // default value
  if (args.start_date) {
    attributes.start_date = args.start_date;
  }

  return Promise.resolve()

    // Ensure given department ID is owned by given company ID
    .then(() => Models.Department
      .findOne({
        where : { id : args.department_id, companyId : args.company_id },
      })
      .then( department => {
        if ( ! department ) {
          Exception.throw_user_error({
            system_error : 'Mismatch in department/company IDs when creating new user '
              + args.department_id + '/' + args.company_id,
            user_error : 'Used wrong department',
          });
        }
        return Promise.resolve();
      })
    )

    // Ensure provided email is free to use
    .then(() => validate_email_to_be_free({ email : args.email }))

    // Create new user record
    .then(() => Models.User.create(attributes));
}