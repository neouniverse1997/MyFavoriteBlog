import Vue from 'vue'
import Vuex from 'vuex'
import { CategoryImageInterface } from '../types/interface.d'

Vue.use(Vuex)

export interface CategoryStoreState {
    Category: CategoryImageInterface
}


export default new Vuex.Store<CategoryStoreState>({})