const User = require('../modules/user');
const encrypt = require('../util/encrypt')

exports.reg = async ctx => {
  const user = ctx.request.body || {};
  console.log(user,'user')
  const username = user.username;
  const password = user.password;

  if(!username || !password){
    ctx.body = {
      state: 0,
      msg: '请输入账号或密码'
    }
  }
  
  await new Promise( (resolve, reject) => {
    
    User
      .find({username})
      .then(res => {
        // 用户已存在
        if(res.length !== 0) return resolve('')
        
        // 创建用户
        const user = new User({
          username,
          password: encrypt(password)
        })

        user
          .save()
          .then(data => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      
      })
      .catch(err => {
        reject(err)
      })
  })
  .then( res => {
    console.log(res,'res')
    let resBody = {
      state: 1,
      msg: '用户已存在',
    }
    
    
    if(res){
      resBody.user = res
      resBody.msg = '注册成功'
    }

    ctx.body = resBody
  })
  .catch( err => {
    console.log(err)
    ctx.body = {
      state: 0,
      msg: '注册失败'
    }
  })



}

exports.login = async ctx => {
  const user = ctx.request.body || {};
  const username = user.username;
  const password = user.password;
  console.log(user,password)

  let resBody = {}

  if(!username || !password){
    ctx.body = {
      state: 0,
      msg: '请输入账号或密码'
    }
  }

  await new Promise((resolve, reject)=>{
    User
    .find({username}, (err, data) => {
      console.log(data)
      if(err) return reject(err)

      if(data.length <= 0) {
        return resolve('')
      }
      resolve(data)

    })
  })
  .then(async res => {
    if(res){
      let cryptPassword = encrypt(password)
      console.log(cryptPassword,res[0].password)
      if(cryptPassword === res[0].password){
        resBody = {
          state: 1,
          msg: '登录成功'
        }
      }else{
        resBody = {
          state: 0,
          msg: '账号或密码错误'
        }
      }
      ctx.body = resBody
    }else{
      ctx.body = {state: 0, msg: '账号暂未注册'}
    }
  })
  .catch(err => {
    console.log(err);
    ctx.body = {
      state: 0,
      msg: '登录失败，请重新登录',
      err: err.toString()
    }
  })
}