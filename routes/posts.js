const express				=	require('express');
const router				=	express.Router();

const { body, validationResult }	=	require('express-validator');

const connection			=	require('../config/database');


router.get('/', function(req, res){


	connection.query('SELECT * FROM posts ORDER BY id DESC', function(err, rows){
		if(err){
			return res.status(500).json({
				status 		: 	false,
				message 	: 	'Server Internal Error'
			});
		}else{
			return res.status(200).json({
				status 		: 	true,
				message 	: 	'List Data Posts',
				data 		: 	rows
			})
		}
	});


});

router.post('/store', [

	body('title').notEmpty(),
	body('content').notEmpty()


	], (req, res)=>{


		const errors 		=	validationResult(req);

		if(!errors.isEmpty()){
			return res.status(500).json({
				errors 		: 	errors.array()
			})
		}


		let formData 		=	{
			title  : req.body.title,
			content: req.body.content
		}

		connection.query(`INSERT INTO posts SET ?`, formData, function (err, rows) {
			if(err){
				return res.status(500).json({
					status 	: 	false,
					message : 	'Internal Server Error',
				})
			}else{
				return res.status(200).json({
					status 	: 	true,
					message : 	'Insert Data Successfully',
					data 	: 	rows[0]
				})
			}
		})

	});

router.get('/(:id)', function(req, res) {
	

	let id 		= 	req.params.id;
	connection.query(`SELECT * FROM posts WHERE id=${id}`, function (err, row) {
		if(err){
			return res.status(500).json({
				status 	: 	false,
				message : 	'Server Internal Error'
			});
		}


		if(row.length <= 0){
			return res.status(404).json({
				status 	:  	false,
				message : 'Data posts not found'
			})
		}else{
			return res.status(200).json({
				status : true,
				message: "List Data Posts",
				data   : row[0]
			})
		}

	})


});


router.patch('/update/:id', [ 
	body('title').notEmpty(),
	body('content').notEmpty()
 ], function (req, res) {
	
	const errors 		= 	validationResult(req);
	if(!errors.isEmpty()){
		return res.status(422).json({
			errors 		: 	errors.array()
		});
	}
	let id 				= 	req.params.id;

	let formData 		= 	{
		title 			: 	req.body.title,
		content 		:   req.body.content
	}


	connection.query(`UPDATE posts SET ? WHERE id=${id}`, formData, function (err, rows) {
		if(err){
			return res.status(500).json({
				status  :   false,
				message : 	'Server Internal Error'
			});
		}else{
			return res.status(200).json({
				status  :   true,
				message :  'Update Data Successfully!',
			});
		}
	})


});
 
 // Delete Posts
 router.delete('/delete/(:id)', function (req, res) {
 	let id = req.params.id;

 	connection.query(`DELETE FROM posts WHERE id=${id}`, function (err, rows) {
 		if(err){
 			return res.status(500).json({
 				status : false,
 				message: 'Server Internal Error'
 			});
 		}else{
 			return res.status(200).json({
 				status : true,
 				message: 'Delete Successfully'
 			})
 		}
 	})

 })

module.exports = router;