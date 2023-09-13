<template>
    <div class="app">
        <h1>
            Page with posts
        </h1>

        <my-input v-model="searchQuery" placeholder="Search..."></my-input>

        <div class="app_buttons">
            <my-button @click="showDialog">Create post</my-button>
            <my-select v-model="selectedSort" :options="sortOptions"></my-select>
        </div>
        
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost"/>
        </my-dialog>
        <post-list v-if="!isPostLoading" :posts="sortedAndSearchedPosts" @remove="removePost"/>
        <div v-else>Loading.......</div>
        <div class="page__wrapper">
            <div 
                v-for="pageNumber in totalPage" 
                :key="pageNumber" class="page" 
                :class="{'current_page': page === pageNumber}"
                @click="changePage(pageNumber)"
            >
                {{ pageNumber }}
            </div>
        </div>
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MySelect from '@/components/UI/MySelect.vue';
import MyButton from '@/components/UI/MyButton';
import MyDialog from '@/components/UI/MyDialog';
import axios from 'axios';
import MyInput from '@/components/UI/MyInput.vue';

export default {

    components: {
    PostForm,
    PostList,
    MySelect,
    MyButton,
    MyInput,
    MyDialog,
},

    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostLoading: false,
            selectedSort: '',
            page: 1,
            limit: 10,
            totalPage: 0,
            sortOptions: [
                {value: 'title', name: 'By title'},
                {value: 'body', name: 'By body'},
            ],
            searchQuery: '',
        }
    },

    methods: {
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id);
        },
        showDialog() {
            this.dialogVisible = true;
        },
        async fetchPosts() {
            try {
                this.isPostLoading = true;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_', {
                    params: {
                        _page: this.page,
                        _limit: this.limit,
                    }
                });
                this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit);
                this.posts = response.data;
            } catch (error) {
                alert('Error');
            } finally {
                this.isPostLoading = false;
            };
        },
        changePage(pageNumber) {
            this.page =pageNumber;
        }
    },

    mounted() {
        this.fetchPosts();
    },

    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => {
                return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]); 
            });
        },

        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
        },
    
    },
    watch: {
        page(newValue, oldValue) {
            this.fetchPosts();
        }
    },
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    padding: 20px;
}

.app_buttons {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}

.page__wrapper {
    display: flex;
    margin-top: 15px;
}

.page {
    border: 1px solid black;
    padding: 10px;
}

.current_page {
    border: 2px solid teal;
}
</style>
