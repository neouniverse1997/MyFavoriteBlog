<template>
  <v-app>
    <v-app-bar app class="indigo darken-4">
      <template v-slot:extension>
        <v-tabs fixed-tabs v-model="tab" dark align-with-title>
          <v-tab v-for="(item, i) in items" :key="i" :to="item.to" router exact>{{ item.title }}</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app class="indigo darken-4">
      <span class="yellow--text">&copy; {{ new Date().getFullYear() }}</span>
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
          icon: "mdi-apps",
          title: "Profile",
          to: "/"
        },
        {
          icon: "mdi-chart-bubble",
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
