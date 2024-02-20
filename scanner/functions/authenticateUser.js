function authenticateUser(req, res, next) {
  //authenticate user
  logger.winston.info('Authenticate User');
  if (req.body.username === global.admin_username && req.body.password === global.admin_password) {
    //create token and send it back
    const tokenData = { username: 'admin', name: 'Portal Administrator' };
    // if user is found and password is right
    // create a token]
    var token = ""
    try {
      token = jwt.sign(tokenData, global.jwtsecret);
    } catch (err) {
      logger.winston.error(err);
    };
    // return the information including token as JSON
    res.json({ username: 'admin', token: token });
  } else {
    logger.winston.error('Information didnt match or not provided.');
    return res.status(401).send({
      success: false,
      message: 'Username and password didnt match.'});
  }
}