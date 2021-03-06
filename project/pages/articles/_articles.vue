<template>
  <v-app>
    <v-container fluid>
      <v-layout wrap>
        <div v-for="category in categoryImageArray" v-bind:key="category.title">
          <article-category-button :title="category.title" />
        </div>
      </v-layout>
      <div class="index-title">
        <div class="index-title-text">
          Category:
          <div class="index-category-text">{{categoryTitle}}</div>
        </div>
      </div>
      <v-layout wrap>
        <v-flex xs12 sm6 md4 v-for="article in articles" v-bind:key="article.id">
          <article-card :article="article" :categoryImageArray="categoryImageArray" />
        </v-flex>
      </v-layout>
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

// ページのタイトル
.index-title {
  display: block;

  .index-title-text {
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 3rem;
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
import { categoryModule } from "../../store/categoryInfo";
import {
  ArticleInterface,
  ResponseInterface,
  CategoryImageInterface
} from "../../types/interface";
import { Component, Vue, Prop } from "vue-property-decorator";
import { AxiosRepository } from "../../repository/axiosRepository";
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
  // 取得記事一覧
  private articles: ArticleInterface[] = [];

  // 最大取得件数
  private limit: number = 6;

  // 記事数
  private sum: number = 0;

  // 現在のページ
  private page: number = 1;

  // 最大ページ
  private maxPage: number = 0;

  // 取得したいカテゴリ
  private categoryTitle: string = "ALL";

  // カテゴリ情報（画像=名前のみ）
  private categoryImageArray: CategoryImageInterface[];

  // URI作成関数
  generateURI(query: string): string {
    return `get_articles${query}`;
  }

  // クエリ作成関数
  generateQuery(categoryQuery: string): string {
    let query: string =
      categoryQuery === "ALL"
        ? `?limit=${this.limit}&offset=${(this.page - 1) *
            this.limit}&orders=publishedAt`
        : `?filters=category[contains]${categoryQuery}&limit=${
            this.limit
          }&offset=${(this.page - 1) * this.limit}&orders=publishedAt`;
    return query!;
  }
  created() {
    // クエリ条件指定
    // https://typescript-jp.gitbook.io/deep-dive/recap/null-undefined
    this.categoryTitle =
      typeof this.$route.params.articles === "string"
        ? this.$route.params.articles
        : categoryModule.currentCategory;

    // クエリ作成
    let api_query: string = this.generateQuery(this.categoryTitle);

    // カテゴリを保存
    categoryModule.setCurrentCategory(this.categoryTitle);

    // Storeから全カテゴリ情報（画像=名前）を取得
    this.categoryImageArray = categoryModule.categoryImageArray;

    // 共通Axiosレポジトリより取得関数実行関数
    // MicroCMSでのAPI使用方法 : https://document.microcms.io/content-api/get-list-contents
    const getArticles = async () => {
      // $axiosRepositoryの型が設定されていない（要修正）
      const res: ResponseInterface<ArticleInterface> = await this.$axiosRepository.get(
        this.generateURI(api_query)
      );
      this.articles = await res.contents;
      // 該当記事数の最大数
      this.sum = await res.totalCount;
      // ページング処理の最大ページ数
      this.maxPage = Math.ceil(this.sum / this.limit);
    };

    getArticles();
  }

  // ページング処理
  onNextArticles(number: number) {
    let api_query: string = this.generateQuery(this.categoryTitle);

    // 共通Axiosレポジトリより取得関数実行関数
    // MicroCMSでのAPI使用方法 : https://document.microcms.io/content-api/get-list-contents
    const getArticles = async () => {
      const res: ResponseInterface<ArticleInterface> = await this.$axiosRepository.get(
        this.generateURI(api_query)
      );
      this.articles = res.contents;
    };

    getArticles();
  }
}
</script>