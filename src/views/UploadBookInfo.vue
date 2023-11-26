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
                <div :id="`tag${index}`" style="cursor: pointer;" :class="{ selected: category.isSelected }"
                    @touchend="cancelCategory($event, index)" @touchstart="getCategory($event, index)"
                    @mouseenter="getCategory($event, index)" @mouseleave="cancelCategory($event, index)"
                    v-for="(category, index) in CategoryList" @click="selectOption($event, index)">{{ category.name }}
                </div>
            </div>
            <div v-if="selectedCategory == null">未選擇</div>
            <div v-else style="cursor: pointer;">{{ selectedCategory }}</div>
        </div>
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm">封面</span>
        </div>
        <input type="file" id="book-cover" @change="UploadImage" class="form-control" aria-label="Small"
            aria-describedby="inputGroup-sizing-sm">
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm">電子書</span>
        </div>
        <input type="file" id="book-eletric" @change="UploadPdf" class="form-control" aria-label="Small"
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
            CategoryList: [{ isSelected: false, name: "科幻" }, { isSelected: false, name: "懸疑" }, { isSelected: false, name: "日常" }],
            CategoryObj: { isShow: false, categoryText: "點選類型", isSelected: false },
            selectedCategory: null,
            eBookBytes: '' as string,
        };
    },
    methods: {
        cancelCategory(e: any, index: number) {
            this.CategoryList[index].isSelected = false;
        },
        getCategory(e: any, index: number) {
            this.CategoryList[index].isSelected = true;
        },
        showCategory() {
            this.CategoryObj.isShow = !this.CategoryObj.isShow;
            this.CategoryObj.categoryText = this.CategoryObj.isShow ? "收起選單" : "點選類型";
            for (let category of this.CategoryList) {
                category.isSelected = false;
            }
        },
        selectOption(e: any, index: number) {
            this.CategoryObj.isShow = !this.CategoryObj.isShow;
            this.CategoryList[index].isSelected = true;
            this.selectedCategory = e.target.innerText;
            this.CategoryObj.categoryText = "點選類型";

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
                selectedCategory: this.selectedCategory == null ? "未分類" : this.selectedCategory,
                eBookBytes: this.eBookBytes
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
            let fileExtension = file?.name.split('.')[file?.name.split('.').length - 1];
            if (fileExtension != 'jpeg') {
                alert("The uploaded not image.");
                target.value = ""; // Recover the content of component to default status.
            } else {
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
        },
        async UploadPdf(event: any) {
            let target = (event.target as HTMLInputElement);
            let file = target?.files?.[0];
            let fileExtension = file?.name.split('.')[file?.name.split('.').length - 1];
            if (fileExtension != 'pdf') {
                alert("The uploaded not pdf.");
                target.value = ""; // Recover the content of component to default status.
            } else {
                this.eBookBytes = await this.readAsDataURL(file);
            }
        },
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

.selected {
    background-color: antiquewhite;
}
</style>
