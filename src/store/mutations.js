import { GETPOLICYNAV } from "./mutations_types"
export default {
    [GETPOLICYNAV](state, policyNav) {
        state.policyNav = policyNav
    }
}