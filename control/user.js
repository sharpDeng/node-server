const User = require('../modules/user');
const encrypt = require('../util/encrypt')

exports.reg = async ctx => {
  const user = ctx.request.body || {};
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
  console.log(user)
  const username = user.username;
  const password = user.password;
  let resBody = {}

  if(!username || !password){
    ctx.body = {
      state: 0,
      msg: '请输入账号或密码'
    }
  }

  await User
    .find({username}, (err, data) => {
      if(err) return err

      let cryptPassword = encrypt(password)
      console.log(cryptPassword,data[0].password)
      if(cryptPassword === data[0].password){
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
      console.log(cryptPassword === data.password)
      ctx.body = resBody
    })
}