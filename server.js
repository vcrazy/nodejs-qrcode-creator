var express = require('express'),
	app = express(),
	qrcode = require('./qrcode.js'),
	data = {
		text: 'http://ganev.bg',
		size: 4, // 1 - 10
		err_corr: 'M', // 'L', 'M', 'Q', 'H'
		port: 4586,
		struct: 'img'
	},
	Request,
	Response;

// start the drums
app.listen(data.port);

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

		data.text = Request.query.text || data.text;
		data.size = Request.query.size || data.size;
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
