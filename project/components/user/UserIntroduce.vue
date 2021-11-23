<template>
  <div class="inline-center">
    <v-avatar color="black" class="my-8" size="200">
      <v-img :src="image_url" />
    </v-avatar>
    <div class="txt-center">
      <p class="txt-name">{{name}}</p>
    </div>
    <div class="txt-center">
      <p class="txt-introduce">{{introduce}}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.inline-center {
  text-align: center;
}

.txt-center {
  margin: auto;

  .txt-name {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 1.25em;
    font-weight: 500;
    text-align: center;
  }

  .txt-introduce {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 0.8em;
    color: #444444;
    font-weight: 100;
    text-align: center;
  }
}
</style>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";

@Component
export default class UserIntorduce extends Vue {
  @Prop({ type: String })
  image_url: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  introduce: string;
}
</script>