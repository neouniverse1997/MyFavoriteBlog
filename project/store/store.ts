import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export interface CategoryStoreState {
    Category: CategoryImageInterface
}

export default new Vuex.Store<CategoryStoreState>({})