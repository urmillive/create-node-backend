const AppError = require('../utils/appError');

exports.getHome = (req, res, next) => {
  try {
    res.status(200).json({ message: 'Welcome to the backend starter 🚀' });
  } catch (err) {
    next(new AppError('Something went wrong', 500));
  }
};
