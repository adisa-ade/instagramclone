<script setup>
    const props = defineProps(['posts'])
</script>
<template>
    <div class="image-gallery-container">
        <img 
        v-for="post in props.posts"
        :key="post.id"
        :src="`https://sbkvvjrkfojvcshpmugo.supabase.co/storage/v1/object/public/profilepics/${post.url}`"
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
img{
    width: 200px;
}
</style>