function get_instance_methods(sequelize) {

  return {

    is_my_password : function( password ) {
        return sequelize.models.User.hashify_password( password ) === this.password;
    },

    /*
     * Activate user only when it is inactive.
     * Return promise that gets user's object.
     * */
    maybe_activate : function(){
      if ( ! this.activated ) {
          this.activated = true;
      }
      return this.save();
    },

    is_admin : function() {
      return this.admin === true;
    },

    /*
     * Indicates is leave requests from current user are automatically approved
     * */
    is_auto_approve : function(){
      return this.auto_approve === true;
    },

    full_name : function() {
      return this.name + ' ' + this.lastname;
    },

    /*
     * Indicates if the user is active
     * */
    is_active : function(){
      return this.end_date === null || moment(this.end_date).isAfter(moment());
    },

    // TODO VPP: rename this method as its name misleading: it returns all users
    // managed by current users + user itself, so it should be something like
    // "promise_all_supervised_users_plus_me"
    // In fact this method probably have to be ditched in favour of more granular ones
    //
    promise_users_I_can_manage : async function(){
      const self = this;

      let users = [];

      if ( self.is_admin() ) {
        // Check if current user is admin, then fetch all users form company
        const company = await self.getCompany({
          scope : ['with_all_users'],
        });

        users = company.users;

      } else {
        // If current user has any departments under supervision then get
        // all users from those departments plus user himself,
        // if no supervised users an array with only current user is returned
        const departments = await self.promise_supervised_departments();

        users = departments.map(({users}) => users).flat();
      }

      // Make sure current user is considered as well
      users.push(self);

      users = _.uniq(users, ({id}) => id);
      users = users.sort((a, b) => sorter(a.lastname, b.lastname));

      return users;
    },

    /*
     * Return user's boss, the head of department user belongs to
     *
     * */
    promise_boss : function(){
      return this.getDepartment({
        scope : ['with_boss'],
      })
      .then(department => Promise.resolve( department.boss ));
    },

    /*
     *  Return users who could supervise current user, that is those who could
     *  approve its leave requests and who can create leave requests on behalf of
     *  those user.
     *
     * */
    promise_supervisors : function(){
      return this.getDepartment({
        scope : ['with_boss', 'with_supervisors'],
      })
      .then( department => Promise.resolve( _.flatten([ department.boss, department.supervisors ]) ) );
    },

    promise_supervised_departments : function() {
      let self = this;

      return sequelize.models.DepartmentSupervisor.findAll({ where : { user_id : self.id } })
        // Obtain departments current user supervises as secondary supervisor
        .then(department_supervisors => department_supervisors.map( obj => obj.department_id ))
        .then( department_ids => {

          if ( ! department_ids ) {
            department_ids = [];
          }

          return sequelize.models.Department.scope('with_simple_users').findAll({
            where : {
              $or : [
                { id : department_ids },
                { bossId : self.id },
              ]
            }
          });
        });
    },

    promise_supervised_users : function () {
      let self = this;

      return self
        .promise_supervised_departments()
        .then(departments => {
          return self.Model.findAll({ where : { DepartmentId : departments.map(d => d.id ) } });
        })
    },


    // Generate object that represent Employee allowance
    promise_allowance : function(args) {
      args = args || {};
      // Override user to be current one
      args.user = this;
      return UserAllowance.promise_allowance(args);
    },

    reload_with_leave_details : function(args){
      const self = this;
      const dbModel = self.sequelize.models;

      return Promise.join(
        self.promise_my_active_leaves(args)
          .then(leaves => LeaveCollectionUtil.enrichLeavesWithComments({leaves, dbModel})),
        self.getDepartment(),
        self.promise_schedule_I_obey(),
        function(leaves, department, schedule){
          self.my_leaves = leaves;
          self.department = department;

          // Note: we do not do anything with scheduler as "promise_schedule_I_obey"
          // sets the "cached_schedule" attribute under the hood, which is used in
          // synchronous code afterwards. Yes... itaza`z is silly, but it is where we are
          // at thi moment after mixing non blocking and blocking code together...
          //
          return Promise.resolve(self);
        }
      );

    },

    // This method reload user object to have all necessary information to render
    // each page
    reload_with_session_details : function(){
      var self = this;
      return Promise.join(
        self.promise_users_I_can_manage(),
        self.get_company_with_all_leave_types(),
        self.promise_schedule_I_obey(),
        function(users, company, schedule){
          self.supervised_users = users || [];
          self.company = company;

          // Note: we do not do anything with scheduler as "promise_schedule_I_obey"
          // sets the "cached_schedule" attribute under the hood, which is used in
          // synchronous code afterwards. Yes... it is silly, but it is where we are
          // at thi moment after mixing non blocking and blocking code together...

          return Promise.resolve(self);
        });
    },


    remove : function() {
      var self = this;

      // make sure I am not admin, otherwise throw an error
      if (self.is_admin()) {
        throw new Error('Cannot remove administrator user');
      }

      // make sure I am not supervisor, otherwise throw an error
      return self.promise_supervised_departments()
        .then(departments => {
          if (departments.length > 0){
            throw new Error("Cannot remove supervisor");
          }

          return self.getMy_leaves();
        })
        .then(function(leaves){
          // remove all leaves
          return Promise.all(
            _.map( leaves, function(leave){ return leave.destroy(); })
          );
        })

        // remove user record
        .then(function(){
          return self.destroy();
        })

    },

    get_reset_password_token : function(){
      var self = this;

      return new Buffer( self.email + ' ' + self.Model.hashify_password( self.password ) ).toString('base64');
    },

    // Accept an object that represent email to be sent to current user and
    // record it into the corresponding audit table
    //
    record_email_addressed_to_me : function(email_obj) {

      // validate email object to contain all necessary fields
      if ( ! email_obj ||
        ! email_obj.hasOwnProperty('subject') ||
        ! email_obj.subject ||
        ! email_obj.hasOwnProperty('body') ||
        ! email_obj.body
      ) {
        throw new Error(
          'Got incorrect parameters. There should be an object '+
          'to represent and email and contain subject and body'
        );
      }

      const promise_action = this.sequelize.models.EmailAudit.create({
        email      : this.email,
        subject    : htmlToText.fromString(email_obj.subject),
        body       : htmlToText.fromString(email_obj.body),
        user_id    : this.id,
        company_id : this.companyId,
      });

      return promise_action;
    },

    promise_schedule_I_obey : function(){
      var self = this;

      if ( self.cached_schedule ) {
        return Promise.resolve( self.cached_schedule );
      }

      return self.sequelize.models.Schedule
        .findAll({
          where : {
            $or : [
              { user_id : self.id },
              { company_id : self.companyId },
            ]
          }
        })
        .then(function(schedules){

          // no schedules for current user in DB, return default one
          if (schedules.length === 0) {
            return self.sequelize.models.Schedule
              .promise_to_build_default_for({ company_id : self.companyId })
              .then(function(sch){ self.cached_schedule = sch; return Promise.resolve(sch) });
          }

          // there are two schedules, presumably one company wide and another
          // is user specific, return later one
          if (schedules.length === 2) {
            return Promise.resolve(
              _.find(schedules, function(sch){ return sch.is_user_specific() })
            )
            .then(function(sch){ self.cached_schedule = sch; return Promise.resolve(sch) });
          }

          // single schedule means it is company wide one
          return Promise.resolve( schedules.pop() )
            .then(function(sch){ self.cached_schedule = sch; return Promise.resolve(sch) });
        });
    },

  };

}