function handleError(err, res, status) {
	res.status(status)
	console.error(err) 
}
module.exports = handleError