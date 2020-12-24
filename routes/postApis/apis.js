require('dotenv').config()
const router = require('express').Router()
const {db_selected} = process.env
const dataChecker = require('../../utils/dataChecker')
const handleError = require('../../utils/handleError')

var requestService = {}
if (db_selected) {requestService = require('../../services/reqServiceSql')}
else {requestService = require('../../services/reqServiceMongo')}

router.get('/', async (req, res)=>{
	try{
		const posts = await requestService.findAll()
		res.status(200).json(posts)
	} catch(err){
		handleError(err, res, 503)
	}
})

router.get('/:id', async (req, res)=>{
	try{
		const _id = req.params.id
		const post = await requestService.findById(_id)
		res.status(200).json(post)
	} catch(err){
		handleError(err, res, 503)
	}
})

router.post('/', dataChecker, async (req, res)=>{
	try{
		// cuando hace el fetch lo hace correctamente y me crea el post
		await requestService.save(req.body) // crea el post
		res.status(201) // en teoria al terminar de crear, le responde pero
						//el front se queda clavado esperando el 'const response = ...'
	} catch(err){
		handleError(err, res, 503)
	}
})

router.put('/', dataChecker, async (req, res)=>{
	try{
		await requestService.update(req.body)
		res.status(200)
	} catch(err){
		handleError(err, res, 503)
	}
})

router.delete('/:id', async (req, res)=>{
	try{
		const _id = req.params.id
		await requestService.delete(_id)
		res.status(200)
	} catch(err){
		handleError(err, res, 503)
	}
})

module.exports = router