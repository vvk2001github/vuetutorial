<template>
    <div class="app">
        <form>
            <h4>Create post...</h4>
            <input v-model="title" class="input" type="text" placeholder="Title">
            <input v-model="body" class="input" type="text" placeholder="Description">
            <button class="btn" @click.prevent="createPost">Create</button>
        </form>
        <div :key="post.id" class="post" v-for="post in posts">
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
            ],
            title: '',
            body: '',
        }
    },

    methods: {
        createPost() {
            const newPost = {
                id: Date.now(),
                title: this.title,
                body: this.body,
            };
            this.posts.push(newPost);
            this.title = '';
            this.body = '';
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

form {
    display: flex;
    flex-direction: column;
}

.btn {
    margin-top: 15px;
    align-self: flex-end;
    padding: 10px 15px;
    background: none;
    color: teal;
    border: 1px solid teal;
}

.post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
}

.input {
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top: 15px;
}
</style>
