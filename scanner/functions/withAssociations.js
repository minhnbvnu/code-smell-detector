function withAssociations() {

  this.associate = function(models){

    models.User.belongsTo(models.Company, {
      as : 'company',
    });
    models.User.belongsTo(models.Department, {
      as         : 'department',
      foreignKey : 'DepartmentId',
    });
    models.User.hasMany(models.Leave, {
      as         : 'my_leaves',
      foreignKey : 'userId',
    });
    models.User.hasMany(models.UserFeed, {
      as         : 'feeds',
      foreignKey : 'userId',
    });
    models.User.hasMany(models.UserAllowanceAdjustment, {
      as         : 'adjustments',
      foreignKey : 'user_id',
    });
  };
}