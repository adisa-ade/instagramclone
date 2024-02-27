<script setup>
  import { ref, reactive } from 'vue';
  import { useUserStore } from '@/stores/users';
  import {storeToRefs} from "pinia"
  const userStore = useUserStore()
  
  const {errorMessage, loading, user} = storeToRefs(userStore)

  const {isLogin} = defineProps(['isLogin'])

  const open = ref(false);
  
  const userCredentials = reactive({
    email: "",
    password: "",
    username: ""
  })
  const showModal = () => {
    open.value = true;
  };
  
  const cleareUserCredentialsInput = () => {
    userCredentials.usernmae = ""
    userCredentials.email = ""    
    userCredentials.password = ""
    userStore.clearErrorMessage()
  }
  
  const handleOk = async () => {  
    if(isLogin){      
    await userStore.handleLogin({
      password: userCredentials.password,
      email: userCredentials.email
    })
  }
    else{
      await userStore.handleSignup(userCredentials)
    }
  };

  const handleCancel= () => {
    cleareUserCredentialsInput()
    open.value = false
  }
  const title = isLogin ? 'Login' : 'SignUp'
  </script>
<template>
    <div>     
      <a-button type="primary" @click="showModal">{{isLogin ? 'Login' : 'SignUp'}}</a-button>
      <a-modal v-model:open="open" :title="title" @ok="handleOk" >
        <template #footer>
          <a-button v-model:open="open" key="back" @click="handleCancel">Cancel            
          </a-button>
          <a-button key="submit" type="primary" :disabled="loading" @click="handleOk">Submit
            </a-button>
          </template>
        <div v-if="!loading" class="modal-input">          
        <a-textarea v-if="!isLogin"
        v-model:value="userCredentials.username"
        placeholder="Username..."
        auto-size
      />
      <a-textarea
      v-model:value="userCredentials.email"
      placeholder="Email..."
      auto-size
    />    
  <a-space direction="vertical" style="width: 100%">
    <a-input-password 
      v-model:value="userCredentials.password"      
      placeholder="input password"      
    />    
  </a-space>
    <a-typography-text v-if="errorMessage" type="danger">{{errorMessage}}</a-typography-text>
    </div>
    <div v-else class="spinner">
      <a-spin />
    </div>
      </a-modal>      
    </div>    
  </template>
<style scoped>
.modal-input{
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}
.spinner{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
}
</style>