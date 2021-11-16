<template>
  <v-hover v-slot="{ hover }">
    <v-card
      :to="{ path: '/articles', query: { categoryTitle: category.title }}"
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
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { CategoryInterface } from "../../types/interface";

@Component
export default class CategoryCard extends Vue {
  @Prop({ default: {} })
  category!: CategoryInterface;
}
</script>