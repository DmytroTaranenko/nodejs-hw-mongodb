import createHttpError from 'http-errors';

import { Session } from '../models/session.js';
import { User } from '../models/User.js';

export async function authenticate(req, res, next) {
  const { authorization } = req.headers;

  if (typeof authorization !== 'string') {
    return next(createHttpError(401, 'Please provide access token'));
  }

  const [bearer, accessToken] = authorization.split(' ', 2);

  if (bearer !== 'Bearer' || typeof accessToken !== 'string') {
    return next(createHttpError(401, 'Please provide access token'));
  }

  const session = await Session.findOne({ accessToken });

  if (session === null) {
    return next(createHttpError(401, 'Session is not success'));
  }

  if (new Date() > session.accessTokenValidUntil) {
    return next(createHttpError(401, 'Access token is expired'));
  }

  const user = await User.findById(session.userId);

  if (user === null) {
    return next(createHttpError(401, 'Session is not found'));
  }

  req.user = { id: user._id, name: user.name , email: user.email};

  next();
}
