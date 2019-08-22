
var str = '我是fun1里的str';
var msg = '我是fun1里的msg';

function showMsg(){
    console.log('showMsg函数的输出是: ' + msg);
}

// 暴露要输出的对象
exports.str = str;
exports.showMsg = showMsg;



