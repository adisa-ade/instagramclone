<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import Container from "./Container.vue"
import UserBar from "./UserBar.vue"
import ImageGalleryVue from "./ImageGallery.vue";
import {supabase} from "../supabase"
import {useRoute} from "vue-router"
import { useUserStore } from "@/stores/users";
import {storeToRefs} from "pinia"

const route = useRoute()
const loading = ref(false)
const user = ref(null)
const {username} = route.params
const posts = ref([])
const userStore = useUserStore()
const {user: loggedInUser} = storeToRefs(userStore)
const isFollowing = ref(false)
const userInfo = reactive({
    posts: null,
    followers: null,
    following: null
})

const addNewPost = (post) => {
    posts.value.unshift(post)
}
const updateIsFollowing = (follow) => {
    isFollowing.value = follow
}
const fetchData = async () => {
     loading.value = true
    const {data: userData} = await supabase
    .from("users")
    .select()
    .eq('username', username)
    .single()

         
    if (!userData){   
        loading.value = false
        return  user.value = null
    }    
    
    user.value = userData        
    
    const {data: postsData} =  await supabase
    .from("posts")
    .select()
    .eq("owner_id", user.value.id)
    posts.value = postsData     
    await fetchIsFollowing()
    const followerCount = await fetchFollowersCount()
    const followingCount = await fetchFollowingCount ()
    userInfo.followers = followerCount
    userInfo.following= followingCount
    userInfo.posts = posts.value.length
    loading.value = false
}

const fetchFollowersCount = async () => {
    const {count} = await supabase
     .from("followers_following")
     .select('*', {count: 'exact'})
     .eq("following_id", user.value.id)
     return count
}

const fetchFollowingCount = async () => {
    const {count} = await supabase
     .from("followers_following")
     .select('*', {count: 'exact'})
     .eq("follower_id", user.value.id)
     return count
}


const fetchIsFollowing = async () =>{
    if(loggedInUser.value && (loggedInUser.value.id !== user.value.id)){
    const {data} = await supabase
    .from("followers_following")
    .select()
    .eq("follower_id", loggedInUser.value.id) 
    .eq("following_id", user.value.id)
    .single()
        if(data) isFollowing.value = true
    }
    
}
watch(loggedInUser, () => {
    fetchData()
})
onMounted(() => {
    fetchData()
})
</script>
<template>        
    <Container>                           
        <div class="profile-container" v-if="!loading">        
        <UserBar
        :key="$route.params.username"
        :user="user"
        :userInfo="userInfo"
        :addNewPost = "addNewPost"
        :isFollowing = "isFollowing"
        :updateIsFollowing = "updateIsFollowing"
        />            
        <ImageGalleryVue :posts="posts"
        />            
        </div>            
    <div class="spinner" v-else>
        <a-spin/>
    </div>
    </Container>    
</template>
<style scoped>
.profile-container{    
    padding: 20px 0;    
}
container{
    position: relative;    
}
.spinner{            
    position: absolute;
    left: 50%;
    top: 50%;
  }  
</style>