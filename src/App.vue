<template>
  <div id="app">
    <Navbar/>
    <div class="column is-half is-offset-one-quarter">
      <p class="help is-danger" v-show="emptyField">É necessário preencher algo</p>
      <input class="input is-rounded is-half block" type="text" placeholder="Digite sua tarefa aqui" v-model="taskText">
      <button class="button is-primary is-rounded block" @click="createTask"><span class="icon-text"><span class="icon"><i class="fas fa-plus"></i></span><span>Adicionar Tarefa</span></span></button>
      <div v-for="task in taskList" :key="task._id">
        <Task :text="task.text" :date="task.createdAt" :id="task._id" @deleteTaskEvent="deleteTask($event)" @doneTaskEvent="doneTask($event)" />
      </div>
      <div v-if="taskList.length <= 0" class="my-5">
        Nenhuma tarefa adicionada
      </div>
      <nav class="pagination is-small" role="navigation" aria-label="pagination">
        <!--
        <a class="pagination-previous" title="This is the first page" disabled>Previous</a>
        <a class="pagination-next">Next page</a>
        -->
        <ul class="pagination-list">
          <div v-for="index in pages" :key="index">
            <li>
              <a class="pagination-link" :class="{'is-current': pageActual == index}" aria-label="Page 1" aria-current="page" @click="findPage(index)">{{index}}</a>
            </li>
          </div>
        </ul>
      </nav>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Task from './components/Task';
import Navbar from './components/Navbar';

export default {
  name: 'App',
  created: function() {
    axios.get("http://localhost:3000/task/0/10/asc").then(res => {
      console.log(res);
      this.taskList = res.data.data;
      this.pages = Math.ceil(Math.max(1, res.data.length / 10));
      console.log(this.pages);
    }).catch(error => {
      console.log(error);
    });
  },
  components: {
    Task,
    Navbar
  },
  data() {
    return {
      taskList: [],
      taskText: "",
      pages: 1,
      pageActual: 1,
      emptyField: false
    }
  },
  methods: {
    createTask: function() {
      if(this.taskText == "" || this.taskText == " ") {
        this.emptyField = true;
      }
      else {
        this.emptyField = false;
        axios.post("http://localhost:3000/task/", { text: this.taskText }).then(res => {
          console.log(res);
          this.taskText = "";
          axios.get("http://localhost:3000/task/0/10/asc").then(res => {
            this.taskList = res.data.data;
            this.pages = Math.ceil(Math.max(1, res.data.length / 10));
            console.log(this.pages);
          }).catch(error => {
            console.log(error);
          });
        }).catch(error => {
          console.log(error);
        })
      }
    },
    deleteTask: function($event) {
      var id = $event.id;
      
      axios.delete("http://localhost:3000/task/" + id).then(res => {
        console.log(res);
        axios.get("http://localhost:3000/task/0/10/asc").then(res => {
          this.taskList = res.data.data;
          this.pages = Math.ceil(Math.max(1, res.data.length / 10));
          console.log(this.pages);
        }).catch(error => {
          console.log(error);
        });
      }).catch( error => {
        console.log(error);
      });
    },
    findPage: function(index) {
      var page = index - 1;
      axios.get("http://localhost:3000/task/" + page + "/10/asc").then(res => {
          this.taskList = res.data.data;
          this.pages = Math.ceil(Math.max(1, res.data.length / 10));
          this.pageActual = index;
          
          console.log(this.pageActual);
      }).catch(error => {
          console.log(error);
      });
    },
    doneTask: function($event) {
      console.log($event);
      var id = $event.id;
      axios.put("http://localhost:3000/task/" + id, { done: true }).then(res => {
        console.log(res);
        axios.get("http://localhost:3000/task/0/10/asc").then(res => {
          this.taskList = res.data.data;
          this.pages = Math.ceil(Math.max(1, res.data.length / 10));
          console.log(this.pages);
        }).catch(error => {
          console.log(error);
        });
      }).catch(error => {
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
}
</style>
