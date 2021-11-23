<template>
  <v-flex xs12 sm6>
    <div class="media-to-button-area">
      <div class="media-to-button">
        <v-hover v-slot="{ hover }" open-delay="200">
          <v-btn
            :elevation="hover ? 20 : 2"
            :class="{ 'on-hover': hover }"
            class="white--text"
            x-large
            fab
            target="_blank"
            color="#191970"
          >
            <v-icon>mdi-cart</v-icon>
          </v-btn>
        </v-hover>
      </div>
      <div class="media-to-button-name">
        <span>Github</span>
      </div>
    </div>
  </v-flex>
</template>

<style lang="scss" scoped>
.media-to-button-area {
  margin: 1rem 1rem 1rem 1rem;

  .media-to-button {
    text-align: center;
    padding-bottom: 1rem;
  }

  .media-to-button-name {
    text-align: center;
    margin: auto;
  }
}
</style>