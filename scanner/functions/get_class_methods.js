function get_class_methods(sequelize) {
  return {

    /* hashify_password( password_string ) : string
     *
     * For provided string return hashed string.
     *
     * */
    hashify_password : function( password ) {
      return crypto
        .createHash('md5')
        .update(
          password + config.get('crypto_secret'),
          (config.get('crypto_hash_encoding') || 'binary')
        )
        .digest('hex');
    },


    get_user_by_reset_password_token : function(token) {
      var self                  = this,
      unpacked_token            = new Buffer(token, 'base64').toString('ascii'),
      email_and_hashed_password = unpacked_token.split(/\s/);

      return self.find_by_email(email_and_hashed_password[0])
        .then(function(user){
          if (user && self.hashify_password(user.password) === email_and_hashed_password[1]) {
            return Promise.resolve(user);
          } else {
            return Promise.resolve();
          }
        })
    },

    // Get active user by provided email address
    find_by_email : function( email ) {

      // TODO validate email

      var condition = { email : email };
      var active_users_filter = this.get_active_user_filter();
      for (var attrname in active_users_filter) {
        condition[attrname] = active_users_filter[attrname];
      }

      return this.find({ where : condition });
    },

    find_by_id : function(id) {
      return this.find({ where : {id : id}});
    },

    /*
     * Create new admin user within new environment - company etc
     * */
    register_new_admin_user : function(attributes){

      // TODO add parameters validation

      // Make sure we hash the password before storing it to DB
      attributes.password = this.hashify_password(attributes.password);

      var new_departments,
          new_user,
          country_code = attributes.country_code,
          timezone     = attributes.timezone,
          company_name = attributes.company_name;

      delete attributes.company_name;
      delete attributes.country_code;

      return sequelize.models.User.find_by_email( attributes.email )
        .then(function(existing_user){
          if (existing_user) {
            const error = new Error('Email is already used')
            error.show_to_user = true;
            throw error;
          }

          if (attributes.name.toLowerCase().indexOf('http') >= 0) {
            const error = new Error('Name cannot have links');
            error.show_to_user = true;
            throw error;
          }

          return sequelize.models.Company
            .create_default_company({
              name         : company_name,
              country_code : country_code,
              timezone     : timezone,
            });
        })

        // Make sure new user is going to be linked with a company
        .then(function(company){

          attributes.companyId = company.id;
          attributes.admin     = true;

          return company.getDepartments();
        })

        // Make sure new user is linked with department
        .then(function(departments){

          new_departments = departments;

          attributes.DepartmentId = departments[0].id;

          return sequelize.models.User.create( attributes );
        })

        // Make sure new departments know who is their boss
        .then(function(user){
          new_user = user;

          return Promise.all(_.map(new_departments, function(department){
            department.bossId = user.id;
            return department.save();
          }));
        })

        // Return promise with newly created user
        .then(function(){
          return Promise.resolve(new_user);
        });
    },

    get_active_user_filter : function(){
      return {
        $or : [
          { end_date : {$eq : null}},
          { end_date : {$gte : moment.utc().startOf('day').format('YYYY-MM-DD') }},
        ],
      };
    },

  };
}