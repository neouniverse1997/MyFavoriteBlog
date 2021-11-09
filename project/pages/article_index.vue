<template>
  <v-app>
    <!-- md以下であれば非表示、それ以外では表示 -->
    <!-- <div class="hidden-md-and-down"> -->
    <v-container fluid>
      <v-layout wrap>
        <v-flex xs12 sm6 md4 v-for="article in articles" v-bind:key="article.id">
          <v-dialog v-model="dialog" scrollable max-width="300px">
            <template v-slot:activator="{ on, attrs }">
              <v-hover v-slot:default="{ hover }">
                <v-card class="pa-2 ma-2 mx-2" color="white">
                  <v-toolbar-title class="text-h6 black--text pl-2">{{article.title}}</v-toolbar-title>
                  <v-img class="show-img" :src="article.image.url" />
                  <div class="show-detail" :class="hover ? 'effect-in' : 'effect-fade'">
                    <v-btn icon color="black" v-bind="attrs" v-on="on">
                      <v-icon>mdi-account</v-icon>詳細を見る
                    </v-btn>
                  </div>
                </v-card>
              </v-hover>
            </template>
            <v-card>
              <v-card-title>{{article.title}}</v-card-title>
              <v-divider></v-divider>
              <v-card-text style="height: 30px;">{{article.contents}}</v-card-text>
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
import { ArticleInterface, IErrorResponse } from "../types/interface";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Article extends Vue {
  private limit: number = 3;
  private dialog: boolean = false;
  private categoryId: number | undefined = undefined;
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
        : `?limit=${this.limit}`;

    // 共通Axiosレポジトリより取得関数実行
    // MicroCMSでのAPI使用方法
    // https://document.microcms.io/content-api/get-list-contents
    const getArticles = async () => {
      // $axiosRepositoryの型が設定されていない（要修正）
      const res: ArticleInterface[] = await this.$axiosRepository.get(
        this.createQuery(query)
      );
      this.articles = res;
    };
    getArticles();
  }
}
</script>