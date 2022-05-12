
// 防抖函数
export const debounce = (fn:Function) => {
  let timer: NodeJS.Timeout ;
  let flag = false ;
  return (args: any) => {
    if (flag) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      flag = false
      fn(...args)
    }, 100)
    flag = true
  }
}