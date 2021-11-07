import { NuxtAxiosInstance } from '@nuxtjs/axios'

// 大きな目的
// 「コンポーネントの疎結合（処理同士の干渉を極力少なくする）のコードを目指す」
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
    public async get(uri: string) {
        const res = await this.axios.$get(uri)
        return res
    }
}