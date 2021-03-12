import { requestNavList } from "../api/index"
import { GETPOLICYNAV } from "./mutations_types"
export default {
    // 请求政策导航项
    async getPolicyNav({ commit }, getPolicyNav) {
        const res = await requestNavList()
        console.log(res)
        if (res.status === 200) {
            commit(GETPOLICYNAV, res.data)
            getPolicyNav && getPolicyNav()
        }
    }
}