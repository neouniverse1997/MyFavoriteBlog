<template>
  <v-app>
    <v-container flex>
      <v-layout wrap>
        <v-flex xs12 sm4 class="hidden-xs-and-down"></v-flex>
        <v-flex xs12 sm4>
          <v-card>
            <v-card-title id="two-way-binding">
              <p>{{ profile }}</p>
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field prepend-icon="mdi-account-circle" label="Username" />
                <v-text-field
                  autocomplete="off"
                  prepend-icon="mdi-lock"
                  label="Password"
                  type="password"
                  append-icon="mdi-eye-off"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn>LogIN</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12 sm4 class="hidden-xs-and-down"></v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

type LoginType = {
  username: string;
  password: string;
};
type UserType = {
  name: string;
  year: number;
};

// 型推論が有効
@Component
export default class MyComponent extends Vue {
  private msg = "サンプルメッセージ";
  private users: Array<string> = ["山田", "田中"];
  private userLogin: LoginType = { username: "", password: "" };
  private userInfo: UserType = { name: "masaya", year: 1997 };

  get profile(): string {
    return `Hi, My name is ${this.userInfo.name} , I was born in ${this.userInfo.year}!!`;
  }
}
</script>