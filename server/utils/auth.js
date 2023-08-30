const jwt = require('jsonwebtoken');

// Set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // Middleware for authentication in GraphQL
  authMiddleware: function ({ req }) {
    // Get the token from the request headers
    const token = req.headers.authorization || '';

    if (!token) {
      throw new AuthenticationError('You must be logged in.');
    }

    try {
      // Verify token and get user data out of it
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      return data;
    } catch {
      throw new AuthenticationError('Invalid token.');
    }
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
