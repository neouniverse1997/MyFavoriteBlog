import store from './userStore'
import { Module, VuexModule, Mutation, getModule } from 'vuex-module-decorators'
import { UserInterface } from '../types/interface.d'

// 'vuex-module-decorators'の活用ドキュメント
// https://championswimmer.in/vuex-module-decorators/pages/getting-started.html#access-state
// 参考
// https://re-engines.com/2019/07/16/vuex-module-decorators%E3%81%A8typescript%E3%81%A7vuex%E3%82%92%E3%82%B9%E3%83%9E%E3%83%BC%E3%83%88%E3%81%AB%E6%9B%B8%E3%81%8F/
@Module({ dynamic: true, store, name: 'userInfo' })
class UserStore extends VuexModule {

    // State, Getterの書き方
    // https://championswimmer.in/vuex-module-decorators/pages/core/getters.html
    userStore: UserInterface | null = null;

    // Mutationの書き方
    // https://championswimmer.in/vuex-module-decorators/pages/core/mutations.html
    @Mutation
    setUser(userInfo: UserInterface) {
        this.userStore = userInfo;
    }
}

export const userModule = getModule(UserStore)