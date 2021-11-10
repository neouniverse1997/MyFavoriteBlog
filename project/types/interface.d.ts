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
    publishedAt: Date;
    revisedAt: Date;
    updatedAt: Date;
}

// エラーを返した時の型
export interface IErrorResponse {
    error: string;
}

// タグのオブジェクト型(tag_index.vue)
export interface rootContent {
    id: number;
    title: string;
    image: string;
    explain: string;
    color: string;
}