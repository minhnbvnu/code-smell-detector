function promise_to_update_supervisors(args) {

  var
    req        = args.req,
    company    = args.company,
    department = args.department;

  var supervisor_ids = req.body.supervisor_id || [];

  // Take list of all users as a base of intersaction,
  // so we use submitted data only as criteria and do not save it in database
  supervisor_ids = company.users
    .map(function(user){ return user.id})
    .filter(function(id){ return supervisor_ids.indexOf(String(id)) !== -1});

  var link_model = department.Model.sequelize.models.DepartmentSupervisor;

  return link_model.destroy({
    where : {
      department_id : department.id,
    }
  })
  .then(function(){
    return link_model.bulkCreate(
      supervisor_ids.map(function(id){ return { user_id : id, department_id : department.id  } })
    );
  });
}