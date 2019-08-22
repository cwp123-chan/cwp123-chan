
function showIndex(req, res){
    res.writeHead(200, {'content-type': 'text/html;charset=utf-8'});
    res.end('我是首页');
}


function showStu(req, res){
    res.writeHead(200, {'content-type': 'text/html;charset=utf-8'});
    res.end('学员页面');
}


function show404(req, res){
    res.writeHead(404, {'content-type': 'text/html;charset=utf-8'});
    res.end('404 Not Found');
}


exports.showIndex = showIndex;
exports.showStu = showStu;
exports.show404 = show404;