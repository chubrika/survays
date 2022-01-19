<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer()"
        />

        <q-toolbar-title> Surveys </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <div class="flex flex-between" style="border-bottom: 1px solid #dfe6ed;">
          <q-item-label header> Navigation </q-item-label>
          <q-btn
            flat
            dense
            round
            icon="clear"
            aria-label="hide"
            @click="toggleLeftDrawer()"
          />
        </div>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "../components/EssentialLink.vue";

const linksList = [
  {
    title: "Project 1",
    icon: "checklist",
    link: "/surveys",
  },
  {
    title: "Logout",
    icon: "logout",
    link: "/login",
  },
];

export default {
  name: "MainLayout",
  components: {
    EssentialLink,
  },
  data() {
    return {
      essentialLinks: linksList,
      leftDrawerOpen: false,
    };
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
};
</script>
