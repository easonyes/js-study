/*
* 包含 n 个工具函数的模块
* */

// 返回对应的路由路径
export function getRedirectTo(type, header) {
  let path;
  // type
  if (type === 'laoban') {
    path = '/laoban'
  } else {
    path = 'dashen';
  }
  // header
  if (!header) {
    path += 'info';
  }

  return path;
}