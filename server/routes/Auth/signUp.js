const jwt = require('jsonwebtoken');
const { hash } = require('bcryptjs');
const config = require('../../utils/config');
const { users } = require('../../../Database/usersSchema')
// const nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
// 	service: 'gmail',
// 	auth: {
// 		user: 'mohd.alduraidi@gmail.com',
// 		pass: process.env.EMAIL_PASSWORD
// 	}
// })

// var mailOptions = {
// 	from: 'mohd.alduraidi@gmail.com',
// 	to: 'nonosyousef@gmail.com',
// 	subject: 'Sign up successfuly',
// 	text: 'lakaad matataaaaaaaag!!'
// };

// transporter.sendMail(mailOptions, (err, res) => {
// 	if (err) {
// 		console.log('Error', err);
// 		return;
// 	} else {
// 		console.log('Email Sent');
// 	}
// })

module.exports = register = async (req, res) => {
	console.log('lets connect with db register')
	const { firstName, email, lastName, password, role } = req.body;
	// console.log(firstName, email, password,lastName, acceptTerms, role)
	users.find({ email: email }, (err, data) => {
		if (err) {
			res.sendStatus(500);
		} else if (data.length > 0) {
			res.send({
				status: 409,
				message: 'User Already Exist'
			});
			return;
		} else {
			hash(password, 10, (err, hash) => {
				if (err) {
					res.sendStatus(500);
				}
				const newUsers = new users({ ...req.body, password: hash });

				newUsers.save((err) => {
					if (err) {
						res.sentStatus(500);
					}
					const token = jwt.sign(req.body, config.secret);

					res.send({
						status: 200,
						token,
						role,
						message: `Welcome ${firstName}`,
					});
				});
			});
		}
	})
};





