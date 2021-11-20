import store from './store'
import { Module, VuexModule, Mutation, getModule } from 'vuex-module-decorators'

export interface CategoryStoreInterface {
    categoryList: string[]
    currentCategoryImage: string
}

// 'vuex-module-decorators'の活用ドキュメント
// https://championswimmer.in/vuex-module-decorators/pages/getting-started.html#access-state
// 参考
// https://re-engines.com/2019/07/16/vuex-module-decorators%E3%81%A8typescript%E3%81%A7vuex%E3%82%92%E3%82%B9%E3%83%9E%E3%83%BC%E3%83%88%E3%81%AB%E6%9B%B8%E3%81%8F/

@Module({ dynamic: true, store, name: 'categoryInfo' })
class CategoryStore extends VuexModule {

    // State, Getterの書き方
    // https://championswimmer.in/vuex-module-decorators/pages/core/getters.html
    categoryList: string[] = [];
    currentCategoryImage: string = "";

    // Mutationの書き方
    // https://championswimmer.in/vuex-module-decorators/pages/core/mutations.html
    @Mutation
    setImage(image: string) {
        this.currentCategoryImage = image
    }

    @Mutation
    setCategoryList(categoryList: string[]) {
        this.categoryList = categoryList
    }
}

export const categoryModule = getModule(CategoryStore)
