const net = require('net');
const port = 8080;
const hostname = '192.168.28.71';
const server = net.createServer();
server.listen(port,hostname);
var exits = '退出命令【exit】';
var userList = {};
var userLists = [];
var userArry = [];
var stats = 0
var roomList = {};
var roomusers = [];

server.on('connection',function(socket){
	// 设置状态码 避免重复出现操作循环添加数组
	stats =1;
	// 添加socket用户广播
	userLists.push(socket);
	// 获取当前链接人数
	userArry.push('username');
	console.log('链接成功! 已有'+userArry.length+'登陆成功！' + exits+'\n');
	// 当服务器链接成功接收端口和127
	const port = socket.remotePort;
	const address = socket.remoteAddress;

	var ip = socket.remoteAddress;
	var userPort = socket.remotePort;
	socket.write('user:'+'请输入您的用户名' + exits+'\n' + '-----------------INSRER INTO--------------------');

	socket.on('data',function(data){
		// 这里接收三类数据 分别判断其头文件协议指代的聊天模式
		const datas = data.toString();
		// 清屏
		console.log('\033[2J');
		// 拆分标识
		const mark = datas.split('\/')[0];
		const user = datas.split('\/')[1];
		// console.log("接收的数据"+user);
		// console.log("接收的全部数据"+datas);
		// console.log("第二次："+user);
		// return false;
		// 当服务器断开时执行
		socket.on('close',function(){
			console.log('与客户端主动断开连接......');
		})
		// 设置命令行输入代码 输出代码获取行内容
		 process.stdin.setEncoding('utf8');
			process.stdin.on('readable', () => {
			  const chunk = process.stdin.read();
			  if(chunk == 'exit\n'){
	 			 	socket.end();
	 			}
		 })

			// 如果前台是user且为第一次登录 那么记录其用户名
		if (mark == 'user' && stats == '1') {
			// admin.push(ip+','+user);
			username = user.split('\n')[0];
			stats =0;
			inuser(ip,user,socket);
		}	
			// 如果是执行断开操作，那么删除统计数量数组最后一个值
		if(mark == 'end'){
			userArry.pop();
		}
			// 如果前台是all/。。。 那么执行此操作
		if(user == 'all'){
			var msg = datas.split('\/')[2];
			console.log('所有人:'+msg);
			// 利用循环遍历广播
			for(var i = 0;i<userLists.length;i++){
				userLists[i].write(socket.name+'对所有人说:'+msg);
			}

		}
		// 如果前台是@/用户名/。。。 那么执行此操作
		if(user == '@'){
			var msg = datas.split('\/')[2]+'\n';
			var mass = datas.split('\/')[3];
			console.log(user);
			console.log(msg);
			console.log(userList[msg])
			// 如果有这个人
			if(userList[msg]){
				console.log(socket)
				userList[msg].write(socket.name+'对你说:'+mass);

			}else{
				socket.write('sorry哦O(∩_∩)O 没这个人');
			}
		}


		// 创建聊天室
		if(user == '&'){
			// console.log("欢迎进入房间：" +data);
			var roomuser  = datas.split('\/')[2];
			var roommsg = datas.split('\/')[3];
			var roomple = roomuser.split('\,');
			for(var k = 0;k<roomple.length ; k++){
				roomusers.push(roomple[k]+'\n');
				console.log('有人：'　+ roomusers[k]);

			} 


			for(var j = 0;j<roomusers.length;j++){			
				console.log(userList[roomusers[j]]);
				if (userList[roomusers[j]]) {
					userList[roomusers[j]].write(socket.name + '在群里对你说'　+ roommsg);

				}else{			
					
					return;
				}
				// console.log(userList);
			}


		}



	})

});

	// 执行方法
function inuser(ip,user,socket){
	// 如果是user 则将用户名与socket绑定成对象
		//插入对象;
		// 将用户输入的用户名储存在socket.name对象方法内，避免别的终端启动后覆盖原值
		socket.name = user;
		// console.log(socket.name);
		userList[user] = socket;
		console.log(userList);
		socket.write("talk:所有人广播【all/】\n 私聊【@/好友名/】");
}

function delet(arr,val){
	for(var l = 0; l< arr.length;l++){
		if (arr[l] == val) {
			return l;
		}
	}

	arr.splice(l,1);
}


