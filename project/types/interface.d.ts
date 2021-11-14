// 記事を返した時のオブジェクト型
export interface ResponseInterface<T> {
    contents: Array<T>,
    limit: number,
    offset: number,
    totalCount: number,
}

// 共通のオブジェクト型
export interface CommonInterface {
    id: string;
    title: string;
    image:
    | {
        imageURL: string;
        height: number;
        width: number;
    }
    | undefined;
    createdAt: Date;
    publishedAt: Date;
    revisedAt: Date;
    updatedAt: Date;
}

// 記事のオブジェクト型(article.vue)
export interface ArticleInterface extends CommonInterface {
    contents: string;
    category: string;
    generator: string;
    url?: string;
}

// カテゴリのオブジェクト型(category.vue)
export interface CategoryInterface extends CommonInterface {
    // 文字列型ID
    category_id: number;
    category_explain: string;
}

// エラーを返した時の型
export interface IErrorResponse {
    error: string;
}