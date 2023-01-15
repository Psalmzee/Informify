module.exports = (err, req, res, next) => {
	logger.error(err.message);
	res.status(500).json({status: 'Failed!', error: 'Failed to Process this request!'});
    next()
};

  