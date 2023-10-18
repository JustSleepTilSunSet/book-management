<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/ShowBooks">當前圖書</router-link> |
      <router-link to="/UploadBookInfo">beta-新增圖書</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
@import '..\\node_modules\\bootstrap\\dist\\css\\bootstrap.css';
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.border-show {
  border: 2px solid black;
}

.card:hover {
  transform: scale(1.1);
  /* 放大到原始大小的 110% */
  -webkit-transform: scale(1.1);
}

.home-title-word {
  transform: scale(1.1);
  -webkit-transform: scale(1.1);
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
