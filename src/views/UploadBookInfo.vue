<template>
    <div class="container  border-show center-div">
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm">書名</span>
        </div>
        <input type="text" id="book-name" v-model="bookName" class="form-control" aria-label="Small"
            aria-describedby="inputGroup-sizing-sm">
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm">簡介</span>
        </div>
        <input type="text" v-model="bookIntro" id="book-introduction" class="form-control" aria-label="Small"
            aria-describedby="inputGroup-sizing-sm">
        <button @click="SubmitAll" class="btn btn-primary" style="margin: auto;">Go somewhere</button>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'UploadBookInfo',
    data() {
        return {
            bookName: '',
            bookIntro: ''
        };
    },
    methods: {
        SubmitAll() {
            alert(`新增:
                    書名: ${this.bookName}
                    簡介: ${this.bookIntro}
                   完畢`);

            this.$store.commit('setBookInfo',{
                bookName:  this.bookName,
                bookIntro:  this.bookIntro
            });

        }
    }
});

</script>
