<template>
  <v-hover v-slot="{ hover }">
    <v-card
      class="ma-2 mx-2"
      height="25rem"
      :class="{ 'on-hover': hover }"
      hover
      @click="onNextCategoryPage()"
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
</template>

<style lang="scss" scoped>
.card-title-text {
  margin-left: 1rem;
  margin-top: 1rem;
  font-weight: 500;
}
</style>

<script lang="ts">
import Vuex from "vuex";
import { Component, Vue, Prop } from "vue-property-decorator";
import { CategoryInterface } from "../../types/interface";

@Component
export default class CategoryCard extends Vue {
  @Prop({ default: {} })
  category!: CategoryInterface;

  onNextCategoryPage() {
    this.$router.push({
      name: "articles",
      params: { title: this.category.title }
    });
  }
}
</script>