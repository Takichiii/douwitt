<template>
<div style="padding: 0px 0px 0px 30px;">
  <div v-if="title !== 'Projects'">
    <q-item
      clickable
      exact
      tag="a"
      :to="link"
    >
      <q-item-section v-if="icon" avatar>
        <q-icon  :name="icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>

  <div v-else>
    <q-expansion-item
    expand-icon-class
    expand-separator
    :icon="icon"
    :label="title"
    default-closed
    >
    
    <div v-for="project in projects" :key="project.name" v-bind="project">
      <q-item
        clickable
        exact
        tag="a"
        :to="'/project/' + project.id">
        <q-item-section avatar>
          <q-icon/>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ project.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </div>

    </q-expansion-item>

  </div>
  
</div>


</template>

<script>
import axios from 'axios'; 
const baseURL = "http://localhost:8081/";

export default {
  name: 'EssentialLink',
  data () {
    return {
      projects: {},
    }
  },
  mounted () {
    this.getProjects();
  },
  methods: {
    getProjects() {
      axios
        .get(baseURL + 'projects')
        .then(response => {
          delete response.data[0]; //remove the first element of projects which is inbox
          this.projects = response.data
        })
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      //default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  }
}
  /*
  watch: {
    projects: {
      immediate: true,// fetch the data when the view is created and the data is already being observed
      handler(id) {
        this.getProjects();// call again the method if the route changes
      },
    }
  },
  */
</script>

