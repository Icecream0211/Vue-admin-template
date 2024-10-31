// 封装本地存储数据与读取数据反复噶
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}

export const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN')
}

export const GET_TOKEN = () => {
  let token = localStorage.getItem('TOKEN')
  return localStorage.getItem('TOKEN')

}
