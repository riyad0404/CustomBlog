<template>
  <div>
    <h2>Create a New Post</h2>
    <form @submit.prevent="submitPost">
      <input v-model="title" placeholder="Title" required />
      <textarea v-model="content" placeholder="Content" required></textarea>
      <button type="submit">Publish</button>
    </form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      title: '',
      content: ''
    };
  },
  methods: {
    submitPost() {
      if (this.title && this.content) {
        this.$emit('add-post', {
          id: Date.now(),
          title: this.title,
          content: this.content
        });
        this.title = '';
        this.content = '';
      }
    }
  }
};
</script>
