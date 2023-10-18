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
            <img style="margin: auto;height:10%;width:10%;" v-if="item.bookCover" :src="item.bookCover">
            <h2 v-else>The book haven't cover.😢</h2>
            <div class="card-body">
              <h5 class="card-title">{{ item.bookName }}</h5>
              <p class="card-text">{{ item.bookIntro }}</p>
              <p class="card-text">當前評分: {{ item.bookRatingValue }}</p>
              <p>我來評價(點擊星星來評分;雙擊後送出評分):</p>
              <div id="ratingboard" style="margin: auto; height: auto;width: 40%" @mouseleave="MouseLeave($event, item)">
                <span :id=item.bookRating[0].id style="" class="fa fa-star"
                  :class="{ checked: item.bookRating[0].isChecked }"
                  @click="ClickStar($event, item)" @dblclick="SubmitRating"></span>
                <span :id=item.bookRating[1].id style="" class="fa fa-star"
                  :class="{ checked: item.bookRating[1].isChecked }" @touchstart="TouchStart($event, item)"
                  @click="ClickStar($event, item)" @dblclick="SubmitRating" v-touch:touchhold="SubmitRating"></span>
                <span :id=item.bookRating[2].id style="" class="fa fa-star"
                  :class="{ checked: item.bookRating[2].isChecked }" @touchstart="TouchStart($event, item)"
                  @click="ClickStar($event, item)" @dblclick="SubmitRating" v-touch:touchhold="SubmitRating"></span>
                <span :id=item.bookRating[3].id style=";" class="fa fa-star"
                  :class="{ checked: item.bookRating[3].isChecked }" @touchstart="TouchStart($event, item)"
                  @click="ClickStar($event, item)" @dblclick="SubmitRating" v-touch:touchhold="SubmitRating"></span>
                <span :id=item.bookRating[4].id style="" class="fa fa-star"
                  :class="{ checked: item.bookRating[4].isChecked }" @touchstart="TouchStart($event, item)"
                  @click="ClickStar($event, item)" @dblclick="SubmitRating" v-touch:touchhold="SubmitRating"></span>
              </div>
              <a href="#" class="btn btn-primary" style="margin-top: 5%;">我想購買</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Vue2TouchEvents from 'vue2-touch-events'

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
    SubmitRating() {
      confirm("送出評分嗎?");
    },
    MouseLeave(e: any, item: any) {
      console.log('超出範圍');
      for (let start = 0; start < this.ratingMax; start++) {
        item.bookRating[start].isChecked = false;
      }
    },
    TouchStart(e: any, item: any) {
      e.preventDefault();
      let starIdx = e.target.id.split('-')[1].split('_')[1];
      for (let start = 0; start < this.ratingMax; start++) {
        item.bookRating[start].isChecked = start <= starIdx;
      }
    },
    ClickStar(e: any, item: any) {
      let starIdx = e.target.id.split('-')[1].split('_')[1];
      for (let start = 0; start < this.ratingMax; start++) {
        item.bookRating[start].isChecked = start <= starIdx;
      }
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
