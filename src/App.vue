<template>
  <v-app app >
   <!--  <v-system-bar lights-out> </v-system-bar> --> 
      <router-view />
    <footer-comp />
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import FooterComp from "./components/footer/FooterComp.vue";
export default {
  name: "App",
  components: {
    FooterComp,
  },
  data: () => ({
    //
  }),
  computed: {
    ...mapState(["playlist"]),
    ...mapGetters(["listTracks"]),
  },
  methods: {
    ...mapActions(["getPlaylist"]),
  },
  created() {
    this.getPlaylist();
    this.playlist;
    this.listTracks;
  },
};
</script>
<style >
a{
  text-decoration: none;
}
.styleOverflow{
  
    /* border: 1px solid #aaa; */
    height: 800px;
    
    /* max-width: 400px; */
    /* background: #f1f2f3; */
    overflow:auto;
    box-sizing: border-box;
    padding:0 1rem;
}

/* Estilos para motores Webkit y blink (Chrome, Safari, Opera... )*/

.styleOverflow::-webkit-scrollbar {
    -webkit-appearance: none;
}

.styleOverflow::-webkit-scrollbar:vertical {
    width:10px;
}

.styleOverflow::-webkit-scrollbar-button:increment,.styleOverflow::-webkit-scrollbar-button {
    display: none;
} 

.styleOverflow::-webkit-scrollbar:horizontal {
    height: 10px;
}

.styleOverflow::-webkit-scrollbar-thumb {
    background-color: #19516b;
    border-radius: 20px;
    border: 2px solid #d1dce1;
}

.styleOverflow::-webkit-scrollbar-track {
    border-radius: 10px;  
}
</style>