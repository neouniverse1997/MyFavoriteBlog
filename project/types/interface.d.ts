// microCMSからレスポンス型
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
        url: string;
        height: number;
        width: number;
    }
    | undefined;
    createdAt: Date;
    publishedAt: Date;
    revisedAt: Date;
    updatedAt: Date;
}

// 記事のオブジェクト型
export interface ArticleInterface extends CommonInterface {
    contents: string;
    category: string;
    generator?: string;
    url_to_media?: string[];
    url?: string;
}

// カテゴリのオブジェクト型
export interface CategoryInterface extends CommonInterface {
    // 文字列型ID
    category_id: number;
    category_explain: string;
}

// カテゴリごとの画像-名前の対応付け（CategoryInterfaceと比較して冗長的かも？）
// 記事のサムネ画像表示にカテゴリ名+カテゴリ画像を使用するケース
export interface CategoryImageInterface {
    title: string,
    image?: string;
}

// エラーを返した時の型
export interface IErrorResponse {
    error: string;
}