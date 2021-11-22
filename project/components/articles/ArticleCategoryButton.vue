<template>
  <div class="category-button-field">
    <a @click="onNextCategoryPage(title)" class="category-button btn">{{title}}</a>
  </div>
</template>


<style lang="scss" scoped>
.category-button-field {
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  .category-button {
    font-size: 1rem;
    padding: 5px 10px 5px 10px;
    border-radius: 20px;
    font-weight: 700;
    line-height: 1.5;
    background-image: -webkit-gradient(
      linear,
      left top,
      right top,
      from(#1a237e),
      to(#1a237e)
    );
    color: white;
    border-bottom: 5px solid gray;
  }

  .category-button:hover {
    transform: translate(0, -2px);
    background-image: -webkit-gradient(
      linear,
      left top,
      right top,
      from(#1a237e),
      to(#8a9ba7)
    );
    border-bottom: 5px solid #009efd;
  }
}
</style>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

Component.registerHooks(["beforeRouteUpdate"]);

@Component
export default class ArticleCategoryButton extends Vue {
  // カテゴリ
  @Prop({ default: {} })
  title!: string;

  onNextCategoryPage(title: string) {
    this.$router.push({
      name: `articles-articles`,
      params: { articles: this.title }
    });
  }
}
</script>>