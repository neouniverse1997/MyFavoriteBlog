<template>
  <v-app>
    <v-container fluid>
      <!-- 選択カテゴリの表示 -->
      <div class="index-title">
        <div class="index-title-text">
          Category:
          <div class="index-category-text">{{categoryTitle}}</div>
        </div>
      </div>
      <v-layout wrap>
        <!-- 記事の一覧画面 -->
        <v-flex xs12 sm6 md4 v-for="article in articles" v-bind:key="article.id">
          <article-card :article="article" />
        </v-flex>
      </v-layout>
      <!-- 記事一覧のページネーション処理 -->
      <div class="index-pagenation">
        <article-pagenation :maxPage="maxPage" :name.sync="page" @pagenationClick="onNextArticles" />
      </div>
    </v-container>
  </v-app>
</template>


<style lang="scss" scoped>
// カード
.v-card {
  transition: opacity 0.4s ease-in-out;
}

// ページのタイトル部分
.index-title {
  display: block;

  .index-title-text {
    text-align: center;
    margin-top: 5rem;
    margin-bottom: 5rem;
    font: 1em "Verdana";
    color: black;

    // 選択カテゴリ名
    .index-category-text {
      display: inline;
      font: 2em "Arial Black";
      font-weight: 500;
      color: #1a237e;
    }
  }

  // ページネーション部分
  .index-pagenation {
    margin: auto;
    margin-top: 10rem;
  }
}
</style>

<script lang="ts">
import { ArticleInterface, ResponseInterface } from "../types/interface";
import { Component, Vue, Prop } from "vue-property-decorator";
import { AxiosRepository } from "../repository/axiosRepository";
import VueRouter, { Route } from "vue-router";

declare module "vue/types/vue" {
  interface Vue {
    $router: VueRouter;
    $route: Route;
    readonly $axiosRepository: AxiosRepository;
  }
}

@Component
export default class Article extends Vue {
  // 取得記事一覧を定義
  private articles: ArticleInterface[] = [];

  // 最大取得件数
  private limit: number = 6;

  // 記事数（取得できない時は0）
  private sum: number = 0;

  // 現在のページ
  private page: number = 1;

  // 最大ページ
  private maxPage: number | null = null;

  // 取得タグ
  private categoryQuery: string | null = null;

  // 取得したいカテゴリ
  private categoryTitle: string | string[] | null;

  // URI作成関数
  generateURI(query: string): string {
    return `get_articles${query}`;
  }

  // クエリ作成関数
  generateQuery(categoryQuery: string | null): string {
    let query: string =
      this.categoryQuery === null
        ? `?limit=${this.limit}&offset=${(this.page - 1) *
            this.limit}&orders=publishedAt`
        : `?filters=category[contains]${categoryQuery}&limit=${
            this.limit
          }&offset=${(this.page - 1) * this.limit}&orders=publishedAt`;
    return query!;
  }

  created() {
    // カテゴリIDを取得
    this.categoryTitle = this.$route.params.title;

    // クエリ条件指定
    // https://typescript-jp.gitbook.io/deep-dive/recap/null-undefined
    this.categoryQuery =
      typeof this.categoryTitle === "string" ? this.categoryTitle : null;

    let api_query: string = this.generateQuery(this.categoryQuery);

    // 共通Axiosレポジトリより取得関数実行関数
    // MicroCMSでのAPI使用方法 : https://document.microcms.io/content-api/get-list-contents
    const getArticles = async () => {
      // $axiosRepositoryの型が設定されていない（要修正）
      const res: ResponseInterface<ArticleInterface> = await this.$axiosRepository.get(
        this.generateURI(api_query)
      );
      this.articles = await res.contents;
      this.sum = await res.totalCount;
      this.maxPage = Math.ceil(this.sum / this.limit);
    };

    getArticles();
  }

  // ページング処理
  onNextArticles(number) {
    let api_query: string = this.generateQuery(this.categoryQuery);

    // 共通Axiosレポジトリより取得関数実行関数
    // MicroCMSでのAPI使用方法 : https://document.microcms.io/content-api/get-list-contents
    const getArticles = async () => {
      // $axiosRepositoryの型が設定されていない（要修正）-> Vueファイル内で定義したので解決（綺麗とは言えない）
      const res: ResponseInterface<ArticleInterface> = await this.$axiosRepository.get(
        this.generateURI(api_query)
      );
      this.articles = res.contents;
    };

    getArticles();
  }
}
</script>