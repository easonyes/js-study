/*
* 包含了 n 个接口请求的函数的模块
* 函数返回值为： promise
* */

import ajax from './ajax'

// 注册接口的请求函数
export const reqRegister = (user) => ajax('/register', user, 'POST');

//登录接口的请求函数
export const reqLogin = ({username, password}) => ajax('/login', {username, password}, 'POST');

// 更新用户信息接口
export const reqUdateUser = (user) => ajax('update', user, 'POST');


