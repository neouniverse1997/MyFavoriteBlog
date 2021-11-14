<template>
  <v-app>
    <!-- md以下であれば非表示、それ以外では表示 -->
    <!-- <div class="hidden-md-and-down"> -->
    <v-container fluid>
      <div class="index-title">
        <div class="index-title-text">
          Category:
          <div class="index-category-text">{{categoryName}}</div>
        </div>
      </div>
      <v-layout wrap>
        <v-flex xs12 sm6 md4 v-for="article in articles" v-bind:key="article.id">
          <!-- 通常時、一覧表示されているページ -->
          <v-dialog v-model="dialog" max-width="30rem" scrollable :retain-focus="false">
            <template v-slot:activator="{ on, attr }">
              <v-hover v-slot:default="{ hover }">
                <v-card class="ma-2 mx-2" height="22rem">
                  <v-img
                    height="15rem"
                    :src="article.image.url"
                    :class="{ 'on-hover': hover }"
                    hover
                    v-bind="attr"
                    v-on="on"
                    @click="onClickButton(article)"
                  >
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out v-card--reveal text-h4 yellow--text indigo darken-4"
                        style="height: 100%;"
                      >Click!!</div>
                    </v-expand-transition>
                  </v-img>
                  <div v-if="article.url!==undefined">
                    <v-btn
                      :href="article.url"
                      target="_blank"
                      absolute
                      class="yellow--text"
                      fab
                      large
                      right
                      bottom
                      color="#191970"
                    >
                      <v-icon>mdi-cart</v-icon>
                    </v-btn>
                  </div>
                  <div class="card-title-text">{{article.title}}</div>
                  <div v-if="article.generator!==undefined">
                    <v-card-subtitle>著者：{{article.generator}}</v-card-subtitle>
                  </div>
                </v-card>
              </v-hover>
            </template>
            <!-- 以下、ボタン押した時に表示されるダイアログ -->
            <v-card v-if="currentArticle" class="pa-1 nonhover">
              <v-card-title class="headline text-center pb-3">{{currentArticle.title}}</v-card-title>
              <v-card-subtitle class="py-3">作成日 : {{createDateTime(currentArticle.updatedAt)}}</v-card-subtitle>
              <v-divider></v-divider>
              <v-card-text min-height="50em" style="background-color: white;">
                <span class="text-h6 black--text pa-1" v-html="currentArticle.contents"></span>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn @click="dialog = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- </div> -->
    <!-- sm以上であれば非表示、それ以外では表示 -->
    <div class="hidden-sm-and-up"></div>
  </v-app>
</template>

<style lang="scss" scoped>
// カード
.v-card {
  transition: opacity 0.4s ease-in-out;
}

// hover時の画像の挙動
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 1;
  position: absolute;
  width: 100%;
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
      font: 3em "Arial Black";
      font-weight: 500;
      color: #1a237e;
    }
  }
}

// カードのタイトル部分
.card-title-text {
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 2rem;
  padding: 0.4rem 0.75rem 0.4rem 0.7rem;
}
</style>

<script lang="ts">
import { ArticleInterface, ResponseInterface } from "../types/interface";
import { Component, Vue } from "vue-property-decorator";

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
  private limit: number = 3;

  // 取得タグ
  private categoryName: string | null = null;

  private category_query: string | string[] | null;

  // ダイアログの状態
  private dialog: boolean = false;

  // 現在の表示記事
  private currentArticle: ArticleInterface | null = null;

  // 時間表示関数
  createDateTime(dateString: string): string {
    let format: string = "YYYY年MM月DD日";
    format = format.replace(/YYYY/g, dateString.slice(0, 4));
    format = format.replace(/MM/g, dateString.slice(5, 7));
    format = format.replace(/DD/g, dateString.slice(8, 10));
    return format;
  }

  // クエリ作成関数
  createQuery(query: string): string {
    return `get_articles${query}`;
  }

  created() {
    // カテゴリIDを取得
    this.category_query = this.$route.query.categories_query;

    // クエリ条件指定
    // https://typescript-jp.gitbook.io/deep-dive/recap/null-undefined
    this.categoryName =
      typeof this.category_query == "string"
        ? this.category_query
        : this.category_query[0];
    const query: string =
      this.categoryName === null
        ? `?limit=${this.limit}`
        : `?filters=category[contains]${this.categoryName}[and]limit=${this.limit}`;

    // 共通Axiosレポジトリより取得関数実行関数
    // MicroCMSでのAPI使用方法 : https://document.microcms.io/content-api/get-list-contents
    const getArticles = async () => {
      // $axiosRepositoryの型が設定されていない（要修正）
      this.articles = await this.$axiosRepository.get(this.createQuery(query));
    };

    getArticles();
  }
  // ボタンを押した時に表示したい詳細記事
  onClickButton(selected_article: ArticleInterface) {
    this.currentArticle = selected_article;
  }
}
</script>