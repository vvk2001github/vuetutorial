<template>
    <div>
        <div :key="index" class="post" v-for="(post, index) in posts">
            <div><strong>Title: </strong>{{ post.title }}</div>
            <div><strong>Description: </strong>{{ post.body }}</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            posts: [
                {id: 1, title: 'Title1', body: 'Post number 1'},
                {id: 2, title: 'Title2', body: 'Post number 2'},
                {id: 3, title: 'Title3', body: 'Post number 3'},
            ]
        }
    },

    methods: {
        
    },
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
}
</style>
