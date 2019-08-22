

// 格式化时间
// PHP date('Y-m-d H:i:s');
// JS Date
var timestamp = require('time-stamp');
var t = timestamp('YYYY-MM-DD HH:mm:ss');
console.log(t);


// 随机数
var randomInt = require('random-int');
for (var i = 0; i < 20; i++) {
    console.log(randomInt(0, 100));
}








