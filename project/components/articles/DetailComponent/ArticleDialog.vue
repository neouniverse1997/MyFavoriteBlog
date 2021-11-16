<template>
  <!-- ボタン押した時に表示されるダイアログ　/ 記事のコンテンツが表示される -->
  <v-card v-if="current_article" class="pa-1 nonhover">
    <v-card-title class="headline text-center pb-3">{{current_article.title}}</v-card-title>
    <v-card-subtitle class="py-3">作成日 : {{createDateTime(current_article.updatedAt)}}</v-card-subtitle>
    <v-divider></v-divider>
    <v-card-text min-height="50em" style="background-color: white;">
      <span class="text-h6 black--text pa-1" v-html="current_article.contents"></span>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn @click="dialog = false">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ArticleInterface } from "../../../types/interface";

@Component
export default class ArticleDialog extends Vue {
  // 時間表示関数
  createDateTime(dateString: string): string {
    let format: string = "YYYY年MM月DD日";
    format = format.replace(/YYYY/g, dateString.slice(0, 4));
    format = format.replace(/MM/g, dateString.slice(5, 7));
    format = format.replace(/DD/g, dateString.slice(8, 10));
    return format;
  }

  @Prop({ default: {} })
  current_article!: ArticleInterface;
  dialog!: boolean;
}
</script>