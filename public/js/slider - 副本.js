(function(){
	var pointer = 1;
	var pointnow = pointer;
	var pointermax =0;
	var destination = 0;

$(function(){
	var xhr = new XMLHttpRequest()
	var response = ''
	xhr.open('get','/pic',true)
	xhr.setRequestHeader('Cache-Control','no-store,must-revalidate')
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			response = xhr.responseText
			console.log('response:'+response)
			var pj = JSON.parse(response)
			console.log(pj.files[1])
			var rsrc =pj.dir
			//$('#container img').attr('src','imgs/'+pj.files[1])
			for(var i=1;i<pj.files.length;i++){
				$('#container ul').append('<li><img src = '+rsrc+'preloader.gif alt="图片加载失败"/></li>')
			}
			var lis = $('#container ul li')
			loadImage(lis,pj,rsrc)
			bind($('#container ul'))
			pointermax = lis.length
			window.addEventListener('pointerchange',function(){
				if(pointer<=lis.length){$('#container ul').off('touchstart');bind($('#container ul'))}
					else{console.log(pointermax);return}
			},false)
		var timer =	setInterval(function(){
				if(pointnow!=pointer){pointnow=pointer;$(window).trigger('pointerchange');}
			},10)			
		}
	}
	xhr.send()
})

function loadImage(lis,pj,rsrc){
	lis.forEach(function(item,index){ 
				var imgobj = new Image();
				imgobj.src = rsrc+pj.files[index]
				var Iwidth = imgobj.width
				var Iheigth = imgobj.height
				var sW = 0,sH = 0 
				var win = $(window)
				var Swidth = win.width()
				var Sheight = win.height()
				//console.log(Iwidth+':'+Iheigth+':'+Swidth+':'+Sheight)
				sW=Sheight*Iwidth/Iheigth;
				sH=Sheight;
				if(sW>Swidth){sW=Swidth;sH=Iheigth*sW/Iwidth}
				if(index<lis.length){$(item).children('img').attr({
					src:rsrc+pj.files[index],
					width:sW+'px',
					height:sH+'px',
			})}
		})
	console.log('加载图片完成')
}

function bind(ele){
	// var c = true;
	// var E = ele.find('li:nth-child('+pointnow+') img')
	// E.on('doubleTap',function(e){
	// 	if(c){
	// 		var w2 = 2*parseInt(E.attr('width')),h2=2*parseInt(E.attr('height'))
	// 		E.attr({width:w2+'px',height:h2+'px'})
	// 		c = false;
	// 		// E.on('touchstart',function(e){
	// 		// 	var p1={x:e.changedTouches[0].screenX,y:e.changedTouches[0].screenY}
	// 		// 	E.on('touchmove',function(e){
	// 		// 		var p2={x:e.changedTouches[0].screenX,y:e.changedTouches[0].screenY}
	// 		// 		var mx = p2.x-p1.x ,my = p2.y-p1.y
	// 		// 		E.css({'-webkit-transform':'translate('+mx+'px,'+my+'px)',})
	// 		// 		ele.find('li').css({'-webkit-transform':'translateX('+(-mx)+'px)',})										
	// 		// 	})
	// 		// 	E.on('touchend',function(){
	// 		// 		E.off('touchmove')
	// 		// 		E.off('touchstart')
	// 		// 		E.off('touchend')
	// 		// 		E.css({'-webkit-transform':'translate(0px,0px)',})
	// 		// 	})
	// 		// })
	// 	}else{
	// 		var w2 = 0.5*parseInt(E.attr('width')),h2=0.5*parseInt(E.attr('height'))
	// 		E.attr({width:w2+'px',height:h2+'px'})
	// 		c = true;
	// 	}
		
	// })
	// E.trigger('doubleTap')
	//var tStart=[]
	ele.on('touchstart',function(e){
	//	tStart.push(e.timeStamp)
	//	if(tStart.length>=2){tslice = tStart.slice(-2);if(tslice[1]-tslice[0]<200){dc = E.trigger('doubleTap');}}
		 //var dc1=dc
		 //dc=0
		
		e.preventDefault()
		var p1,p2
		p1 = {x:e.changedTouches[0].screenX}
		ele.on('touchmove',function(e){
			p2 = {x:e.changedTouches[0].screenX}
			var mx = p2.x-p1.x
			ele.find('li').css({'-webkit-transform':'translateX('+(destination+mx)+'px)',})
			var sW = $(window).width()
			if(mx<sW*(-1)/3){
				destination -= sW
				pointer++
				if(pointer>pointermax){
					console.log('已是最后一张')
					destination += sW
					pointer--
					bind(ele)
				}
				ele.find('li').css({'-webkit-transform':'translateX('+destination+'px)',})
				ele.off('touchmove')
			}else if(mx>sW/3){
				destination += sW
				if(pointer<=2){destination=0;pointer=1;bind(ele)}
				if(destination!=0)pointer--
				ele.find('li').css({'-webkit-transform':'translateX('+destination+'px)',})
				ele.off('touchmove')
			}
		},false)
		ele.on('touchend',function(e){
			e.stopPropagation()
			ele.find('li').css({'-webkit-transform':'translateX('+destination+'px)',})
		},false)			
	},false)
	console.log("bind "+ele+":"+pointnow)
}

})()