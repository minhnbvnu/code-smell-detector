function promise_to_update_department(args) {
  var
    req        = args.req,
    company    = args.company,
    department = args.department;

  var attributes = get_and_validate_department({
    company         : company,
    department_name : department.name,
    no_suffix       : true,
    req             : req,
  });

  // If there were any validation errors: do not update department
  if ( req.session.flash_has_errors() ) {
    throw new Error("Invalid parameters submitted while while attempt to update department details");
  }

  return department.updateAttributes(attributes);
}