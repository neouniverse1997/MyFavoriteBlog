<template>
  <v-app>
    <!-- md以下であれば非表示、それ以外では表示 -->
    <!-- <div class="hidden-md-and-down"> -->
    <v-container fluid>
      <v-layout wrap>
        <v-flex xs12 sm6 md4 v-for="category in categories" v-bind:key="category.category_id">
          <v-card class="pa-2 ma-2 mx-2">
            <nuxt-link
              :to="{ path: 'articles', query: { categories_query: category.category_name }}"
            >{{category.category_name}}へ</nuxt-link>
            <v-img :src="category.category_image.url">
              <v-toolbar-title class="text-h6 white--text pl-2">{{category.category_title}}</v-toolbar-title>
            </v-img>
            <v-card-subtitle>{{category.category_explain}}</v-card-subtitle>
          </v-card>
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

/* || 一般的なスタイル */
</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { CategoryInterface } from "../types/interface";

@Component
export default class profileClass extends Vue {
  // API取得クエリ
  private query: string = "category";
  // 取得カテゴリ一覧を定義
  private categories: CategoryInterface[] = [];

  created() {
    // 一覧表示に向けてカテゴリを取得
    const getCategory = async () => {
      // $axiosRepositoryの型が設定されていない（要修正）
      let res: CategoryInterface[] = await this.$axiosRepository.get(
        this.query
      );
      // 取得順をID順に変更するタスク
      let result = res.sort(function(
        a: CategoryInterface,
        b: CategoryInterface
      ) {
        return a.category_id > b.category_id ? 1 : -1;
      });
      this.categories = result;
    };
    getCategory();
  }
}
</script>