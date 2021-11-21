<template>
  <!-- 一覧表示されているカード -->
  <v-dialog v-model="dialog" max-width="30rem" scrollable :retain-focus="false">
    <template v-slot:activator="{ on, attr }">
      <v-hover v-slot:default="{ hover }">
        <v-card class="mx-2 mb-15" height="22rem">
          <!-- 記事を象徴する画像の表示 -->
          <v-img
            height="15rem"
            :src="defaultImage"
            :class="{ 'on-hover': hover }"
            hover
            v-bind="attr"
            v-on="on"
            @click="onClickButton(article)"
          >
            <!-- hoverするとCLICK画面が表示される -->
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out v-card--reveal indigo darken-4"
                style="height: 100%;"
              >
                <a class="expand-text">CLICK</a>
              </div>
            </v-expand-transition>
          </v-img>
          <!-- 記事に付随するリンクボタン -->
          <div v-if="article.url!=undefined">
            <article-button-to-media :url="article.url" :media="article.url_to_media[0]" />
          </div>
          <!-- 記事のタイトル・著者の表示 -->
          <v-container class="overflow-y-auto article-contents">
            <div class="card-title-text">{{article.title}}</div>
            <div v-if="article.generator!==undefined">
              <v-card-subtitle>著者：{{article.generator}}</v-card-subtitle>
            </div>
          </v-container>
        </v-card>
      </v-hover>
    </template>
    <!-- 記事をクリックした時に表示される詳細ダイアログ -->
    <article-dialog :current_article="currentArticle" :name.sync="dialog" />
  </v-dialog>
</template>

<style lang="scss" scoped>
.expand-text {
  color: white;
  font-weight: 700;
  font-size: 3rem;
}

.article-contents {
  max-height: 70px;

  // カードのタイトル部分
  .card-title-text {
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 2rem;
    padding: 0.4rem 0.75rem 0.4rem 0.7rem;
  }
}

// hover時の画像の挙動
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 1;
  position: absolute;
  width: 100%;
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import {
  ArticleInterface,
  CategoryImageInterface
} from "../../types/interface";
import { categoryModule } from "../../store/categoryInfo";

@Component
export default class ArticleCard extends Vue {
  // ダイアログの状態
  private dialog: boolean = false;

  // 現在の表示記事
  private currentArticle: ArticleInterface | null = null;

  // デフォルト表示画像
  private defaultImage?: string = "/images/main_img.png";

  // カテゴリ記事
  @Prop({ default: {} })
  categoryImageArray!: CategoryImageInterface[];

  // 表示記事
  @Prop({ default: {} })
  article!: ArticleInterface;

  created() {
    // Storeからカテゴリ画像を取得
    let categoryImage = this.categoryImageArray.filter(
      obj => obj.title === this.article.category[0]
    );

    // カテゴリ画像を取得できない場合、デフォルト画像を適用
    this.defaultImage =
      categoryImage.length == 0 ? this.defaultImage : categoryImage[0].image;

    // 記事から画像を取得できない場合、デフォルト画像を適用
    this.defaultImage =
      this.article.image === undefined
        ? this.defaultImage
        : this.article.image.url;
  }

  // ボタンを押した時に表示したい詳細記事
  onClickButton(selected_article: ArticleInterface) {
    this.currentArticle = selected_article;
  }
}
</script>