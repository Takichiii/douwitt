<template>
  <q-page padding>
  <div class="q-pa-md">
    <form @submit="addTodo">
        <input type="text" v-model="todoName" name="todoName" placeholder="New">
        <button>New card</button>
    </form>
    <q-list bordered>
      <task
        v-for="(task,key) in tasks"
        :key="key"
        :task="task"
        :id="key"></task>
    </q-list>
  </div>
  </q-page>
</template>

<script>
import axios from 'axios'; 
//import {mapGetters} from 'vuex';
import Vue from 'vue';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

Vue.prototype.$axios = axios;
const baseURL = "http://localhost:5000/api/tasks/";

export default {
  components : {
    task : require('components/Task.vue').default
  },
  data() {
    return {
      //tasks: [],
      "tasks": [
        {
          "id": 1,
          "name": "Faire les courses",
          "isDone": false
        },
        {
          "id": 2,
          "name": "Aller à la salle",
          "isDone": false
        },
        {
          "name": "Promener chien",
          "isDone": false,
          "id": 3
        }
      ],
      todoName: ''
    }
  },
  mounted() {
    this.loadData();
  },/*
  
  async created() {
    try {
      const res = await axios.get(baseURL);
      this.tasks = res.data;
      console.log("FRROOOONT RECEING DATA"+res);
    } catch(e) {
      console.error(e)
    }
  },*/
  
  methods: {
    loadData () {
      Vue.axios.get(baseURL)
      .then( (response) => {
        this.tasks = response.data;//[{name : "Erreur de chargement"}];
        console.log(this.tasks);
      });
    },
    async addTodo() {
      const res = await axios.post(baseURL, { name: this.todoName , isDone : false})
      this.tasks = [...this.tasks, res.data]
      this.todoName = ''
    },

  }
}

</script>

<style lang="scss">
  .text-strikethrough {
    text-decoration: line-through;
  }
</style>