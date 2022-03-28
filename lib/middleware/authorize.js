const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  // TODO: Check req.user to ensure the user's email is 'admin'
  try {
    const { session } = req.cookies;
    const payload = jwt.verify(session, process.env.JWT_SECRET);
    console.log('|payload', payload);
    req.user = payload;
    
    // above here is taken from authenticate, below is new
    if (payload.email != 'admin'){
      const error = new Error('You do not have access to view this page');
      error.status = 403;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
};
