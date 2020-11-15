<template>
    <q-item tag="label" 
    :class="{'bg-green-2' : task.isDone}"
    v-ripple>

    <q-item-section side top>
        <q-checkbox v-model="task.isDone" />
    </q-item-section>

    <q-item-section>
        <q-item-label
        :class="{'text-strikethrough' : task.isDone}">{{ task.name }}</q-item-label>
    </q-item-section>

    <q-item-section side top>
        <q-icon @click="deleteTodo(task.id)" name="delete" color="red" />
    </q-item-section>

    </q-item>
</template>

<script>
//import { mapActions } from 'vuex';
import axios from 'axios';
import uuid from 'uuid';

const baseURL = "http://localhost:5000/api/tasks"

export default {
    props : ["task"],
    methods: {
    async deleteTodo(id) {
        try {
            const response = await axios.delete(`${baseURL}${id}`);
        } catch(e) {
            console.error(e)
        }
    }
  }
}
</script>

<style>
</style>