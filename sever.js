var express = require('express')
var fs = require('fs')
var	app = express()
app.use(express.static('public'))
app.get('/',function(req,res){
	console.log('a request recieved')
	res.set({
		'Cache-Control':'no-store,must-revalidate',
	})
	res.sendFile(__dirname + '/slider.html',function(){
		console.log('slider is sent');
	})
})
app.get('/pic',function(req,res){
	console.log('pic request')
	res.set({'Cache-Control':'no-store,must-revalidate','Content-Type':'text/plain'})
	var dirs = fs.readdir('./public/imgs',function(err,files){
		if(err){console.log('读取文件出错 '+err.stack);}
			else{res.send({dir:'imgs/',files});res.end()}
	})	
})
var server = app.listen(8088,function() {
	var host = server.address().hostName
	var port = server.address().port
	console.log('http://'+host+':'+port+' is running')
})