<template>
  <v-app>
    <v-app-bar app class="indigo darken-4">
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
      title: "NEO UNIVERSE ch"
    };
  }
};
</script>
