const router = require('koa-router')()
const fs = require('fs')
const axios = require('axios');
const request = require('request');
const action = require('../actions/action');
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: '作品批量下载器'
  })
})

// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })

// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })

router.post('/download', async (ctx, next) => {
 
  action.download.prepare(ctx);
  // postIndex = downloads.length - 1;
  // request.get(downloads[index].url).pipe(fs.createWriteStream(`${PATH}/${downloads[index].title}.m4a`)).on('close', function () {
  //   console.log('download success', downloads[index], downloads[index].title);
  //   index++;
  //   postbody.shift();
  // postIndex++;
  // if (postIndex == postbody.length - 1) {
  //   console.log('全部文件下载完毕');
  //   return false;
  // }
  // action.download(downloads[index]).then(()=>{

  // })
  // });

  // for (let i = 0; i < postbody.length; i++) {
  //   request.get(postbody[i].url).pipe(
  //     // (function () {
  //       // console.log('start' + postbody[i].title);
  //       fs.createWriteStream(`${PATH}/${postbody[i].title}.m4a`)
  //     // })()
  //   ).on('close', function () {
  //     console.log('download success', postbody[i], postbody[i].title);
  //   });
  // }


  // console.log(postbody);
  // console.log(downloads);
  // console.log(url);
  ctx.body = {
    title: 'koa2 json'
  }

})
module.exports = router