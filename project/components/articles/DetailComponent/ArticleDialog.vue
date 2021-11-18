<template>
  <!-- ボタン押した時に表示されるダイアログ　/ 記事のコンテンツが表示される -->
  <v-card v-if="current_article" class="pa-1 nonhover">
    <div class="dialog-title-block">
      <span class="dialog-title-inline">{{current_article.title}}</span>
    </div>
    <div class="dialog-subtitle-block">
      <span class="dialog-subtitle-inline">作成日 : {{createDateTime(current_article.updatedAt)}}</span>
    </div>
    <v-divider></v-divider>
    <v-card-text min-height="50em" style="background-color: white;">
      <span class="text-h6 black--text pa-1" v-html="current_article.contents"></span>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <div class="close-button-block">
        <v-btn @click="dialog = false">Close</v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>
.dialog-title-block {
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;

  .dialog-title-inline {
    color: black;
  }
}

.dialog-subtitle-block {
  margin-left: 1rem;
  margin-bottom: 1rem;
}

.close-button-block {
  margin: auto;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";
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

  @PropSync("name", { type: Boolean })
  dialog!: boolean;
}
</script>