// 記事を返した時の型
export interface ResponseInterface {
    contents: Array<ArticleInterface>,
    limit: number,
    offset: number,
    totalCount: number,
}

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
    tags: string | undefined;
    publishedAt: Date;
    revisedAt: Date;
    updatedAt: Date;
}

// エラーを返した時の型
export interface IErrorResponse {
    error: string;
}