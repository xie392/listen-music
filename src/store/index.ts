import { createStore } from 'vuex'
import getters from './getters'
import user from './modules/user'
import loading from './modules/loading'
import app from './modules/app'
// import persistedState from 'vuex-persistedstate'

export default createStore({
  modules: {
    app,
    user,
    loading,
  },
  getters,
  // plugins: [persistedState()] 
})
