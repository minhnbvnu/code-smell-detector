function leave_request_action(args) {
    var
      current_action      = args.action,
      leave_action_method = args.leave_action_method,
      was_pended_revoke   = false;

    return function(req, res){

    var request_id = validator.trim( req.body['request'] );

    if (!validator.isNumeric(request_id)){
      req.session.flash_error('Failed to ' + current_action);
    }

    if ( req.session.flash_has_errors() ) {
      console.error('Got validation errors on '+current_action+' request handler');

      return res.redirect_with_session('../');
    }

    Promise.try(function(){
      return req.user.promise_leaves_to_be_processed();
    })
    .then(function(leaves){
       var leave_to_process = _.find(leaves, function(leave){
          return String(leave.id) === String(request_id)
            && (leave.is_new_leave() || leave.is_pended_revoke_leave());
       });

       if (! leave_to_process) {
         throw new Error('Provided ID '+request_id
           +'does not correspond to any leave requests to be '+current_action
           +'ed for user ' + req.user.id
          );
       }

       was_pended_revoke = leave_to_process.is_pended_revoke_leave();

       return leave_to_process[leave_action_method]({ by_user : req.user });
    })
    .then(function(processed_leave){
      return processed_leave.reload({
        include : [
          {model : req.app.get('db_model').User, as : 'user'},
          {model : req.app.get('db_model').User, as : 'approver'},
          {model : req.app.get('db_model').LeaveType, as : 'leave_type' },
        ],
      });
    })
    .then(function(processed_leave){

      var Email = new EmailTransport();

      return Email.promise_leave_request_decision_emails({
        leave             : processed_leave,
        action            : current_action,
        was_pended_revoke : was_pended_revoke,
      })
      .then(function(){
        return Promise.resolve( processed_leave);
      });
    })
    .then(function(processed_leave){
      req.session.flash_message('Request from '+processed_leave.user.full_name()
          +' was processed');

      return res.redirect_with_session('../');
    })
    .catch(function(error){
      console.error('An error occurred when attempting to '+current_action
        +' leave request '+request_id+' by user '+req.user.id+' Error: '+error
      );
      req.session.flash_error('Failed to '+current_action);
      return res.redirect_with_session('../');
    });
  };

}