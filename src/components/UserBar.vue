<script setup>
const props = defineProps (['userName', 'userInfo', 'addNewPost'])    
import UploadPhotoModal from "./UploadPhotoModal.vue"
import {useRoute} from "vue-router"
import { useUserStore } from "@/stores/users";
import { storeToRefs } from "pinia";
    const route = useRoute()    
    const userStore = useUserStore()
    const {user} = storeToRefs(userStore)    
    const {username: profileUserName} = route.params  
</script>
<template>
    <div class="user-container">
    <div class="top-content">
        <a-typography-title :level="1">{{props.userName.toUpperCase()}}</a-typography-title>  
        <UploadPhotoModal v-if="user && profileUserName === user.username" :addNewPost="addNewPost"/>
    </div>
    <div class="bottom-content">
        <a-typography-title :level="5" style="margin:0; font-size:20px;">{{props.userInfo.posts}} Post</a-typography-title>
        <a-typography-title :level="5" style="margin:0; font-size:20px;">{{props.userInfo.followers}} Followers</a-typography-title>
        <a-typography-title :level="5" style="margin:0; font-size:20px;">{{props.userInfo.following}} Following</a-typography-title>
    </div>
    </div>            
</template>
<style scoped>
.top-content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1024px;    
}
.bottom-content{
    display: flex;     
    column-gap: 20px;  
}
</style>