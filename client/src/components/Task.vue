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
        <q-icon @click="$emit('delete',task.taskId)" name="delete" color="red" />
    </q-item-section>

    </q-item>
</template>

<script>
export default {
    props: ['task']
}
</script>