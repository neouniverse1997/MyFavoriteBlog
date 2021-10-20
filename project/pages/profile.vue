<template>
  <v-row>
    <div class="outer">
      <div class="cent">
        <h1>私のプロフィール</h1>
        <ul>
          <li class="navy-color">野球好き</li>
          <li>バットしない大学院生</li>
        </ul>
        <div class="right-text">
          <a href="https://nuxtjs.org">next page</a>
        </div>
      </div>
    </div>
    <!-- <v-col cols="12" sm="8" md="6" lg="4" xl="3" style="background-color: #FFCDD2">column 1</v-col> -->
  </v-row>
</template>

<style scoped lang="scss">
/* これは CSS コメントです
複数行に分割できます。 
以下のテンプレートごとに分割しましょう */

/* || 一般的なスタイル */

ul {
  //   1emの大きさはブラウザーのfont-sizeのデフォルト値
  margin: 3em 3em 3em 3em;
}

li {
  font-size: 20px;
  color: black;
  text-align: left;
  line-height: 2;
  letter-spacing: 1px;
}

ul li:first-child {
  font-weight: 700;
}

h1 {
  font-size: 30px;
  color: #375e97;
  border-bottom: 1px solid #375e97;
  text-align: center;
}

a::after {
  content: " ➥";
}

a:link {
  color: red;
}

a:visited {
  color: orange;
}

a:hover {
  text-decoration: none;
}

/* || ユーティリティ */

/*  || サイトワイド */

.outer {
  border: 5px solid black;
}

.cent {
  padding: 40px 40px 40px 40px;
  margin: 0px 0px 0px 0px;
  background-color: white;
}

.right-text {
  text-align: right;
}

li.navy-color {
  color: navy;
}
</style>