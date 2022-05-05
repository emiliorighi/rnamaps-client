<template>
  <v-app>
    <v-app-bar
      app
      absolute
      color="white"
      elevate-on-scroll
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>RNAmaps</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <home-page/>
    </v-main>
  </v-app>
</template>

<script>
import HomePage from './views/HomePage.vue';

export default {
  name: 'App',

  components: {
    HomePage,
  },

  data: () => ({
    //
  }),
};
</script>