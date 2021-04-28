<template>
  <div id="app">
    <div class="column is-half is-offset-one-quarter">
      <input class="input is-rounded is-half block" type="text" placeholder="Digite sua tarefa aqui" v-model="taskText">
      <button class="button is-primary is-rounded block" @click="createTask"><span class="icon-text"><span class="icon"><i class="fas fa-plus"></i></span><span>Adicionar Tarefa</span></span></button>
      <div v-for="task in taskList" :key="task._id">
        <Task :text="task.text" :date="task.createdAt" :id="task._id" @deleteTaskEvent="deleteTask($event)" />
      </div>
      <!--
      <nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous" title="This is the first page" disabled>Previous</a>
        <a class="pagination-next">Next page</a>
        <ul class="pagination-list">
          <li>
            <a class="pagination-link is-current" aria-label="Page 1" aria-current="page">1</a>
          </li>
          <li>
            <a class="pagination-link" aria-label="Goto page 2">2</a>
          </li>
          <li>
            <a class="pagination-link" aria-label="Goto page 3">3</a>
          </li>
        </ul>
      </nav>
      -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Task from './components/Task';

export default {
  name: 'App',
  created: function() {
    axios.get("http://localhost:3000/task/0/10/asc").then(res => {
      console.log(res);
      this.taskList = res.data.data;
    }).catch(error => {
      console.log(error);
    });
  },
  components: {
    Task
  },
  data() {
    return {
      taskList: [],
      taskText: ""
    }
  },
  methods: {
    createTask: function() {
      axios.post("http://localhost:3000/task/", { text: this.taskText }).then(res => {
        console.log(res);
        this.taskList = "";
        axios.get("http://localhost:3000/task/0/10/asc").then(res => {
          this.taskList = res.data.data;
        }).catch(error => {
          console.log(error);
        });
      }).catch(error => {
        console.log(error);
      })
    },
    deleteTask: function($event) {
      var id = $event.id;
      
      axios.delete("http://localhost:3000/task/" + id).then(res => {
        console.log(res);
        axios.get("http://localhost:3000/task/0/10/asc").then(res => {
          this.taskList = res.data.data;
        }).catch(error => {
          console.log(error);
        })
      }).catch( error => {
        console.log(error);
      });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
