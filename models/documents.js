'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const docSchema = mongoose.Schema({ 


	rapidID         :String,
    aadhar          :Number,
    pan             :String,
    passport        :String,
    orgDoc          :String,
	created_at		: String
	
});


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/digitalId', { useMongoClient: true });

module.exports = mongoose.model('doc', docSchema);        
