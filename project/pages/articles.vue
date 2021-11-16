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
        <v-btn @click="onNextArticles()">次へ</v-btn>
      </v-layout>
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
  private limit: number = 1;

  // 現在のページ
  private page: number = 0;

  // 取得タグ
  private categoryQuery: string | null = null;

  // 取得したいカテゴリ
  private categoryTitle: string | string[] | null;

  // クエリ作成関数
  createQuery(query: string): string {
    return `get_articles${query}`;
  }

  generateQuery(
    limit: number,
    page: number,
    categoryQuery: string | null
  ): string {
    let query: string =
      categoryQuery === null
        ? `?limit=${limit}&offset=${page}`
        : `?filters=category[contains]${categoryQuery}[and]limit=${limit}&offset=${page}`;
    return query!;
  }

  created() {
    // カテゴリIDを取得
    this.categoryTitle = this.$route.query.categoryTitle;

    // クエリ条件指定
    // https://typescript-jp.gitbook.io/deep-dive/recap/null-undefined
    this.categoryQuery =
      typeof this.categoryTitle === "string"
        ? this.categoryTitle
        : this.categoryTitle[0];

    let api_query: string = this.generateQuery(
      this.limit,
      this.page,
      this.categoryQuery
    );

    // 共通Axiosレポジトリより取得関数実行関数
    // MicroCMSでのAPI使用方法 : https://document.microcms.io/content-api/get-list-contents
    const getArticles = async () => {
      // $axiosRepositoryの型が設定されていない（要修正）
      this.articles = await this.$axiosRepository.get(
        this.createQuery(api_query)
      );
    };

    getArticles();
  }

  // ページング処理
  onNextArticles() {
    this.page += 1;

    let api_query: string = this.generateQuery(
      this.limit,
      this.page,
      this.categoryQuery
    );

    console.log(api_query);
  }
}
</script>