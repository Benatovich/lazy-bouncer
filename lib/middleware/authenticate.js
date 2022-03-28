const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  /*
    TODO: Check for the session cookie and verify
    its contents using jsonwebtoken, then
    assign the payload to req.user
  */
  try {
  //  check for the session cookie
    const { session } = req.cookies;

    // verify contents using jsonwebtoken
    const payload = jwt.verify(session, process.env.JWT_SECRET);

    // assign payload to req.user
    req.user = payload;

    next();
  } catch (error) {
    error.message = 'Please sign in to continue';
    error.status = 401;
    next(error);
  }
};
