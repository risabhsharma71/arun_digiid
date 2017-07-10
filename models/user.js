'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({ 

	firstname		: String,
	lastname		:String,
	email			: {type: String, unique: true}, 
	phone			: Number,
	pin  			: Number,
	rapidID         : String,
	created_at		: String,
	temp_pin		: Number,
	temp_pin_time	: String,
	orgname			:String,
	orgcontact		:Number,
	
});


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/digitalId', { useMongoClient: true });

module.exports = mongoose.model('user', userSchema);        
