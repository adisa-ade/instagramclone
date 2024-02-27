  <script setup>  
  import { ref } from 'vue';
  import { supabase } from '@/supabase';
  import { useUserStore } from '@/stores/users';
  import { storeToRefs } from 'pinia';

  const loading = ref(false)
  const errorMessage = ref("")
  const open = ref(false);
  const caption = ref("")
  const file = ref(null)
  const userStore = useUserStore()
  const {user} = storeToRefs(userStore)
  const props = defineProps(['addNewPost'])

  const showModal = () => {
    open.value = true;
  };
  
  const handleOk = async () => {    
    loading.value = true
    const fileName = Math.floor(Math.random() * 1000000000000)
    let filePath
    if(file.value){
      const {data, error} = await supabase.storage.from("profilepics").upload('public/' + fileName, file.value)
    if(error){      
      return errorMessage.value = "Unable to upload image"
    }
    filePath =  data.path
      if(data){
        await supabase.from("posts").insert({
        url: filePath,
        caption: caption.value,
        owner_id: user.value.id
      })
      }           
    }
    loading.value = false
    open.value = false;    
    props.addNewPost({
      url: filePath,
      caption: caption.value
    })
    caption.value = ""
  };

  const handleUploadChange = (e) => {    
    if (e.target.files[0]){
      file.value = e.target.files[0]    
    }    
  }
  </script>
  
  <template>
    <div>
      <a-button @click="showModal">Upload Photo</a-button>
      <a-modal v-model:open="open" title="Basic Modal" @ok="handleOk">
        <div v-if="!loading">
          <input type="file" accept=".jpeg, .png" @change="handleUploadChange"/>
        <a-input 
        v-model:value="caption"
        placeholder="Caption..."
        :maxLength="50"
        />
        </div>
        <div v-else class="spinner">
          <a-spin/>
        </div>
        <a-typography-text v-if="errorMessage" type="danger">{{errorMessage}}</a-typography-text>        
      </a-modal>
    </div>
  </template>
  <style scoped>
  input{
    margin-top: 10px;
  }
  .spinner{
    display:flex;
    align-items: center;
    justify-content: center;
    height: 120px;
  }
</style>