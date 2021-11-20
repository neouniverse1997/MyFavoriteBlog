<template>
  <v-app>
    <v-container fluid>
      <div class="index-title">
        <div class="index-title-text">CATEGORIES</div>
      </div>
      <!-- wrap = 要素が幅の限り横に並べるようなレイアウト -->
      <v-layout wrap>
        <v-flex xs12 sm6 md4 v-for="category in categories" v-bind:key="category.category_id">
          <!-- カテゴリ情報カード -->
          <category-card :category="category" />
        </v-flex>
      </v-layout>
    </v-container>
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
import { categoryModule } from "../store/categoryInfo";
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
      const res: ResponseInterface<CategoryInterface> = await this.$axiosRepository.get(
        this.query
      );
      let categoryList: CategoryInterface[] = res.contents;

      // 取得順をID順に変更するタスク
      let result = categoryList.sort(function(
        a: CategoryInterface,
        b: CategoryInterface
      ): number {
        return a.category_id > b.category_id ? 1 : -1;
      });
      this.categories = result;
      categoryModule.setCategoryList(this.categories.map(obj => obj.title));
    };
    getCategory();
  }
}
</script>