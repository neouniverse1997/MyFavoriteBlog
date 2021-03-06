import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { ResponseInterface, CategoryInterface, ArticleInterface, CommonInterface } from "../types/interface"

// 大きな目的
// 「コンポーネントの疎結合（処理同士の干渉を極力少なくする）のコードを目指す」
//　「API処理・エラー処理を統一化」」
// このファイルの目的
// 「Axios/API通信に関するAPI共通処理クラスを作成」
// 参考ドキュメント
// https://typescript.nuxtjs.org/ja/cookbook/plugins
// 参考ブログ
// https://sagatto.com/20201229_nuxt_axios_ts_repository

export class AxiosRepository {

    // axiosの型定義
    private readonly axios: NuxtAxiosInstance

    // 初期化
    constructor(axios: NuxtAxiosInstance) {
        this.axios = axios
    }

    // 情報の取得
    public async get<T>(uri: string) {
        try {
            const response: ResponseInterface<T> = await this.axios.$get(uri)
            return response;
        } catch (e) {
            return Promise.reject(e);
        }
    }
}