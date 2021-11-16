<template>
  <!-- 各メディアごとに応じてURLリンクへ移動するボタンの生成 -->
  <v-btn
    :href="url"
    target="_blank"
    absolute
    class="white--text"
    fab
    large
    right
    bottom
    color="#191970"
  >
    <!-- ボタンロゴをリンク先メディアによって変更 -->
    <div v-if="media==='marcket'">
      <v-icon>mdi-cart</v-icon>
    </div>
    <div v-else-if="media==='twitter'">
      <v-icon>mdi-twitter</v-icon>
    </div>
    <div v-else-if="media==='github'">
      <v-icon>mdi-github</v-icon>
    </div>
    <div v-else-if="media==='youtube'">
      <v-icon>mdi-youtube</v-icon>
    </div>
    <div v-else>
      <v-icon>mdi-book</v-icon>
    </div>
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ButtonToMedia extends Vue {
  @Prop({ default: {} })
  media!: string;
  url!: string;
}
</script>