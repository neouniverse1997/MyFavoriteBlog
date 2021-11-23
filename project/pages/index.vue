<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo pa-4 d-flex justify-center">
        <v-flex xs12>
          <div v-if="userList!=null">
            <user-introduce
              :image_url="userList.image.url"
              :name="userList.name"
              :introduce="userList.introduce"
            />
          </div>
          <div v-else>
            <user-introduce image_url="/images/loading.png" name introduce />
          </div>
          <div v-if="userList!=null">
            <v-card-text>
              <v-spacer />
              <v-layout wrap>
                <v-flex xs6>
                  <div v-if="userList.twitter!=undefined">
                    <user-to-media-button
                      :url="userList.twitter"
                      mediaName="Twitter"
                      icon="mdi-twitter"
                    />
                  </div>
                </v-flex>
                <v-flex xs6>
                  <div v-if="userList.github!=undefined">
                    <user-to-media-button
                      :url="userList.github"
                      mediaName="Github"
                      icon="mdi-github"
                    />
                  </div>
                </v-flex>
                <v-flex xs6>
                  <div v-if="userList.youtube!=undefined">
                    <user-to-media-button
                      :url="userList.youtube"
                      mediaName="Youtube"
                      icon="mdi-youtube"
                    />
                  </div>
                </v-flex>
                <v-flex xs6>
                  <div v-if="userList.note!=undefined">
                    <user-to-media-button
                      :url="userList.note"
                      mediaName="Note"
                      icon="mdi-note-edit"
                    />
                  </div>
                </v-flex>
                <v-flex xs6>
                  <div v-if="userList.zenn!=undefined">
                    <user-to-media-button
                      :url="userList.zenn"
                      mediaName="Zenn"
                      icon="mdi-code-greater-than"
                    />
                  </div>
                </v-flex>
                <v-flex xs6>
                  <div v-if="userList.blog!=undefined">
                    <user-to-media-button
                      :url="userList.blog"
                      mediaName="はてなブログ"
                      icon="mdi-pencil"
                    />
                  </div>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-text>
              <v-divider class="mx-4"></v-divider>
              <v-flex xs12>
                <div class="site-introduce">
                  <p class="site-introduce-txt">
                    「とある個人の嗜好遍歴」は他人に自身の事をもっと知って頂こうと思い、
                    制作した「趣味全振り」のポートフォーリオです。
                    技術スタックはNuxt+Vue+microCMS+Dockerです。
                    microCMS上からデータの更新が可能ですので、
                    以下のGithubのリポジトリからREADMEに沿って頂くと、
                    誰でも使用可能なプラットフォームになっております。
                  </p>
                </div>
                <user-to-media-button
                  url="https://github.com/neouniverse1997/MyFavoriteBlog"
                  mediaName="This Website"
                  icon="mdi-github"
                />
              </v-flex>
            </v-card-text>
          </div>
        </v-flex>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.site-introduce {
  margin: auto;
  margin: 1rem 1rem 1rem 1rem;

  .site-introduce-txt {
    margin-top: 3rem;
    margin-bottom: 2rem;
    font-size: 1em;
    color: #444444;
    font-weight: 100;
    text-align: left;
  }
}
</style>

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
        userModule.setUser(this.userList);
      } catch {}
    };

    this.userList = userModule.userStore;
    if (this.userList == null) {
      getUser();
    }
  }
}
</script>

