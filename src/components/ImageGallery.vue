<script setup>
    const props = defineProps(['posts'])
</script>
<template>
    <div class="image-gallery-container">
        <img 
        v-for="post in props.posts"
        :key="post.id"
        :src="post.url" 
        alt=""
        >
    </div>
</template>
<style scoped>
.image-gallery-container{
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
}
</style>