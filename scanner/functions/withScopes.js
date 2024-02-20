function withScopes() {

  this.loadScope = function(models) {

    models.User.addScope(
      'active',
      function () {
        return { where : models.User.get_active_user_filter() };
      }
    );

    models.User.addScope(
      'withDepartments',
      () => ({
        include: [{
          model: models.Department,
          as: 'department',
        }],
      })
    );

    models.User.addScope(
      'with_simple_leaves',
      () => ({
        include : [{
          model : models.Leave,
          as : 'my_leaves',
          where : {
            $and : [
              { status : { $ne : models.Leave.status_rejected() } },
              { status : { $ne : models.Leave.status_canceled() } },
            ],
          },
        }],
      })
    );

  };
}