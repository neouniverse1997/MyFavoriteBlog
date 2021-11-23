<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <v-avatar color="orange" size="256">
          <!-- <v-img :src="userList.image.url" /> -->
        </v-avatar>
      </v-card>
      <v-card>
        <!-- <v-card-title class="headline">{{userList.name}}</v-card-title> -->
        <v-card-text>
          <!-- <p>{{userList.introduce}}</p> -->
          <v-spacer />
          <v-layout wrap>
            <user-to-media-button />
            <user-to-media-button />
            <user-to-media-button />
            <user-to-media-button />
          </v-layout>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { userModule } from "../store/userInfo";
import { Vue, Component, Prop } from "vue-property-decorator";
import { ResponseInterface, UserInterface } from "../types/interface";

@Component
export default class Category extends Vue {
  // API取得クエリ
  private query: string = "user";

  // 取得ユーザー情報を定義
  private userList: UserInterface | null = null;

  created() {
    // 一覧表示に向けてユーザーを取得（一つのみ）
    const getUser = async () => {
      const res: ResponseInterface<UserInterface> = await this.$axiosRepository.get(
        this.query
      );
      try {
        this.userList = res.contents[0];
        console.log(this.userList.name);
        console.log(this.userList.image.url);
        userModule.setUser(this.userList);
      } catch {
        console.log("Error");
      }
    };

    this.userList = userModule.userStore;
    if (this.userList == null) {
      getUser();
    }
  }
}
</script>
