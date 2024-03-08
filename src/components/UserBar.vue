<script setup>
const props = defineProps (['user', 'userInfo', 'addNewPost', 'isFollowing', 'updateIsFollowing'])    
import UploadPhotoModal from "./UploadPhotoModal.vue"
import {useRoute} from "vue-router"
import { useUserStore } from "@/stores/users";
import { storeToRefs } from "pinia";
import {supabase} from "../supabase"
    const route = useRoute()    
    const userStore = useUserStore()
    const {user} = storeToRefs(userStore)        
    const {username: profileUserName} = route.params  
    
    const followUser = async () => {
        props.updateIsFollowing(true)
        await supabase.from("followers_following").insert({
            follower_id: user.value.id,
            following_id: props.user.id
        })
    }
    const unFollowUser = async () => {
        props.updateIsFollowing(false)
        await supabase.from("followers_following")
        .delete()
        .eq("follower_id", user.value.id)
        .eq("following_id", props.user.id)
    }
</script>
<template>
    <div class="user-container" v-if="props.user">
    <div class="top-content">
        <a-typography-title :level="1">{{props.user.username.toUpperCase()}}</a-typography-title>  
        <div v-if="user">
            <UploadPhotoModal v-if="profileUserName === user.username" :addNewPost="addNewPost"/>
            <div v-else>
                <a-button v-if="!props.isFollowing" @click="followUser">Follow</a-button>
                <a-button v-else @click="unFollowUser">Following</a-button>
            </div>
        </div>
    </div>
    <div class="bottom-content">
        <a-typography-title :level="5" style="margin:0; font-size:20px;">{{props.userInfo.posts}} Post</a-typography-title>
        <a-typography-title :level="5" style="margin:0; font-size:20px;">{{props.userInfo.followers}} Followers</a-typography-title>
        <a-typography-title :level="5" style="margin:0; font-size:20px;">{{props.userInfo.following}} Following</a-typography-title>
    </div>
    </div>           
    <div class="user-container" v-else>
        <div class="top-content">
        <a-typography-title :level="1">User Not Found</a-typography-title>          
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