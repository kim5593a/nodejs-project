//express test

const express =require('express'); //express 패키지 import
const path=require('path');//경로 패키지 import
const morgan =require('morgan'); //morgan 패키지 import
const cookieParser=require('cookie-parser');//cookieParser 패키지 import
const request=require('request');//API 요청 패키지 import
//---------------------------------------------------------------
//---------------------------------------------------------------
//[Server 세팅]
const app=express();//express obj init
app.set('port',3000);
app.use(morgan('dev'));//개발전용 Log 패키지 모듈
app.use(cookieParser());//클라이언트 쿠키 받아오는 패키지 모듈
app.use(express.json());//JSON 패키지 모듈(JSON 파싱)
app.use(express.urlencoded({extended:true}));//URL Encoding  패키지 모듈(Form 파싱)
//---------------------------------------------------------------
//---------------------------------------------------------------
//[Server 미들웨어 설정]
//Server에서 어떤 라우터가 전달되도 실행 Code
app.use((req,res,next)=>{
    console.log('모든 요청에서 실행하는 미들웨어');
    //실행 했으면 라우터 이동
    next();
});
// //Server에서 /get 라우터 전달 시 동작하는 Code
// app.use('/get',(req,res,next)=>{
//     console.log('get에서만 작동하는 미들웨어');
//     //실행 했으면 라우터 이동
//     next();
// });
//---------------------------------------------------------------
//---------------------------------------------------------------
//defult reqest
//http://localhost:3000/-----------------------------------------------
//GIB-API Address:https://sgapi.group-ib.com/v2.1/events/bylogin?key=ECQ6BDihHQPPHfbSOpRD6WIQrE3zEefoqBNlNQ81rYLu3jR0&login=b9526479d8e75eec48092197447318d86d2194ec
app.get('/test',(req,res)=>{
    req.cookies//사용자 쿠키 받아오기
    //쿠키 만들어서 보내기
    // res.cookie('name',encodeURIComponent(name),{
    //     expires:new Date(),
    //     httpOnly:true,
    //     path:'/',
    // })
    // //쿠키 제거
    // res.clearCookie('name',encodeURIComponent(name),{
    //     httpOnly:true,
    //     path:'/',
    // })

    //GIB API Json 요청----------------------------------------
    var getUrl='https://sgapi.group-ib.com/v2.1/events/bylogin?key=ECQ6BDihHQPPHfbSOpRD6WIQrE3zEefoqBNlNQ81rYLu3jR0&login=b9526479d8e75eec48092197447318d86d2194ec'
    request.put({
        headers:{'content-type':'application/json'},
        url:getUrl,
        json:true
    },function(error,response,body){
        var data=res.json(JSON.parse(body));
        console.log('GIB API 값 확인: ',data);
    });
    // res.send('get express');
});
//------------------------------------------------------------------------
app.post('/post',(req,res)=>{
    //res.writeHead(200,{'Content-Type':'application/json'});
    //Json 값 보낼때 Head
    console.log('Post Test');
    res.json({json_data:'Data_String'})
});
app.put('/put',(req,res)=>{
    res.send('put express');
});
//Prameter reqest
//http://localhost:3000/data/name='TestData'
app.get('/data/:name',(req,res)=>{
    res.send(`전달받은 파라미터${req.params.name}`);
});

//이외 모든 페이지 Error 처리하기
app.get('*',(req,res,next)=>{
    next(error);//-> 미들웨어 Error 보내기
});

//---------------------------------------------------------------
//404Error 미들웨어
app.use((err,req,res,next)=>{
    res.status(200).send('404 Error Page');
});
//Error 미들웨어
app.use((err,req,res,next)=>{
    console.error(err);
    res.send('Error Page');
});

//---------------------------------------------------------------
app.listen(app.get('port'),()=>{
    console.log('Biztov-GIB API Server Start');
});