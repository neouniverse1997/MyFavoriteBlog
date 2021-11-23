// microCMSからレスポンス型
export interface ResponseInterface<T> {
    contents: Array<T>,
    limit: number,
    offset: number,
    totalCount: number,
}

// 共通のオブジェクト型
export interface CommonInterface {
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
    id: string;
    title: string;
    contents: string;
    category: string;
    generator?: string;
    url_to_media?: string[];
    url?: string;
}

// カテゴリのオブジェクト型
export interface CategoryInterface extends CommonInterface {
    id: string;
    title: string;

    category_id: number;
    category_explain: string;
}

// ユーザーのオブジェクト型
export interface UserInterface extends CommonInterface {
    name?: string;
    introduce: string;
    twitter?: string;
    github?: string;
    note?: string;
    youtube?: string;
    zenn?: string;
    blog?: string;
    other?: string;
    thissite?: string;
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