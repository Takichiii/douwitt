<template>
  <q-page padding>
  <div class="q-pa-md">
    <q-list bordered>
      <task v-for="(task,key) in tasks" 
      :key="key" 
      :task="task" 
      :id="key"
      @delete="deleteTodo($event)">
      ></task>
    <form class="q-pa-md" @submit.prevent="addTask" autocomplete="off">
        <input type="text" v-model="taskName" name="taskName" placeholder="Ajouter une tâche">
        <button>+</button>
    </form>
    </q-list>
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
      taskName: '',
      taskUpdated: false
    }
  },
  computed: {
    id: function () {
     if (this.$route.fullPath == '/inbox')
       return 0;
      return this.$route.params.id;
    }
  },
  watch: {
    id: {
      immediate: true,// fetch the data when the view is created and the data is already being observed
      handler(id) {
      if (this.$route.fullPath == '/inbox')
        id = 0
      this.getProjectTasks(id);// call again the method if the route changes
      }
    },
  	tasks: {
      handler: function (val, oldVal) {
      },
      deep: true
    }
  },
  methods: {
    async deleteTodo(taskId) {
        console.log("worked "+ taskId);
        try {
            const response = await axios.delete(`${baseURL}tasks/${this.id}/${taskId}`);
            console.log(response.data);
        } catch(e) {
            console.error(e);
        };
        //this.taskUpdated = true;
        this.getProjectTasks(this.id);
    },
    getProjectTasks(id) {
      console.log('getprojecttasks', id);
        axios
          .get(`${baseURL}projects/${id}/tasks`)
          .then(response => (this.tasks = response.data))
          .catch(error => console.log(error.response.data));
    },
    async addTask() {
      const response = await axios.post(
        `${baseURL}tasks/${this.id}`, 
        { 
          name: this.taskName
        })
      console.log(response.data);
      this.tasks = [...this.tasks, response.data]
      this.taskName = ''
      this.getProjectTasks(this.id);
    }
  },
}
</script>

<style lang="scss">
  .text-strikethrough {
    text-decoration: line-through;
  }
</style>