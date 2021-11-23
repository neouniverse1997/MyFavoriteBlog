<template>
  <v-app dark>
    <div class="error-display">
      <p class="error-display-txt" v-if="error.statusCode === 404">{{ pageNotFound }}</p>
      <p class="error-display-txt" v-else>{{ otherError }}</p>
      <div class="text-center">
        <v-btn rounded style="background-color: #1a237e;" dark url="/">ホーム画面まで戻ります</v-btn>
      </div>
    </div>
  </v-app>
</template>

<style lang="scss" scoped>
.error-display {
  margin-top: 5rem;
  margin-left: auto;
  margin-right: auto;

  .error-display-txt {
    margin-bottom: 2rem;
    font-weight: 500;
    font-size: 3rem;
  }
}
</style>
<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred"
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
