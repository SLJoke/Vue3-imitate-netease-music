import { createStore } from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'

const store = createStore({
  state,
  mutations,
  // 执行异步操作
  actions,
  // 严格模式 (不通过vuex修改state的值会报错)
  strict: process.env.NODE_ENV !== 'production'
})

export default store