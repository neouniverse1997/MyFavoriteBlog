import Vue from 'vue'
import Vuex from 'vuex'
import { CategoryImageInterface } from '../types/interface.d'

Vue.use(Vuex)

export interface CategoryStoreState {
    Category: CategoryImageInterface
}
// https://github.com/championswimmer/vuex-module-decorators
export default new Vuex.Store<CategoryStoreState>({})