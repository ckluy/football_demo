//基础配置

var WIDTH = 0;
var HEIGHT = 0;

var ballWidth = 50
var ballHeight = 50
var doorSpeed = 1;//球门速度
var doorWidth = 100;//球门宽度
var doorHeight = 50;//球门高度
var footballSpeed = 10;//足球速度
var fDistence = 0;//足球距离
var fTime = 0;//足球速度
var rate = 1;//倾斜角度 
var startTime = 0;//起始时间
var endTime = 0;//结束时间
var totalTime = 0



WIDTH = window.innerWidth;//设置宽度为屏幕的宽和高,适应手机屏幕的大小
HEIGHT = window.innerHeight;
// 足球
$("#ball").width(ballWidth)
$("#ball").height(ballHeight)
$("#ball").css('left',(WIDTH - ballWidth)/2 + "px")
$("#ball").css('top',HEIGHT*0.75 - ballWidth/2 + "px")
fDistence = HEIGHT*0.75 - ballWidth/2;
// 球门
$("#door").width(doorWidth)
$("#door").height(doorHeight)
$("#door").css('left',(WIDTH - doorWidth)/2 + "px")
$("#door").css('top', - doorHeight/2 + "px")


// 球门运动

// 足球运动
// 获得起始点

var down = 0;
var up = 0;
var index=0;
var w = 64;
var startX = 0;
var startY = 0;
var startTime = 0;//起始时间
var endTime = 0;//结束时间
var endX = 0;
var endY = 0;
var leftStep = 0;
var topStep = 0;
function tstart(event){
	startX=event.changedTouches[0].pageX;//获取手指刚触摸时的x坐标
	startY=event.changedTouches[0].pageY;//获取手指刚触摸时的y坐标
	startTime = new Date();
}
function tend(event){
	endX=event.changedTouches[0].pageX;//获取手指离开时的x坐标
	endY=event.changedTouches[0].pageY;//获取手指刚触摸时的x坐标
	endTime = new Date();
	totalTime = endTime-startTime;
	fSpeed(startX,startY,endX,endY)
	// console.log(footballSpeed)

	
}

//  足球的速度
function fSpeed(startX,startY,endX,endY){
	var tempX , tempY;
	// 足球的位移
	tempX = endX - startX;
	tempY = endY - startY;

	tempD = Math.sqrt(tempX*tempX + tempY*tempY);
	// 足球的速度
	console.log("位移:"+tempX+":"+tempY)
	console.log("位移时间:"+totalTime)
	leftStep = tempX*1000/totalTime;
	topStep = tempY*1000/totalTime;

	console.log("足球速率："+topStep)
	//  足球运行时间
	if(topStep<=0){
		fTime = -fDistence/topStep
	}else{
		fTime = fDistence/topStep
	}
	move(leftStep,topStep)
	rate = (endX-startX)/(endY-startY);
	// alert((endX-startX)/(endY-startY))
	indoor(startY,rate)
};
function move(leftStep,topStep){
	_obj = $("#ball");
	
	var T = parseFloat(_obj.css("top"));
	var L = parseFloat(_obj.css("left"));
	_obj.animate({left:leftStep +"px",top:topStep +"px"},2000);
	
}
// 球门移动
var own = $("#door");
var xD = 0;
var i = doorSpeed;
var settings = {
	speed: 100,
	xPos: 0,
	yPos: 0
};
var ownLeft = settings.yPos;
own.css({position: "absolute"});
function Position() {
	var winWidth = $(window).width() - own.width();
	if (xD == 0) {
		ownLeft += i;
		own.css({
			left: ownLeft
		});
		if (ownLeft >= winWidth) {
			ownLeft = winWidth;
			xD = 1;
		}
	}
	if (xD == 1) {
		ownLeft -= i;
		own.css({
			left: ownLeft
		});
		if (ownLeft <= 0) xD = 0;
	}
}
setInterval(Position, settings.speed);

// 进球判断
function indoor(startY,rate){
	var DL = parseFloat($("#door").css("left"));
	// 运行距离
	var moveDistence = fTime*doorSpeed*2000/settings.speed;
	if(xD == 0){
		DL += moveDistence;
	}else{
		DL -= moveDistence;
	}
	console.log(DL)
	console.log("运行时间："+fTime)
	console.log(fTime*doorSpeed)
	var DR = DL + doorWidth;
	var tempL = (DL-(WIDTH - ballWidth)/2)/-startY;
	var tempR = (DR-(WIDTH - ballWidth)/2)/-startY;
	console.log(DL+":"+DR)
	console.log((WIDTH - ballWidth)/2+":"+startY)
	console.log(tempL)
	console.log(tempR)
	console.log(rate)
	if(rate>=tempR&&rate<=tempL){
		console.log("进球了")
	}else{
		console.log("射歪了")

	}
}
