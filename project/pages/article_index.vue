<template>
  <v-app>
    <!-- md以下であれば非表示、それ以外では表示 -->
    <!-- <div class="hidden-md-and-down"> -->
    <v-container fluid>
      <v-layout wrap>
        <v-flex xs12 sm6 md4>
          <v-card class="pa-2 ma-2 mx-2"></v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- </div> -->
    <!-- sm以上であれば非表示、それ以外では表示 -->
    <div class="hidden-sm-and-up"></div>
  </v-app>
</template>

<script lang="ts">
import { ArticleInterface, IErrorResponse } from "../types/interface";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Article extends Vue {
  private limit: number = 3;
  private categoryId: number = 1;
  private categoryList: string[] = [
    "sports",
    "subculture",
    "economics",
    "politics",
    "music",
    "science",
    "information_techonology",
    "architecture",
    "psychology"
  ];
  private articles: ArticleInterface[] = [];

  createQuery(query: string) {
    return `get_articles${query}`;
  }

  created() {
    // クエリ条件指定
    const query: string =
      this.categoryId !== undefined
        ? `?filters=category[contains]${
            this.categoryList[this.categoryId - 1]
          }[and]limit=${this.limit}`
        : `limit=${this.limit}`;

    // MicroCMSでのAPI使用方法
    // https://document.microcms.io/content-api/get-list-contents
    const article = async () => {
      // $axiosRepositoryの型が設定されていない（要修正）
      const res: ArticleInterface[] = await this.$axiosRepository.get(
        this.createQuery(query)
      );
      this.articles = res;
    };
    article();
  }
}
</script>