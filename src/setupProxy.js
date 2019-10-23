const proxy = require('http-proxy-middleware')
module.exports = function(app){
    // 登录注册
    app.use(
        proxy(
            '/read/api',
            {
                target: 'http://localhost:8888',
                changeOrigin: true,
                pathRewrite: {
                    '^/read/api': ''
                }
            }
        )
    )
    // 随便看看
    app.use(
        proxy(
           '/hot/api',
           {
               target:'https://www.apiopen.top',
               changeOrigin:true,
               pathRewrite:{
                   '^/hot/api':''
               }
           } 
        )
    )
    // 推荐
    app.use(
        proxy(
            '/tuijian/api',
            {
                target:'http://bookstoreapi.shuqireader.com/eva_bookstore/v1/module/query?appId=1&pageId=1&channelId=&versionId=&ver=&shuqi_h5=&md5key=&userId=8000000&timestamp=1571213179&type=2&resetcache=&func_id=12%2C33%2C11%2C28%2C33%2C12%2C33%2C11%2C19&orderid=31%2C32%2C33%2C34%2C35%2C36%2C37%2C38%2C39&sign=ACFB73321ADBBC3BFC9BBDE250B488C2&key=shuqiapi&_=1571213179164',
                changeOrigin:true,
                pathRewrite:{
                    '^/tuijian/api':''
                }
            }
        )
    )
    // 详情
    app.use(
        proxy(
            '/detail/api',
            {
                target:'https://www.apiopen.top/novelInfoApi',
                changeOrigin:true,
                pathRewrite:{
                    '^/detail/api':''
                }
            }
        )
    )
}