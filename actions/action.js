const fs = require('fs')
const request = require('request');

module.exports.download = {
    // 当前下载队列游标
    index: 0,
    DOWNLOAD_NUM: 5,
    PATH : './download/',
    prepare: function (ctx) {
        let downloads = [];
        let postbody = ctx.request.body.params.items
        let url = postbody[0].url
        let filename = `${postbody[0].title}.m4a`
        if (!fs.existsSync(this.PATH)) {
            fs.mkdirSync(this.PATH);
        }
        // console.log('arr length' + postbody.length)
        if (postbody.length == 0) {
            return false;
        }
        // 初始化下载队列
        if (postbody.length <= this.DOWNLOAD_NUM) {
            downloads = [...postbody]
        } else {
            for (let i = 0; i < 5; i++) {
                downloads.push(postbody[i]);
            }
        }
        this.startDownload(postbody);
    },
    startDownload: function (postbody) {
        // let that = this;
        // console.log(JSON.stringify(postbody));
        if (postbody.length == 0) {
            console.log('全员下载完毕')
            return false;
        }
        // console.log(postbody.length);
        try{
            let that = this;
            fs.exists(`${this.PATH}/${postbody[this.index].title}.m4a`, function(exists) {
                // console.log(exists)
                exists ? that.fileExists(postbody) : that.fileNotExists(postbody);
            });
         
        }catch(err){
            console.log(err);
        }
    },
    fileExists:function(postbody) {
        console.log('存在相同文件名')
        let that = this;
        // 随机产生6位数
        let randomValue = Math.floor((Math.random()*9+1)*100000);
        request.get(postbody[this.index].url).pipe(
            fs.createWriteStream(`${this.PATH}/${postbody[this.index].title}_${randomValue}.m4a`)
        ).on('close', function () {
            console.log('download success',  postbody[0].title,'下载完毕');
            console.log('剩余任务数量:'+postbody.length)
            postbody.shift();
            // console.log(postbody);
            that.startDownload(postbody);
        }).on('error', function(err){
            console.log(err);
        });
    },
    fileNotExists:function(postbody) {
        let that = this;
           request.get(postbody[this.index].url).pipe(
                fs.createWriteStream(`${this.PATH}/${postbody[this.index].title}.m4a`)
            ).on('close', function () {
                console.log('download success',  postbody[0].title,'下载完毕');
                console.log('剩余任务数量:'+postbody.length)
                postbody.shift();
                // console.log(postbody);
                that.startDownload(postbody);
            }).on('error', function(err){
                console.log(err);
            });
    },


}