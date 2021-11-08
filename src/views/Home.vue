<template>
  <div class="home">
    
    <background-img>
      <v-btn to="/player" text>
        <span class="mr-2 white--text">Player List</span>
      </v-btn>
    </background-img>
    

  </div>
</template>

<script>
  
import BackgroundImg from '../components/home/BackgroundImg.vue'
/* src\components\home\BackgroundImg.vue */
  export default {
    name: 'Home',

    components: {
     BackgroundImg
    },
  }
</script>
<style>
.home{
  /* background-color:#32647b; */
  background:radial-gradient( #d1dce1,#32647b );
 
}

</style>