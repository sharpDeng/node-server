const Router = require('koa-router')
const Course = require('../control/course')
const User = require('../control/user')

const router = new Router();

const baseUrl = '/api/'


router.get(`/`, ctx => {
  ctx.body = 'hello world'
})

router.post('/api/user/reg', User.reg)

router.post('/api/user/login', User.login)

router.post('*', ctx => {
  ctx.body = {
    status: 404,
    msg: 'url错误'
  }
})

router.get('*', ctx => {
  ctx.body = {
    status: '404',
    msg: '找不到资源'
  }
})

module.exports = router;