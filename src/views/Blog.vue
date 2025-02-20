<template>
  <div>
    <h1>Blog Posts</h1>
    <CreatePost @add-post="addPost" />
    <BlogList :posts="posts" @delete-post="deletePost" />
  </div>
</template>

<script>
import BlogList from '../components/BlogList.vue';
import CreatePost from '../components/CreatePost.vue';

export default {
  components: { BlogList, CreatePost },
  data() {
    return {
      posts: []
    };
  },
  methods: {
    addPost(newPost) {
      this.posts.push(newPost);
    },
    deletePost(id) {
      this.posts = this.posts.filter(post => post.id !== id);
    }
  }
};
</script>
