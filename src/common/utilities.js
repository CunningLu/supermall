/**
 * 防抖
 * 说明：定义一个 const 常量保存本函数的返回值（返回值也是一个函数），并多次调用该返回值函数即可
 * @param {*} func 需要执行的函数，必填
 * @param {*} delay 防抖的延时，默认 100 毫秒
 * @returns 供使用的防抖函数，可为需要执行的函数添加可变参数项，使用...定义
 */
export function debounce(func, delay = 100) {
  // 初始化一个计时器，用于判断上一次调用的计时器是否已经计时结束
  let times = null

  // 返回函数形成闭包，使得 times 变量能够重复引用不被销毁
  return function (...args) {
    // 下次调用时如果存在上次的计时，则清空上次的计时并重置计时
    if (times) clearTimeout(times)
    // 设置延时执行函数，以期待下次调用在本次延时未结束时重新进入此处
    times = setTimeout(() => {
      // 延时结束时最终执行传入的函数
      func.apply(this, args)
    }, delay)
  }
}

/**
 * 将日期格式化为给定规则的样式
 * @param {*} datetime 
 * @param {*} formatString 需要格式化的规则
 * @returns 
 */
export function formatDatetime(datetime, formatString) {
  // 匹配年份
  if (/(y+)/.test(formatString)) {
    // RegExp.$1 是正则匹配到的第一个结果
    // 数字 + '' 隐式转换：高效转换 Number 为 String
    // substr 从第 x 位开始截取
    formatString = formatString.replace(RegExp.$1, (datetime.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  // 创建对象来测试接下来的规则
  const testRegExpObject = {
    'M+': datetime.getMonth() + 1,
    'd+': datetime.getDate(),
    'h+': datetime.getHours(),
    'm+': datetime.getMinutes(),
    's+': datetime.getSeconds(),
  }

  for (const testKey in testRegExpObject) {
    if (Object.hasOwnProperty.call(testRegExpObject, testKey)) {
      const element = testRegExpObject[testKey]
      
    }
  }

  // 返回格式化后的字符串
  return formatString
}