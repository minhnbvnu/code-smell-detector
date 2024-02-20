function ensure_user_id_is_integer(args){
    var req     = args.req,
        user_id = args.user_id;

    if (! validator.isInt(user_id)){
        throw new Error(
          'User '+req.user.id+' tried to edit user with non-integer ID: '+user_id
        );
    }

    return;
}