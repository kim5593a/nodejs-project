const http=require('http');


//Server Start
http.createServer((req,res)=>{
    try{
        if(req.method==='GET'){
            if(req.url==='/'){
                res.writeHead(200,{'Content-Type:':'text/html; charset=utf-8' });
                return res.end('ok');
            }
        }
    }catch{

    }
    res.write('<h1>Hellow Node!</h1>');
}).listen(8080,()=>{
    console.log('8080번 포트 서버 대기 상태..');
});