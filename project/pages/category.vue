<template>
  <v-app>
    <v-container fluid>
      <div class="index-title">
        <div class="index-title-text">CATEGORIES</div>
      </div>
      <v-layout wrap>
        <v-flex xs12 sm6 md4 v-for="category in categories" v-bind:key="category.category_id">
          <category-card :category="category" />
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<style scoped lang="scss">
// カード
.v-card {
  transition: opacity 0.4s ease-in-out;
}

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
</style>

<script lang="ts">
import { categoryModule } from "../store/categoryInfo";
import { Vue, Component, Prop } from "vue-property-decorator";
import {
  CategoryInterface,
  ResponseInterface,
  CategoryImageInterface
} from "../types/interface";

@Component
export default class Category extends Vue {
  // API取得クエリ
  private query: string = "category";

  // 取得カテゴリ一覧を定義
  private categories: CategoryInterface[] = [];

  // 取得カテゴリペア（画像-名前のみ）を定義
  private categoryImageArray: CategoryImageInterface[] = [];

  created() {
    const getCategory = async () => {
      const res: ResponseInterface<CategoryInterface> = await this.$axiosRepository.get(
        this.query
      );
      let categoryList: CategoryInterface[] = res.contents;

      // カテゴリID順にソート
      let result = categoryList.sort(function(
        a: CategoryInterface,
        b: CategoryInterface
      ): number {
        return a.category_id > b.category_id ? 1 : -1;
      });

      // カテゴリ情報（名前,画像）をStoreに保存
      this.categories = result;
      this.categoryImageArray = this.categories.map(obj => {
        let rObj: CategoryImageInterface = { title: "", image: "" };
        rObj.title = obj.title;
        rObj.image = obj.image !== undefined ? obj.image.url : "";
        return rObj;
      });
      categoryModule.setCategoryImageArray(this.categoryImageArray);
    };
    getCategory();
  }
}
</script>