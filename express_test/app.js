//express test

const express =require('express'); //express 패키지 import
const path=require('path');//경로 패키지 import

//Server 세팅
const app=express();//express obj init
app.set('port',3000);

//Server 미들웨어 설정
//Server에서 어떤 라우터가 전달되도 실행 Code
app.use((req,res,next)=>{
    console.log('모든 요청에서 실행하는 미들웨어');
    //실행 했으면 라우터 이동
    next();
});
//Server에서 /get 라우터 전달 시 동작하는 Code
app.use('/get',(req,res,next)=>{
    console.log('get에서만 작동하는 미들웨어');
    //실행 했으면 라우터 이동
    next();
});
//---------------------------------------------------------------

//defult reqest
//http://localhost:3000/
app.get('/get',(req,res)=>{
    res.send('get express');
});
app.post('/post',(req,res)=>{
    //res.writeHead(200,{'Content-Type':'application/json'});
    //Json 값 보낼때 Head
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