<template>
  <v-app>
    <v-row>
      <div class="white-outer">
        <div class="black-box">
          <div>
            <h1>
              Grateful Days
              <span class="title">/Dragon Ash(1999)</span>
            </h1>
          </div>
          <div class="lyric">
            <p>俺は東京生まれHIPHOP育ち</p>
            <p>悪そうな奴は大体友達</p>
            <p>悪そうな奴と大体同じ</p>
            <p>裏の道</p>
            <p>歩き見てきたこの街</p>
          </div>
        </div>
      </div>
    </v-row>
  </v-app>
</template>

<style scoped lang="scss">
/* これは CSS コメントです
複数行に分割できます。 */

/* || 一般的なスタイル */

h1 {
  font-size: 30px;
  color: white;
  border-bottom: 1px solid white;
  text-align: center;
}

/* || ユーティリティ */

.white-outer {
  border: 5px solid white;
}

.lyric {
  border: 2px solid white;
  list-style: none;
  display: block;
  padding: 1em;
  margin: 2em;
}

.lyric > p {
  color: yellow;
}

.inline-box {
  border: 2px solid white;
}

.block li {
  border: 2px solid navy;
  padding: 2em;
}

.black-box {
  padding: 40px 40px 40px 40px;
  margin: 0px 0px 0px 0px;
  background-color: black;
}

.title {
  font-size: 20px;
}

.block {
  display: block;
}
</style>
