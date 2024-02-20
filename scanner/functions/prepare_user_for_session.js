function prepare_user_for_session(args) {
  var user = args.user,
      done = args.done;

  user.maybe_activate()
    .then(function(user){
      return user.reload_with_session_details();
    })
    .then(function(){
      done(null, user);
    });
}