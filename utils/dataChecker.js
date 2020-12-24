function dataChecker(req, res, next) {
	var errors = false
	const body = req.body
	for (var prop in body) {
		if (body[prop]==='') {
			errors = true
			break
		}
	}
	if(errors) {
		res.status(400)
	}
	else {
		next()
	}
}
module.exports = dataChecker