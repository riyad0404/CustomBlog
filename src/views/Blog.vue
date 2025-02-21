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
    async fetchPosts() {
      const response = await fetch('http://localhost:5000/posts');
      this.posts = await response.json();
    },
    async addPost(newPost) {
      const response = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      });
      const createdPost = await response.json();
      this.posts.push(createdPost);
    },
    async deletePost(id) {
      await fetch(`http://localhost:5000/posts/${id}`, { method: 'DELETE' });
      this.posts = this.posts.filter(post => post.id !== id);
    }
  },
  mounted() {
    this.fetchPosts();
  }
};
</script>
