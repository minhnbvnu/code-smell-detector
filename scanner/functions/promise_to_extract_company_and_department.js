function promise_to_extract_company_and_department(req, only_active = true) {
  var department_id = req.params['department_id'],
    company;

  return Promise.try(function(){

    if ( ! validator.isInt(department_id)) {
      throw new Error('User '+req.user.id+' tried to open department refered by  non-int ID '+department_id);
    }

    if (only_active) {
      return req.user.getCompany({
        scope : ['with_active_users', 'order_by_active_users'],
      });
    } else {
      return req.user.getCompany({
        scope : ['with_all_users'],
      });
    }
  })
  .then(function(c){
    company = c;

    if ( ! company ) {
      throw new Error('Cannot determin company!');
    }

    return company.getDepartments({
      scope : ['with_simple_users', 'with_boss', 'with_supervisors'],
      where : {
        id : department_id,
      }
    });
  })
  .then(function(departments){
    var department = departments[0];

    // Ensure we have database record for given department ID
    if ( ! department ) {
      throw new Error('Non existing department ID provided');
    }

    return Promise.resolve({
      company    : company,
      department : department,
    });
  });
}