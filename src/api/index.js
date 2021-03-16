import $http from "./ajax"
// 请求政策导航项
const requestNavList = () => $http.post("/trainPolicy/themeList")
// 获取政策文件图解
const requestPolicy = (params) => $http({
    method: 'POST',
    url: "/trainPolicy/getPolicyData",
    data: params
})
// 获取政策解读详情
const requestGraphicDetails = (params) => $http({
    method: "POST",
    url: "/trainPolicy/getTrainData",
    data: params
})
// 请求政策详情
const requestPolicyDetails = (params) => $http({
    method: "POST",
    url: "/trainPolicy/getTrainData",
    data: params
})
export { requestNavList, requestPolicy, requestGraphicDetails, requestPolicyDetails }