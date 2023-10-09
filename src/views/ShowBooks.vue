<template>
  <div class="container  border-show center-div">
    {{ getBookInfo }}
    <div class="row">
      <div class="col-sm-3" v-for="item of newBookList">
        <div class="card  border-show" style="width: 100%">
          <img class="card-img-top" src="../../src/assets/logo.png" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">{{ item.bookName }}</h5>
            <p class="card-text">{{ item.bookIntro }}</p>
            <a href="#" class="btn btn-primary">我想購買</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      newBookList: [] as Array<any>
    }
  },
  computed: {
    getBookInfo() {
      this.newBookList = this.$store.getters.getbookInfo;
    }
  }, methods: {
    showBook(bookInfo: any) {
      let bookCard = `
        <div class="card  border-show" style="width: 100%">
          <img class="card-img-top" src="../../src/assets/logo.png" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${bookInfo.bookName}</h5>
            <p class="card-text">${bookInfo.bookIntro}</p>
            <a href="#" class="btn btn-primary">我想購買</a>
          </div>
        </div>
      `
      return bookCard
    }
  }
});
</script>

<style lang="scss">
.btn {
  // for Gosomewhere button
  display: block;
  margin: auto;
}
</style>
