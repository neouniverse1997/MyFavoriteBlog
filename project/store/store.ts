import Vue from 'vue'
import Vuex from 'vuex'
import { CategoryStoreInterface } from './categoryInfo'

Vue.use(Vuex)

export interface CategoryStoreState {
    Category: CategoryStoreInterface
}

export default new Vuex.Store<CategoryStoreState>({})