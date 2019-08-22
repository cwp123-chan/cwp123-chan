var net = require("net");
var usered = 'user/';
var talked = 'talk/';
var alled = 'all/';
//输入输出,这里没用到
var out = process.stdout;
var cin = process.stdin;
var socket = net.connect('8080','192.168.28.71');

socket.on('error',function(){
	console.log("链接失败，请检查网络......");
})

socket.on('connect',function(){
	// console.log("服务器链接成功")
	
	// 当服务器链接成功接收端口和127
	const port = socket.remotePort;
	const address = socket.remoteAddress;
	// 监听服务器传回数据
	socket.on('data',function(data){
		var result = data.toString();
		var user = result.split('\:')[0];
		// 打印服务器结果
		console.log(result);
		// 如果头信息为user着输入用户名
		if (user == 'user') {
			users(result);
			// console.log("接受的user数据是"+result);
		}
		
	})
	
})

socket.on('close',function(){
	console.log('与服务器断开连接......');
})

function users(result){
	// 接收数据以及命令行数据
	process.stdin.setEncoding('utf8');
	process.stdin.on('readable', () => {
	  const chunk = process.stdin.read();
	  // exit 退出操作;
	  if(chunk == 'exit\n'){
	  	socket.write('end/');
	  	socket.end();
	  }

	  if (chunk !== null) {
	    process.stdout.write('输入的数据是：'+chunk);
	    // 清屏
		console.log('\033[2J');
	    socket.write('user/'+chunk)
	  }

	   process.stdin.resume();
	});
}



			// console.log('\033[2J');
