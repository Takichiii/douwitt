<template>
<div>
  <div v-if="link !== undefined">
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
    :label="title"
    default-opened
    expand-separator
    switch-toggle-side
    >
    
    <div v-for="(project, projectId) in projects" :key=projectId v-bind="project">
      <q-item
        clickable
        exact
        tag="a"
        :to="'/projects/' + projectId">
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
      projects: [],
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
        });
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String
    },

    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.q-expansion-item {
  order : 1;
}
</style>

