<template>
  <div>
    <nav class="navbar navbar-light bg-light" style="width:15%; margin-left: auto; margin-right: 5%;">
      <form class="form-inline" style="margin-right: auto; margin-left: auto;">
        <input class="form-control mr-sm-2" v-model="searchKeyWord" type="search" placeholder="Search"
          aria-label="Search">
      </form>
    </nav>
    <div class="container  border-show center-div">
      {{ getBookInfo }}
      <div class="row">
        <div class="col-sm-3" v-for="item of showBookList">
          <div class="card  border-show" style="width: 100%">
            <img style="margin-left: auto;height:100px;width=150px;margin-right: auto;" v-if="item.bookCover"
              :src="item.bookCover">
            <h1 v-else>The book haven't cover.😢</h1>
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
      if (this.searchKeyWord.length > 0) {
        this.showBookList = this.showBookList.filter((bookObj: any) => {
          return bookObj.bookName.includes(this.searchKeyWord);
        })
      } else {
        this.showBookList = this.allBookList;
      }
    }
  },
  methods: {
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
