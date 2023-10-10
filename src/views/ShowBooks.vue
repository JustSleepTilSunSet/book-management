<template>
  <div>
    <nav class="navbar navbar-light bg-light" style="width:15%; margin-left: auto; margin-right: 5%;">
      <form class="form-inline" style="margin-right: auto; margin-left: auto;">
        <input class="form-control mr-sm-2" v-model="searchKeyWord" type="search" placeholder="Search"
          aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </nav>
    <div class="container  border-show center-div">
      {{ getBookInfo }}
      <div class="row">
        <div class="col-sm-3" v-for="item of showBookList">
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
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      showBookList: [] as Array<any>,
      allBookList: [] as Array<any>,
      searchKeyWord: "" as string
    }
  },
  computed: {
    getBookInfo() {
      this.showBookList = this.$store.getters.getbookInfo;
      this.allBookList = this.$store.getters.getbookInfo;
      if (this.searchKeyWord.length > 0){
        this.showBookList = this.showBookList.filter(({bookName})=>{
          return bookName.includes(this.searchKeyWord);
        })
      }else{
        this.showBookList = this.allBookList;
      }
    }
  },
  methods: {
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
