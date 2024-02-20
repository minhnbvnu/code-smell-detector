function _promise_to_unfold_context(context) {
  if (context.hasOwnProperty('user')){
    return context.user.reload_with_session_details();
  } else {
    return bluebird.resolve(1);
  }
}