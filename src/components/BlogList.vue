<template>
  <div>
    <h2>All Blog Posts</h2>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
        <button @click="deletePost(post.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  props: ['posts'],
  methods: {
    deletePost(id) {
      this.$emit('delete-post', id);
    }
  }
};
</script>
