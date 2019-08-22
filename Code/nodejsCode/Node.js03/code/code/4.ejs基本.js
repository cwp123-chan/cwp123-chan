
var ejs = require('ejs');

// 模版
var str = '扎心了,老铁双击 <%= num %>';

// 数据
var data = {
    num : 666
}

// 数据绑定
var html = ejs.render(str, data);

// 输出
console.log(html);


