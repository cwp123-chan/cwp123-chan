var file = require('../models/file.js'); // 导入自定义模型
var formidable = require('formidable');
var timestamp = require('time-stamp');
var path = require('path');
var fs = require('fs');


exports.showIndex = function (req, res, next) {
    // res.send('我是首页');
    /*res.render('index.ejs', {
        // 数组存放文件夹名字,将来会读取实际的文件夹名称
        pics: file.getPics()
    });*/

    // 异步处理加载
    file.getPics(function (err, allPics) {
        if (err) {
            next();
            return;
        }
        // 绑定数据,输出页面
        res.render('index', {
            // 数组存放文件夹名字,将来会读取实际的文件夹名称
            pics: allPics
        });
    });
};

exports.showPics = function (req, res, next) {
    // res.send('读取 [ ' + req.params.picsName + ' ] 相册');
    /*res.render('images', {
        // 数组存放文件夹名字,将来会读取实际的文件夹名称
        picsName: req.params.picsName,
        imgs : ['0.jpg', '1.jpg', '2.jpg']
    });*/
    // 接收处理的 文件夹名字
    var picsName = req.params.picsName;
    // 当执行完成之后,才开始遍历页面数据
    file.getImages(picsName, function (err, imageArray) {
        if (err) {
            next();
            return;
        }
        res.render('images', {
            'picsName': picsName,
            'imgs': imageArray
        });
    });
};


// 显示表单
exports.showUp = function (req, res) {
    // res.render('up');
    // 当执行完读取文件夹操作成之后,才开始遍历页面数据
    file.getPics(function (err, allPics) {
        res.render('up', {
            "pics": allPics
        });
    });

};


// 处理上传
exports.doUp = function (req, res) {
    // 使用第三方模块 处理上传文件
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files, next) {
        // console.log(fields, files);
        if (err) {
            next();
            return; //数据有问题 ,则此业务到此结束
        }

        // 判断文件大小,不接受过大的文件
        var size = files.myfile.size;
        if (size > 10485760) {
            res.send('文件尺寸过大,请上传小于10MB的文件!');
            // 删除文件
            fs.unlink(files.myfile.path);
            return;
        }

        // 限制文件类型
        var imageType = 'jpg|jpeg|png|bmp|gif';
        var fileType = path.extname(files.myfile.name).substr(1);
        if (imageType.indexOf(fileType) == -1) {
            res.send('请上传有效的图片文件!');
            // 删除文件
            fs.unlink(files.myfile.path);
            return;
        }

        // 准备改名
        var t = timestamp('YYYYMMDDHHmmss');
        var ran = parseInt(Math.random() * 100000);
        var extname = path.extname(files.myfile.name);
        var wjj = fields.wjj;

        var oldPath = files.myfile.path;
        var newPath = './uploads/' + wjj + '/' + t + ran + extname;

        fs.rename(oldPath, newPath, function (err) {
            if (err) {
                next();
                return;
            }
            console.log(newPath);
            res.redirect('/' + wjj);
        });

    });
};

