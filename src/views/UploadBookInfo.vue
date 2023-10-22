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
            <span class="input-group-text" id="inputGroup-sizing-sm">類型</span>
        </div>
        <div class="dropdown">
            <button type="button" class="btn btn-info" @click="showCategory">{{ CategoryObj.categoryText }}</button>
            <div class="dropdown-content" v-if="CategoryObj.isShow">
                <p @click="selectOption($event)">科幻</p>
                <p @click="selectOption($event)">懸疑</p>
                <p @click="selectOption($event)">日常</p>
            </div>
            <div v-if="selectedCategory == null">未選擇</div>
            <div v-else>{{ selectedCategory }}</div>
        </div>
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm">封面</span>
        </div>
        <input type="file" id="book-cover" @change="UploadImage" class="form-control" aria-label="Small"
            aria-describedby="inputGroup-sizing-sm">
        <button @click="SubmitAll" class="btn btn-primary" style="margin: auto;">新建圖書</button>
        <h5>書圖預覽:</h5>
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
            bookId: this.$store.getters.getBookIdx as number,
            bookRatingValue: 0 as number,
            CategoryObj: { isShow: false, categoryText: "點選類型" },
            selectedCategory: null
        };
    },
    methods: {
        showCategory() {
            this.CategoryObj.isShow = !this.CategoryObj.isShow;
            this.CategoryObj.categoryText = this.CategoryObj.isShow ? "收起選單" : "點選類型";
        },
        selectOption(e: any) {
            this.CategoryObj.isShow = !this.CategoryObj.isShow;
            this.selectedCategory = e.target.innerText;

        },
        SubmitAll() {
            let bookObj = {
                bookId: `book_${this.$store.getters.getBookIdx}`,
                bookName: this.bookName,
                bookIntro: this.bookIntro,
                bookCover: this.imageBytes, // base64
                bookRatingValue: this.bookRatingValue,
                bookRating: [] as Array<any>,
                ratingCount: 0, // 收到評分數
                selectedCategory: this.selectedCategory == null ? "未分類" : this.selectedCategory
            };
            for (let idx = 0; idx < 5; idx++) {
                bookObj.bookRating.push(
                    {
                        id: `book_${this.$store.getters.getBookIdx}-star_${idx}`,
                        class: `fa fa-star`,
                        isChecked: false
                    }
                )
            }
            this.$store.commit('setBookInfo', bookObj);
            this.$store.commit('updateBookIdx');
            alert(`新增:
                    書名: ${this.bookName}
                    簡介: ${this.bookIntro}
                    封面: ${this.imageBytes.length > 0 ? '已經上傳' : '未上傳'}
                   完畢`);
            this.imageBytes = '' as string;
            this.selectedCategory = null;
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
