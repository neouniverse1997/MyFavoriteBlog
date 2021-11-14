<template>
  <v-app>
    <!-- md以下であれば非表示、それ以外では表示 -->
    <!-- <div class="hidden-md-and-down"> -->
    <v-container fluid>
      <div class="index-title">
        <div class="index-title-text">Categories</div>
      </div>
      <!-- wrap = 要素が幅の限り横に並べるようなレイアウト -->
      <v-layout wrap>
        <v-flex xs12 sm6 md4 v-for="category in categories" v-bind:key="category.category_id">
          <v-hover v-slot="{ hover }">
            <v-card
              :to="{ path: '/articles', query: { categories_query: category.title }}"
              class="ma-2 mx-2"
              height="25rem"
              :class="{ 'on-hover': hover }"
              hover
            >
              <v-img height="15rem" :src="category.image.url">
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center"></v-row>
                </template>
              </v-img>
              <div class="ma-2">
                <div class="card-title-text">{{category.title}}</div>
                <v-card-subtitle>{{category.category_explain}}</v-card-subtitle>
              </div>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- </div> -->
    <!-- sm以上であれば非表示、それ以外では表示 -->
    <div class="hidden-sm-and-up"></div>
  </v-app>
</template>

<style scoped lang="scss">
/* これは CSS コメントです
複数行に分割できます。 
以下のテンプレートごとに分割しましょう */

// カード
.v-card {
  transition: opacity 0.4s ease-in-out;
}

// hoverしていないカードはopacity0.6
.v-card:not(.on-hover) {
  opacity: 0.6;
}

// ページのタイトル部分
.index-title {
  display: block;

  .index-title-text {
    text-align: center;
    margin-top: 5rem;
    margin-bottom: 5rem;
    font: 2em "Arial Black";
    color: #1a237e;
  }
}

// カードのタイトル部分
.card-title-text {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
  line-height: 2rem;
  padding: 0.3rem 0.75rem 0.3rem 0.7rem;
}
/* || 一般的なスタイル */
</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { CategoryInterface, ResponseInterface } from "../types/interface";

@Component
export default class Category extends Vue {
  // API取得クエリ
  private query: string = "category";

  // 取得カテゴリ一覧を定義
  private categories: CategoryInterface[] = [];

  created() {
    // 一覧表示に向けてカテゴリを取得
    const getCategory = async () => {
      // $axiosRepositoryの型が設定されていない（要修正）-> vue-shim.d.tsが読み込めていない
      let categoryList: CategoryInterface[] = await this.$axiosRepository.get(
        this.query
      );

      // 取得順をID順に変更するタスク
      let result = categoryList.sort(function(
        a: CategoryInterface,
        b: CategoryInterface
      ): number {
        return a.category_id > b.category_id ? 1 : -1;
      });
      this.categories = result;
    };
    getCategory();
  }
}
</script>