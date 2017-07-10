'use strict';
var crypto = require('crypto');
const jwt = require('jsonwebtoken');
const register = require('./functions/register');

const registerOrg = require('./functions/registerorg');
const login = require('./functions/login');
const profile = require('./functions/profile');
const password = require('./functions/password');
const config = require('./config/config.json');


module.exports = router => {

	router.get('/', (req, res) => res.end("Welcome to Learn2Crack !"));

	router.post('/login', (req, res) => {

		const email = req.body.email;

		const pin = req.body.pin;

		if (!email||!pin||!email.trim()) {

			res.status(400).json({ message: 'Invalid Request !' });

		} else {

			login.loginUser(email, pin)

			.then(result => {
				

				
				if ('orgname' in result.userObj) {

                    const token = jwt.sign(result, config.secret, { expiresIn: 1440 });
			       res.status(result.status).json({ message: result.message, token: token,usertype:"org" });

				}else{
					const token = jwt.sign(result, config.secret, { expiresIn: 1440 });
					res.status(result.status).json({ message: result.message, token: token,usertype:"ind" });
				}})

			   .catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

	router.post('/registerUser', (req, res) => {

		const firstname = req.body.firstname;
		console.log(firstname);
		const lastname = req.body.lastname;
		const email = req.body.email;
		console.log(email);
		const phone = req.body.phone;
		console.log(phone);
		const pin = req.body.pin;
		console.log(pin);
        const rapidID =crypto.createHash('sha256').update(email.concat(phone)).digest('base64');

		if (!firstname ||!lastname||!email ||!pin ||!phone) {

			res.status(400).json({message: 'Invalid Request !'});

		} else {

			register.registerUser(firstname,lastname,email,phone,pin,rapidID)

			.then(result => {

				res.setHeader('Location', '/users/'+email);
				res.status(result.status).json({ message: result.message,ind:true })
			})

			.catch(err => res.status(err.status).json({ message: err.message}));
		}
	});
	router.post('/registerOrg', (req, res) => {

		const orgname = req.body.orgname;
		const email = req.body.email;
		const orgcontact = req.body.orgcontact;
		const pin = req.body.pin;
         const rapidID = crypto.createHash('sha256').update(email.concat(orgcontact)).digest('base64');
	

		if (!orgname || !email || !pin ||!orgcontact||!rapidID|| !orgname.trim() || !email.trim() || !pin.trim()||!orgcontact.trim()) {

			res.status(400).json({message: 'Invalid Request !'});

		} else {

			registerOrg.registerOrg(orgname,email,orgcontact,pin,rapidID)

			.then(result => {

				res.setHeader('Location', '/org/'+email);
				res.status(result.status).json({ message: result.message,org:true })
			})

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

	router.get('/users/:id', (req,res) => {

		if (checkToken(req)) {

			profile.getProfile(req.params.id)

			.then(result => res.json(result))

			.catch(err => res.status(err.status).json({ message: err.message }));

		} else {

			res.status(401).json({ message: 'Invalid Token !' });
		}
	});

	router.put('/users/:id', (req,res) => {

		if (checkToken(req)) {

			const oldPin = req.body.pin;
			const newPin = req.body.newPin;

			if (!oldPin || !newPin || !oldPin.trim() || !newPin.trim()) {

				res.status(400).json({ message: 'Invalid Request !' });

			} else {

				password.changePassword(req.params.id, oldPassword, newPassword)

				.then(result => res.status(result.status).json({ message: result.message }))

				.catch(err => res.status(err.status).json({ message: err.message }));

			}
		} else {

			res.status(401).json({ message: 'Invalid Token !' });
		}
	});

	router.post('/users/:id/password', (req,res) => {

		const email = req.params.id;
		const token = req.body.token;
		const newPassword = req.body.password;

		if (!token || !newPassword || !token.trim() || !newPassword.trim()) {

			password.resetPasswordInit(email)

			.then(result => res.status(result.status).json({ message: result.message }))

			.catch(err => res.status(err.status).json({ message: err.message }));

		} else {

			password.resetPasswordFinish(email, token, newPassword)

			.then(result => res.status(result.status).json({ message: result.message }))

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

	function checkToken(req) {

		const token = req.headers['x-access-token'];

		if (token) {

			try {

  				var decoded = jwt.verify(token, config.secret);

  				return decoded.message === req.params.id;

			} catch(err) {

				return false;
			}

		} else {

			return false;
		}
	}
}