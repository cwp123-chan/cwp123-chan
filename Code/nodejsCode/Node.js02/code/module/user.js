
// JS 类
function user(name, age){
    this.name = name;
    this.age = age;
    this.getInfo = function(){
        console.log(name + ' : ' + age);
    }
}

// 将构造函数输出
module.exports = user;

