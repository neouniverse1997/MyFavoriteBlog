<template>
  <v-pagination
    variant="outlined"
    shape="rounded"
    color="secondary"
    v-model="page"
    :count="maxPage"
    :total-visible="6"
    :page="page"
    :length="maxPage"
    @input="pagenationClick(page)"
  ></v-pagination>
</template>

<script lang="ts">
import { Component, Emit, Vue, Prop, PropSync } from "vue-property-decorator";

@Component
export default class ButtonToMedia extends Vue {
  // PropSyncに変更する
  @Prop({ type: Number })
  page: number;

  @Prop({ type: Number })
  maxPage: number;

  @Emit("pagenationClick")
  pagenationClick(number) {
    return number;
  }
}
</script>