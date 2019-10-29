const Koa = require('koa');
const logger = require('koa-logger');
const router = require('./routers/index');
const Static = require('koa-static');
const Session = require('koa-session')
const Body = require('koa-body')

const { join } = require('path')

const app = new Koa()

app.use(logger())

//设置签名的 Cookie 密钥
app.keys = ['this is nnode']
//session 的配置对象
const sessionCONFIG = {
  key: 'Sid',
  maxAge: 24 * 36e5,
  overwrite: true,
  signd: true,
  httpOnly: true,
  rolling: true
}
app.use(Session(sessionCONFIG, app));

// 处理post 请求body
app.use(Body())
// 处理静态文件
app.use(Static(join(__dirname, 'public')))

// 注册路由
app.use(router.routes()).use(router.allowedMethods());


// 项目启动
app.listen('3005', '0.0.0.0', ()=> {
  console.log('项目启动成功')
})
