const allErrorHandler = (err, req, res, next) => {
  if (err) {
    res.json({
      error: err.message,
    });
  } else {
    res.json({
      message: "Something Went Wrong",
    });
  }
};

module.exports = allErrorHandler;
