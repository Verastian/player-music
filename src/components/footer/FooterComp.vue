<template>
  <v-footer
    dark
    padless
    color="primary lighten-1"
  >
    <v-card
      class="flex"
    color="#002b3f"
      flat
      tile
    >
      <v-card-title class="teal">
        <strong class="subheading">All the music you can get in <a href="https://www.fiftysounds.com/es/"><span class="indigo--text text-uppercase">fiftysounds</span></a></strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          dark
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Play</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
      name:'footer-comp',
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
  }
</script>

<style>
.linkGetSounds{

}
</style>