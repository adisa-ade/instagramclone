import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("users", () => {
  const user = ref(null);
  const errorMessage = ref("");
  const loading = ref(false);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
// LOGIN 
  const handleLogin = async (credentials) => {    
    const { email, password } = credentials;

    if (!validateEmail(email)) {
      return (errorMessage.value = "Invalid email");
    }
    if (!password.length) {
      return (errorMessage.value = "Password cannot be empty");
    }

    loading.value = true;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      loading.value = false;
      return (errorMessage.value = error.message);
    }
    const { data: existingUser } = await supabase
      .from("users")
      .select()
      .eq("email", email)
      .single();

    user.value = {
      id: existingUser.id,
      email: existingUser.email,
      username: existingUser.username,
    };
    loading.value = false;
    return errorMessage.value = '';
  };

  // SIGNUP
  const handleSignup = async (credentials) => {    
    const { email, password, username } = credentials;
    if (username.length < 4) {
      return (errorMessage.value = "Username length is too short");
    }

    if (!validateEmail(email)) {
      return (errorMessage.value = "Invalid email");
    }

    if (password.length < 4) {
      return (errorMessage.value = "Password length is too short");
    }

    loading.value = true;
    const { data: userAlreadyRegistered } = await supabase
      .from("users")
      .select()
      .eq("username", username)
      .single();

    if (userAlreadyRegistered) {
      loading.value = false;
      return (errorMessage.value = "User Already Registered");
    }

    errorMessage.value = "";
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      loading.value = false;
      return (errorMessage.value = error.message);
    }

    await supabase.from("users").insert({
      email,
      username,
    });

    const { data: newUser } = await supabase
      .from("users")
      .select()
      .eq("email", email)
      .single();

    user.value = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    };

    loading.value = false;
  };
  // CLEARS ANY ERROR MESSAGE IN MODAL
  const clearErrorMessage = () => {
    errorMessage.value = "";
  };
  // HANDLES USER STATE
  const getUser = async () => {
    loading.value = true;
    const {data} = await supabase.auth.getUser()

    if(!data.user){
      loading.value = false
      return user.value = null         
    }
    const {data: userWithEmail} = await supabase
    .from("users")
    .select()
    .eq("email", data.user.email)
    .single();

    user.value ={
      id: userWithEmail.id,  
      username: userWithEmail.username,
      email: userWithEmail.email
    }

    loading.value = false
  };

  const handleLogout = async () => {
    await supabase.auth.signOut()
    return user.value = null
  };

  return {
    user,
    loading,
    errorMessage,
    user,
    handleLogin,
    handleSignup,
    clearErrorMessage,
    getUser,
    handleLogout,
  };
});
