var fs = require('fs');

// 读取所有图片文件夹
exports.getPics = function (callback) {
    // 假设 以下是读取到到的文件夹:
    // return ['健健的相册', 'Tom', '静静的私房', '艳艳的艳照'];
    // 读取并判断是否为目录
    fs.readdir('./uploads', function (err, files) {
        if (err) {
            callback('找不到文件', null);
            return;
        }
        // console.log(files);
        var allPics = []; // 存储读取到的相册
        // 迭代器
        (function iterator(i) {
            if (i == files.length) {
                // console.log(allPics); // 筛选后的文件夹
                // return allPics;
                callback(null, allPics);
                return;
            }
            fs.stat('./uploads/' + files[i], function (err, stats) {
                if (err) {
                    callback('读取不到文件', null);
                    return;
                }
                if (stats.isDirectory()) {
                    allPics.push(files[i]);
                }
                iterator(i + 1);
            });
        })(0);
    });
};


// 读取指定文件夹中的 所有图片文件
exports.getImages = function (picsName, callback) {
    // 读取指定目录,取出所有的图片文件
    fs.readdir('./uploads/' + picsName, function (err, files) {
        if (err) {
            callback('没有找到文件', null);
            return;
        }
        var allImages = []; // 存储读取到的文件名
        (function iterator(i) {
            if (i == files.length) {
                // console.log(allImages); // 筛选后的文件
                callback(null, allImages);
                return;
            }
            fs.stat('./uploads/' + picsName + '/' + files[i], function (err, stats) {
                if (err) {
                    callback('读取文件信息失败', null);
                    return;
                }
                if (stats.isFile()) {
                    allImages.push(files[i]);
                }
                iterator(i + 1);
            });
        })(0);
    });

}

