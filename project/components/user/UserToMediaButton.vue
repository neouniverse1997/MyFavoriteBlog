<template>
  <div class="media-to-button-area">
    <div class="media-to-button">
      <v-hover v-slot="{ hover }" open-delay="200">
        <v-btn
          :href="url"
          :elevation="hover ? 20 : 2"
          :class="{ 'on-hover': hover }"
          class="white--text"
          x-large
          fab
          target="_blank"
          color="#191970"
        >
          <v-icon>{{icon}}</v-icon>
        </v-btn>
      </v-hover>
    </div>
    <div class="media-to-button-name">
      <span>{{mediaName}}</span>
    </div>
  </div>
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

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class UserMediaButton extends Vue {
  @Prop({ default: { type: String } })
  url: string;

  @Prop({ default: { type: String } })
  icon: string;

  @Prop({ default: { type: String } })
  mediaName: string;
}
</script>