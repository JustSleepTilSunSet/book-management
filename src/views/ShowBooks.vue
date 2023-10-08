<template>
  <div class="container  border-show center-div">
    <div>
      {{ newBookInfo }}
      {{ updatedNewBookInfo }}
    </div>
    <div class="row">
      <div class="col-sm-3">
        <div class="card border-show" style="width: 100%">
          <img class="card-img-top" src="../../src/assets/logo.png" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
              content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="card  border-show" style="width: 100%">
          <img class="card-img-top" src="../../src/assets/logo.png" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
              content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
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
      newBookInfo: '新書發表喔!'
    }
  },
  computed: {
    updatedNewBookInfo() {
      this.newBookInfo = this.$store.state.UploadBookInfo;
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
