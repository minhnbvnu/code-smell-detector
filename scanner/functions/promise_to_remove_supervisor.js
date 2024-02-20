function promise_to_remove_supervisor(args) {
  var
    supervisor_id = args.supervisor_id,
    company       = args.company,
    department    = args.department;

  // Make sure that provided supervisor ID belongs to user from current company
  if (company.users.map(function(u){return String(u.id)}).indexOf( String(supervisor_id) ) === -1){
    return Promise.resolve(1);
  }

  return  department.Model.sequelize.models.DepartmentSupervisor.destroy({
    where : {
      department_id : department.id,
      user_id       : supervisor_id,
    },
  });
}