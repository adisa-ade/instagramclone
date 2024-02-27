<script setup>
import {ref} from "vue"
import Container from "./Container.vue"
import UserBar from "./UserBar.vue"
import ImageGalleryVue from "./ImageGallery.vue";
const posts = ref([])
const addNewPost = (post) => {
    posts.value.unshift(post)
}
</script>
<template>    
    
    <Container>
        <div class="profile-container">
        <UserBar
        :key="$route.params.username"
        userName="adisa"
        :userInfo="{
            posts: 5,
            followers: 50000,
            following: 2,
        }"
        :addNewPost="addNewPost"
        />            
        <ImageGalleryVue :posts="posts"
        />            
        </div>
    </Container>
</template>
<style scoped>
.profile-container{    
    padding: 20px 0;    
}
</style>