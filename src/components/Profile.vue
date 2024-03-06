<script setup>
import { ref, onMounted } from 'vue'
import Container from "./Container.vue"
import UserBar from "./UserBar.vue"
import ImageGalleryVue from "./ImageGallery.vue";
import {supabase} from "../supabase"
import {useRoute} from "vue-router"

const route = useRoute()
const loading = ref(false)
const user = ref(null)
const {username} = route.params
const posts = ref([])

const addNewPost = (post) => {
    posts.value.unshift(post)
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
    loading.value = false
}

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