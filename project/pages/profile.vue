<template>
  <v-app>
    <!-- md以下であれば非表示、それ以外では表示 -->
    <!-- <div class="hidden-md-and-down"> -->
    <v-container fluid>
      <v-layout wrap>
        <v-flex xs12 sm6 md4>
          <v-card class="pa-2 ma-2 mx-2" color="#ff0000">
            <v-toolbar-title class="text-h6 white--text pl-0">Sports</v-toolbar-title>
            <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-card class="pa-2 ma-2 mx-2" color="#ffa500">
            <v-toolbar-title class="text-h6 white--text pl-0">Subculture</v-toolbar-title>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-card class="pa-2 ma-2 mx-2" color="#ffd700">
            <v-toolbar-title class="text-h6 black--text pl-0">Economics</v-toolbar-title>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-card class="pa-2 ma-2 mx-2" color="#009900">
            <v-toolbar-title class="text-h6 black--text pl-0">Politics</v-toolbar-title>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-card class="pa-2 ma-2 mx-2" color="#006400">
            <v-toolbar-title class="text-h6 white--text pl-0">Music</v-toolbar-title>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-card class="pa-2 ma-2 mx-2" color="#0000ff">
            <v-toolbar-title class="text-h6 white--text pl-0">Science</v-toolbar-title>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-card class="pa-2 ma-2 mx-2" color="#191970">
            <v-toolbar-title class="text-h6 white--text pl-0">Information Techonology</v-toolbar-title>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-card class="pa-2 ma-2 mx-2" color="#4b0082">
            <v-toolbar-title class="text-h6 white--text pl-0">Other</v-toolbar-title>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-card class="pa-2 ma-2 mx-2" color="#c71585">
            <v-toolbar-title class="text-h6 white--text pl-0">Psychology</v-toolbar-title>
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

<script>
export default {
  data: () => ({
    windowSize: {
      x: 0,
      y: 0
    }
  })
};
</script>