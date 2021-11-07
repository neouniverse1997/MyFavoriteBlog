import { Plugin } from '@nuxt/types'
import { AxiosRepository } from '@/repository/axiosRepository'

// 大きな目的
// 「コンポーネントの疎結合（処理同士の干渉を極力少なくする）のコードを目指す」
// このファイルの目的
// 「処理の共通化」
// 参考ドキュメント
// https://typescript.nuxtjs.org/ja/cookbook/plugins
// https://typescript.nuxtjs.org/ja/cookbook/plugins
// 参考
// https://qiita.com/itouuuuuuuuu/items/4132e3b7ddf2cbf02442
// https://sagatto.com/20201229_nuxt_axios_ts_repository

export const repositoryPlugin: Plugin = (context, inject): void => {

    const api = context.$axios.create({
        // https://nuxtjs.org/tutorials/moving-from-nuxtjs-dotenv-to-runtime-config/
        baseURL: context.$config.baseURL,
        headers: {
            "X-MICROCMS-API-KEY": context.$config.apiSecret,
        },
    })


    api.interceptors.response.use(
        function (response) {
            console.log(response);
            return response
        },
        function (error) {
            if (!error.response) {
                console.log(error)
                return error
            }
            // サーバーサイドからのレスポンスが、404の時は404ページに飛ぶ。等の操作ができる
            if (error.response.status === 404) {
                console.log('404 Error');
            }
            return error.response
        }
    )

    // VueインスタンスでInject化
    const axiosRepository = new AxiosRepository(api)
    inject('axiosRepository', axiosRepository)
};

export default repositoryPlugin

// TypeScriptでの動作のために型定義
// Vueインスタンスから$axiosRepositoryを使用可能に

declare module 'vue/types/vue' {
    interface Vue {
        readonly $axiosRepository: AxiosRepository
    }
}

// this.$nuxt.contextから$axiosRepositoryを使用可能に

declare module '@nuxt/types' {
    interface NuxtAppOptions {
        readonly $axiosRepository: AxiosRepository
    }

    interface Context {
        readonly $axiosRepository: AxiosRepository
    }
}