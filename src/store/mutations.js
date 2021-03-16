import { GETPOLICYNAV, GETPOLICY, GETGRAPHICDETAILS, GETPOLICYDETAILS } from "./mutations_types"
export default {
    [GETPOLICYNAV](state, policyNav) {
        state.policyNav = policyNav
    },
    [GETPOLICY](state, policy) {
        state.policy = policy
    },
    [GETGRAPHICDETAILS](state, graphicDetails) {
        state.graphicDetails = graphicDetails
    },
    [GETPOLICYDETAILS](state, policyDetails) {
        state.policyDetails = policyDetails
    }
}