<template>
  <v-app>
    <v-app-bar app class="indigo darken-4">
      <div class="app-title">
        <div class="app-title-text">
          とある
          <span style="font-size: 1.4rem;">個人</span>の
          <span style="font-size: 1.2rem;">嗜好遍歴</span>
        </div>
      </div>
      <template v-slot:extension>
        <v-tabs fixed-tabs dark>
          <v-tab v-for="(item, i) in items" :key="i" :to="item.to" router>{{ item.title }}</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app class="indigo darken-4">
      <span class="white--text">とある個人の嗜好遍歴</span>
    </v-footer>
  </v-app>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c");

.app-title {
  text-align: center;
  margin: 0 auto;

  .app-title-text {
    color: white;
    font-weight: 500;
    font-family: "M PLUS Rounded 1c", sans-serif;
  }
}
</style>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          title: "PROFILE",
          to: "/"
        },
        {
          title: "Categories",
          to: "/category"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "とある個人の嗜好遍歴"
    };
  }
};
</script>
