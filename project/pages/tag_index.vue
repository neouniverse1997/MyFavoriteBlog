<template>
  <v-app>
    <!-- md以下であれば非表示、それ以外では表示 -->
    <!-- <div class="hidden-md-and-down"> -->
    <v-container fluid>
      <v-layout wrap>
        <v-flex xs12 sm6 md4 v-for="content in contents" v-bind:key="content.title">
          <v-card class="pa-2 ma-2 mx-2" :color="content.color">
            <v-btn text color="teal accent-4" @click="onClickButton()">Cilck</v-btn>
            <v-img :src="content.image">
              <v-toolbar-title class="text-h6 white--text pl-2">{{content.title}}</v-toolbar-title>
            </v-img>
            <v-card-subtitle>{{content.explain}}</v-card-subtitle>
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

// profileページで表示されるROOT_CONTENTS
interface rootContent {
  title: string;
  image: string;
  explain: string;
  color: string;
}

@Component
export default class profileClass extends Vue {
  private reveal: boolean = false;
  private images: string[] = ["/images/test.jpeg"];
  private explain: string[] = [
    "Listen to your favorite artists and albums whenever and wherever, online and offline."
  ];
  private contents: rootContent[] = [
    {
      title: "Sports",
      image: this.images[0],
      explain: this.explain[0],
      color: "red"
    },
    {
      title: "Subculture",
      image: this.images[0],
      explain: this.explain[0],
      color: "orange"
    },
    {
      title: "Economics",
      image: this.images[0],
      explain: this.explain[0],
      color: "yellow"
    },
    {
      title: "Politics",
      image: this.images[0],
      explain: this.explain[0],
      color: "green"
    },
    {
      title: "Music",
      image: this.images[0],
      explain: this.explain[0],
      color: "green"
    },
    {
      title: "Science",
      image: this.images[0],
      explain: this.explain[0],
      color: "blue"
    },
    {
      title: "Information Techonology",
      image: this.images[0],
      explain: this.explain[0],
      color: "blue"
    },
    {
      title: "Architecture",
      image: this.images[0],
      explain: this.explain[0],
      color: "pink"
    },
    {
      title: "Psychology",
      image: this.images[0],
      explain: this.explain[0],
      color: "pink"
    }
  ];

  onClickButton() {
    // ボタンが押された時の処理
    this.reveal = true;
    console.log(`IDを渡して次のページへ飛ぶ: ${this.reveal}`);
  }
}
</script>