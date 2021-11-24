import Vue from 'vue'
import Vuex from 'vuex'
import { UserInterface } from '../types/interface.d'

Vue.use(Vuex)


export interface UserStoreState {
    User: UserInterface
}

// https://github.com/championswimmer/vuex-module-decorators
export default new Vuex.Store<UserStoreState>({})