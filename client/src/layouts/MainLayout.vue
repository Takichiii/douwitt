<template>
  <q-layout view="hHr LpR fFf"> 
    <q-header >
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" class=""/>
        <q-btn flat round dense icon="home" to="/"/>
        <q-input dark dense standout v-model="text" placeholder="Rechercher" input-class="text-left" class="q-pa-sm">
          <template v-slot:append>
            <q-icon v-if="text === ''" name="clear" />
            <q-icon v-else name="search" class="cursor-pointer" @click="text = ''" />
          </template> 
        </q-input>
        <q-space />
         <q-toolbar-title to="/" style="flex: none;">
          <q-avatar  >
            <img src="..\assets\douwitt.png">
          </q-avatar>
           &nbspdouwitt
        </q-toolbar-title>
        
        <q-btn flat round dense icon="info_outline" class="q-pa-sm" to="/about"/>
      </q-toolbar>
    </q-header>

    <q-drawer side="left"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="305"
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8"></q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Boîte de réception',
    icon: 'all_inbox',
    link : '/inbox'
  },
  {
    title: 'Aujourd\'hui',
    icon: 'today',
    link : '/today'
  },
  {
    title: '7 prochains jours',
    icon: 'label_outline',
    link : '/week'
  },
  {
    title: 'Projects',
    icon: 'assignment',
  }
];
const text = "";

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      text : text
    }
  }
}
</script>
