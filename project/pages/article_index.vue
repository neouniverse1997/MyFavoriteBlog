<template>
  <v-app>
    <!-- md以下であれば非表示、それ以外では表示 -->
    <!-- <div class="hidden-md-and-down"> -->
    <v-container fluid>
      <v-layout wrap>
        <v-flex xs12 sm6 md4>
          <v-card class="pa-2 ma-2 mx-2"></v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- </div> -->
    <!-- sm以上であれば非表示、それ以外では表示 -->
    <div class="hidden-sm-and-up"></div>
  </v-app>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Article extends Vue {
  created() {
    const getArticle = async () => {
      const returnData = await axios.get(
        "https://neouniverse.microcms.io/api/v1/article",
        {
          headers: {
            "X-MICROCMS-API-KEY": "c9c09375469449c5a0b2dbbf6eba0cb5cd1d"
          }
        }
      );
      console.log(returnData);
      return returnData;
    };
    getArticle();
  }
}
</script>