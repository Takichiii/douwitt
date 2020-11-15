import axios from 'axios'
const resource_uri = "http://localhost:8081/"

const state = {
  tasks : []
};

const getters = {
  tasks: state => state.tasks
};

const mutations = {
}

const actions = {
}

export default {
    namespaced : true,
    state,
    mutations,
    actions,
    getters
}