var express = require('express'),
	app = express(),
	qrcode = require('./qrcode.js'),
	defaults = {
		text: 'http://ganev.bg',
		size: 4, // 1 - 10
		err_corr: 'M', // 'L', 'M', 'Q', 'H'
		port: 4586
	},
	data,
	Request,
	Response;

// start the drums
app.listen(defaults.port);

// GET '/'
app.get('/', function(req, res){
	QR.config(req, res);
	Reponse.send(QR.img());
});

// GET '/img'
app.get('/img', function(req, res){
	QR.config(req, res);
	Reponse.send(QR.img());
});

// GET '/tbl'
app.get('/tbl', function(req, res){
	QR.config(req, res);
	Reponse.send(QR.tbl());
});

var QR = {
	config: function(req, res){
		Request = req;
		Reponse = res;

		var size = Request.query.size,
			err_corr = Request.query.err_corr;

		data.text = Request.query.text || defaults.text;
		data.size = (size && size >= 1 && size <=10) ? size : defaults.size;
		data.err_corr = (err_corr && ['L', 'M', 'Q', 'H'].indexOf(err_corr.toUpperCase()) > -1) ? err_corr.toUpperCase() : defaults.err_corr;
	},
	img: function(){
		return QR.create('Img');
	},
	tbl: function(){
		return QR.create('Table');
	},
	create: function(element_type){
		var qr = qrcode.qrcode(data.size, data.err_corr);
		qr.addData(data.text);
		qr.make();

		return qr['create' + element_type + 'Tag']();
	}
};
