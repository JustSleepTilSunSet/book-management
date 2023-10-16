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
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm">封面</span>
        </div>
        <input type="file" id="book-cover" @change="UploadImage" class="form-control" aria-label="Small"
            aria-describedby="inputGroup-sizing-sm">
        <button @click="SubmitAll" class="btn btn-primary" style="margin: auto;">新建圖書</button>
        <h5>預覽:</h5>
        <img v-if="imageBytes" :src="imageBytes" alt="DefaultCover" height="100px" width="150px">

    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'UploadBookInfo',
    data() {
        return {
            bookName: '',
            bookIntro: '',
            imageBytes: '' as string,
            bookId: 0 as number
        };
    },
    methods: {
        SubmitAll() {
            alert(`新增:
                    書名: ${this.bookName}
                    簡介: ${this.bookIntro}
                   完畢`);

            this.$store.commit('setBookInfo', {
                bookId: `book_${this.bookId}`,
                bookName: this.bookName,
                bookIntro: this.bookIntro,
                bookCover: this.imageBytes // base64
            });
            this.bookId ++;
            this.imageBytes = '' as string;
        },
        async UploadImage(event: any) {
            let target = (event.target as HTMLInputElement);
            let file = target?.files?.[0];
            if (file) {
                this.imageBytes = await this.readAsDataURL(file);
            }
        },
        async readAsDataURL(file: any) {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader?.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }
    }
});

</script>
