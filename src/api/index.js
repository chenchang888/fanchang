import $http from "./ajax"
// 请求政策导航项
const requestNavList = () => $http.post("/trainPolicy/themeList")

export { requestNavList }