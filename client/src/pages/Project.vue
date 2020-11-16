<template>
  <q-page padding>
  <div class="q-pa-md">
    <q-list bordered>
      <task v-for="(task,key) in tasks" :key="key" :task="task" :id="key"></task>
    </q-list>
    <form @submit.prevent="addTask">
        <input type="text" v-model="taskName" name="taskName" placeholder="Ajouter une tâche">
        <button>New card</button>
    </form>
  </div>
  </q-page>
</template>

<script>
import axios from 'axios';
const baseURL = "http://localhost:8081/";

export default {
  components : {
    task : require('components/Task.vue').default
  },
  data() {
    return {
      tasks: [],
      taskName: ''
    }
  },
  computed: {
    id: function () {
      return this.$route.params.id;
    }
  },
  watch: {
    id: {
      immediate: true,// fetch the data when the view is created and the data is already being observed
      handler(id) {
        this.getProjectTasks(id);// call again the method if the route changes
      },
    },
    addTask : {
      handler(id) {
        this.getProjectTasks(id);// call again the method if the route changes
      },
    },
  },
  methods: {
    getProjectTasks(id) {
      if (id == undefined) { //inbox
        axios
        .get(`${baseURL}projects/0/tasks`)
        .then(response => (this.tasks = response.data))
      } else {
        axios
          .get(`${baseURL}projects/${id}/tasks`)
          .then(response => (this.tasks = response.data))
      }
    },
    async addTask() {
      const response = await axios.post(
        `${baseURL}tasks/${this.id}`, 
        JSON.stringify({ "name": this.taskName , "isDone" : false})
        )
      console.log(response.data);
      this.tasks = [...this.tasks, response.data]
      this.taskName = ''
    }
  },
}
</script>

<style lang="scss">
  .text-strikethrough {
    text-decoration: line-through;
  }
</style>