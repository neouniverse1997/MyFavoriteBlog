// 記事を返した時のオブジェクト型
export interface ResponseInterface {
    contents: Array<ArticleInterface>,
    limit: number,
    offset: number,
    totalCount: number,
}

// 記事のオブジェクト型(article_index.vue)
export interface ArticleInterface {
    id: string;
    title: string;
    contents: string;
    image:
    | {
        imageURL: string;
        height: number;
        width: number;
    }
    | undefined;
    tags?: string;
    createdAt: Date;
    publishedAt: Date;
    revisedAt: Date;
    updatedAt: Date;
}

// エラーを返した時の型
export interface IErrorResponse {
    error: string;
}

// カテゴリのオブジェクト型(category_index.vue)
export interface CategoryInterface {
    // 文字列型ID
    id: string;
    // 以下を主に使用
    category_id: string;
    category_name: string;
    category_image: {
        url: string;
        height: number;
        width: number;
    }
    category_explain: string;
    createdAt: Date;
    publishedAt: Date;
    revisedAt: Date;
    updatedAt: Date;
}