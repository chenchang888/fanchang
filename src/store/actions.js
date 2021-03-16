import { requestNavList, requestPolicy, requestGraphicDetails, requestPolicyDetails } from "../api/index"
import { GETPOLICYNAV, GETPOLICY, GETGRAPHICDETAILS, GETPOLICYDETAILS } from "./mutations_types"
export default {
    // 请求政策导航项
    async getPolicyNav({ commit }, getPolicyNav) {
        const res = await requestNavList()
        console.log(res)
        if (res.status === 200) {
            commit(GETPOLICYNAV, res.data)
            getPolicyNav && getPolicyNav()
        }
    },
    // 请求政策文件图解
    async getPolicy({ commit }, { params, fn }) {
        const res = await requestPolicy(params)
        console.log(res);
        if (res.data.code === 1) {
            commit(GETPOLICY, res.data.data)
            fn && fn()
        }
    },
    // 获取政策图解详情
    async getGraphicDetails({ commit }, { params, fn }) {
        const res = await requestGraphicDetails(params)
        console.log(res);
        if (res.data.code === 1) {
            commit(GETGRAPHICDETAILS, res.data.data)
            fn && fn()
        }
    },
    // 获取政策详情
    async getPolicyDetails({ commit }, { params, fn }) {
        const res = await requestPolicyDetails(params)
        console.log(res);
        if (res.data.code === 1) {
            commit(GETPOLICYDETAILS,res.data.data)
            fn && fn()
        }
    }
}