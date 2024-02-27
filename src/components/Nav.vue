<script setup>
import {RouterLink, useRouter} from "vue-router"
import Container from "./Container.vue"
import {ref} from "vue"
import AuthModal from "./AuthModal.vue"
import {useUserStore} from "../stores/users"
import {storeToRefs} from "pinia"
const searchUsername = ref("")

const userStore = useUserStore()

const user = storeToRefs(userStore)

const router = useRouter()
const onSearch = () => {
    if(searchUsername.value == ' '){
        alert('Search field is empty')
    }
    if(searchUsername.value){
        router.push(`/profile/${searchUsername.value}`)
        searchUsername = ''
    }
}
const getUserProfile = () => {    
    router.push(`/profile/${user.user.value.username}`)
}
const handleLogout = async () => {
    await userStore.handleLogout()    
    router.push(`/`)
}
</script>
<template>
 <a-layout-header>    
    <a-menu      
      theme="dark"
      mode="horizontal"
      :style="{ lineHeight: '64px' }"
    >    
    <Container>
        <div class="left-content">
            <RouterLink to="/">
                <a-menu-item key="3">InstaNaija</a-menu-item>
            </RouterLink>    
            <a-input-search
            v-model:value="searchUsername"
            placeholder="Username..."
            style="width: 200px"
            @search="onSearch"
          />
        </div>
        <div class="right-content" v-if="user.user.value === null">
            <AuthModal :isLogin="true"/>
            <AuthModal :isLogin="false"/>
        </div>  
        <div class="right-content" v-else>
            <AButton type="primary" @click="getUserProfile">Profile</AButton>
            <AButton type="primary" @click="handleLogout">Logout</AButton>
        </div>                  
    </Container>    
    </a-menu>
  </a-layout-header>     
</template>
<style scoped>
.left-content a{
    font-size: 18px;
}
.left-content{
    display: flex;
    align-items: center;        
}
.right-content{
    display: flex;
    align-items: center;        
    column-gap: 20px;
}
</style>