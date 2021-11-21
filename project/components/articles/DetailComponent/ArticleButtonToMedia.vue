<template>
  <!-- 各メディアごとに応じてURLリンクへ移動するボタンの生成 -->
  <v-hover v-slot="{ hover }" open-delay="200">
    <v-btn
      :href="url"
      absolute
      :elevation="hover ? 20 : 2"
      :class="{ 'on-hover': hover }"
      class="white--text"
      fab
      large
      right
      bottom
      target="_blank"
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
  </v-hover>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ButtonToMedia extends Vue {
  @Prop({ default: "none", type: String })
  media!: string;

  @Prop({ default: "", type: String })
  url!: string;
}
</script>