// 封装本地存储数据与读取数据反复噶
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
  console.log("设置TOken到本地缓存",token)
}

export const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN')
  console.log("删除本地缓存Token")
}

export const GET_TOKEN = () => {
  let token = localStorage.getItem('TOKEN')
  console.log("获取本地缓存",token)
  return localStorage.getItem('TOKEN')

}
