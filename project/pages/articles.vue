<template>
  <v-app>
    <!-- md以下であれば非表示、それ以外では表示 -->
    <!-- <div class="hidden-md-and-down"> -->
    <v-container fluid>
      <v-layout wrap>
        <v-flex xs12 sm6 md4 v-for="article in articles" v-bind:key="article.id">
          <!-- 通常時、一覧表示されているページ -->
          <v-dialog v-model="dialog" max-width="75%" scrollable :retain-focus="false">
            <template v-slot:activator="{ on, attr }">
              <v-hover v-slot:default="{ hover }">
                <v-card class="pa-2 ma-2 mx-2" color="white">
                  <v-img class="show-img" :src="article.image.url" />
                  <div class="show-detail" :class="hover ? 'effect-in' : 'effect-fade'">
                    <v-btn
                      icon
                      color="black"
                      v-bind="attr"
                      v-on="on"
                      @click="onClickButton(article)"
                    >
                      <v-icon>mdi-account</v-icon>詳細を見る
                    </v-btn>
                  </div>
                  <div v-if="article.url!==undefined">
                    <v-btn :href="article.url" target="_blank">マーケットページへ</v-btn>
                  </div>
                </v-card>
              </v-hover>
            </template>
            <!-- 以下、ボタン押した時に表示されるダイアログ -->
            <v-card v-if="currentArticle" class="pa-1">
              <v-card-title class="headline text-center pb-3">{{currentArticle.title}}</v-card-title>
              <v-card-subtitle class="py-3">作成日 : {{createDateTime(currentArticle.updatedAt)}}</v-card-subtitle>
              <v-divider></v-divider>
              <!-- <v-img class="show-img" width="50rem" :src="currentArticle.image.url" /> -->
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
.show-img {
  margin: 1em 1em 1em 1em;
}

.show-detail {
  width: 100px;
  margin: 1em 1em 1em 1em;

  border-radius: 17px 17px 0 0;
  background-color: lightblue;

  &:hover {
    background-color: blue;
  }
}

.effect-fade {
  opacity: 0;
  width: 0;
}

.effect-in {
  opacity: 1;
  width: 100px;
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