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
        <div class="col-sm-3" v-for="(item, index) of  showBookList " :key="index">
          <div class="card  border-show" style="width: 100%">
            <img v-if="item.bookCover" :src="item.bookCover" style="margin: auto;height:30%;width:30%;">
            <h2 v-else>The book haven't cover.😢</h2>
            <div class="card-body">
              <h5 class="card-title">{{ item.bookName }}</h5>
              <p class="card-text">{{ item.bookIntro }}</p>
              <p class="card-text">類型: {{ item.selectedCategory }}</p>
              <p class="card-text" v-if="item.ratingCount > 0">當前評分: {{
                parseFloat((item.bookRatingValue / item.ratingCount) + "").toFixed(2) }} ({{
    item.ratingCount }})</p>
              <p class="card-text" v-else>當前評分: 0 (0)</p>
              <p>我來評價(點擊星星來評分;雙擊後送出評分):</p>
              <div id="ratingboard" style="margin: auto; height: auto;width: 40%" @mouseleave="MouseLeave($event, item)">
                <span :id=item.bookRating[0].id style="" class="fa fa-star"
                  :class="{ checked: item.bookRating[0].isChecked }" @click="ClickStar($event, item)"
                  @dblclick="ClickRating(item)" v-touch:touchhold="() => { TouchRating(item); }"></span>
                <span :id=item.bookRating[1].id style="" class="fa fa-star"
                  :class="{ checked: item.bookRating[1].isChecked }" @click="ClickStar($event, item)"
                  @dblclick="ClickRating(item)" v-touch:touchhold="() => { TouchRating(item); }"></span>
                <span :id=item.bookRating[2].id style="" class="fa fa-star"
                  :class="{ checked: item.bookRating[2].isChecked }" @click="ClickStar($event, item)"
                  @dblclick="ClickRating(item)" v-touch:touchhold="() => { TouchRating(item); }"></span>
                <span :id=item.bookRating[3].id style=";" class="fa fa-star"
                  :class="{ checked: item.bookRating[3].isChecked }" @click="ClickStar($event, item)"
                  @dblclick="ClickRating(item)" v-touch:touchhold="() => { TouchRating(item); }"></span>
                <span :id=item.bookRating[4].id style="" class="fa fa-star"
                  :class="{ checked: item.bookRating[4].isChecked }" @click="ClickStar($event, item)"
                  @dblclick="ClickRating(item)" v-touch:touchhold="() => { TouchRating(item); }"></span>
              </div>
              <a href="#" class="btn btn-primary" style="margin-top: 5%;" @click="ClickPurchased">我想購買</a>
              <a :href="item.eBookBytes" class="btn btn-primary" style="margin-top: 5%;"
                @click="ClickDownloadeBook(item)">下載電子預覽</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Vue2TouchEvents from 'vue2-touch-events';
import axios from 'axios';

Vue.use(Vue2TouchEvents)
export default Vue.extend({
  data() {
    return {
      showBookList: [] as Array<any>,
      allBookList: [] as Array<any>,
      searchKeyWord: "" as string,
      ratingMax: 5
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
    TouchRating(item: any) {
      if (confirm("送出評分嗎?")) {
        let idx = this.showBookList.findIndex((e) => e.bookId == item.bookId);
        let total = 0 as number;
        this.showBookList[idx].bookRating.map((e) => {
          total += e.isChecked ? 1 : 0;
        })
        this.showBookList[idx].bookRatingValue = this.showBookList[idx].bookRatingValue + total;
        this.showBookList[idx].ratingCount++;
        this.$store.commit('updateBookList', this.allBookList);
      }
    },
    ClickRating(item: any) {
      if (confirm("送出評分嗎?")) {
        let idx = this.showBookList.findIndex((e) => e.bookId == item.bookId);
        let total = 0 as number;
        this.showBookList[idx].bookRating.map((e) => {
          total += e.isChecked ? 1 : 0;
        })
        this.showBookList[idx].bookRatingValue = this.showBookList[idx].bookRatingValue + total;
        this.showBookList[idx].ratingCount++;
        this.$store.commit('updateBookList', this.allBookList);
      }
    },
    MouseLeave(e: any, item: any) {
      for (let start = 0; start < this.ratingMax; start++) {
        item.bookRating[start].isChecked = false;
      }
    },
    ClickStar(e: any, item: any) {
      let starIdx = e.target.id.split('-')[1].split('_')[1];
      for (let start = 0; start < this.ratingMax; start++) {
        item.bookRating[start].isChecked = start <= starIdx;
      }
    },
    ClickPurchased() {
      alert("The function never be released.");
    },
    ClickDownloadeBook(item: any) {
      let iframe = "<iframe width='100%' height='100%' src='" + item.eBookBytes + "'></iframe>"
      let showWindow = window.open() as Window;
      showWindow.document.open();
      showWindow.document.write(iframe);
      showWindow.document.close();
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

.checked {
  color: orange;
}
</style>
