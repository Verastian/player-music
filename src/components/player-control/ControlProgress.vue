<template>
  <v-row class="py-3">
          <v-col>
            <v-progress-linear
              :value="trackProgress"
              height="25"
              @change="updateSeek"
            >
              <template v-slot:default="{ value }">
                <strong>{{ Math.ceil(value) }}%</strong>
              </template>
              <strong>{{ trackProgress }}%</strong>
            </v-progress-linear>
          </v-col>
        </v-row>
</template>

<script>
export default {
name:'control-progress',
props:{
    trackProgress:{
        type:String,
        default:'0',
    },
},
data(){
    return{
updateseek:0,
    }
},
 methods: {
    updateSeek(update) {
        this.$emit('updateSeek',update);
       /*  console.log(update) */
  },
}
}
</script>

<style>

</style>