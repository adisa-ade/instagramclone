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
    margin: 20px 0;
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    gap: 28px;
}
img{
    width: 235px;
    height: 230px;
    object-fit: cover;    
    cursor: pointer;    
    border-radius: 10px;
}
img:hover{
    transform: scale(1.1);
    transition: 0.5s ease-in;
}
</style>