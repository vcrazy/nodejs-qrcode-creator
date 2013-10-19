var express = require('express'),
	app = express(),
	qrcode = require('./qrcode.js'),
	data = {
		text: 'http://ganev.bg',
		size: 4, // 1 - 10
		err_corr: 'M', // 'L', 'M', 'Q', 'H'
		port: 4586
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

		var size = Request.query.size,
			err_corr = Request.query.err_corr.toUpperCase();

		data.text = Request.query.text || data.text;
		data.size = (size && size >= 1 && size <=10) ? size : data.size;
		data.err_corr = ['L', 'M', 'Q', 'H'].indexOf(err_corr) > -1 ? err_corr : data.err_corr;
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
