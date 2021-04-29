<template>
    <div id="home">
        <div class="column is-half is-offset-one-quarter">
        <p class="help is-danger" v-show="emptyField">É necessário digitar a tarefa</p>
        <input class="input is-rounded is-half block" type="text" placeholder="Digite sua tarefa aqui" v-model="taskText">
        <button class="button is-primary is-rounded block" @click="createTask"><span class="icon-text"><span class="icon"><i class="fas fa-plus"></i></span><span>Adicionar Tarefa</span></span></button>
        <div v-for="task in taskList" :key="task._id">
            <Task :text="task.text" :date="task.createdAt" :id="task._id" @deleteTaskEvent="deleteTask($event)" @doneTaskEvent="doneTask($event)" />
        </div>
        <div v-if="taskList.length <= 0" class="my-5">
            Nenhuma tarefa adicionada
        </div>
        <nav v-if="taskList.length > 0" class="pagination is-small" role="navigation" aria-label="pagination">
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
import Task from '../components/Task';

export default {
  name: 'Home',
  created: function() {
    routerGetPaginatedTasks(0,10,"asc");
  },
  components: {
    Task
  },
  data() {
    return {
      taskList: [],
      taskText: "",
      pages: 1,
      pageActual: 1,
      emptyField: false,
      API_URL: "https://synkar-todolist-api.herokuapp.com/"
    }
  },
  methods: {
    createTask: function() {
      if(this.taskText == "" || this.taskText == " ") {
        this.emptyField = true;
      }
      else {
        this.emptyField = false;
        var body = {
          text: this.taskText
        };
        this.routerCreateTask(body);
      }
    },
    deleteTask: function($event) {
      var id = $event.id;
      
      this.routerDeleteTask(id);
    },
    findPage: function(index) {
      var page = index - 1;
      this.routerGetPaginatedTasks(page,10,"asc");
    },
    doneTask: function($event) {
      console.log($event);
      var id = $event.id;
      var body = {
        done: true
      }
      this.routerEditTask(id, body);
    },
    routerGetPaginatedTasks: function(page,limit,order) {
      axios.get(this.API_URL + "task/" + page + "/" + limit + "/" + order).then(res => {
        this.taskList = res.data.data;
        this.pages = Math.ceil(Math.max(1, res.data.length / 10));
        this.pageActual = page + 1;
        console.log(this.pages);
      }).catch(error => {
        console.log(error);
      });
    },
    routerDeleteTask: function(id) {
      axios.delete(this.API_URL + "task/" + id).then(res => {
        console.log(res);
        this.routerGetPaginatedTasks(0,10,"asc");
      }).catch( error => {
        console.log(error);
      });
    },
    routerCreateTask: function(body) {
      axios.post(this.API_URL + "task/", body).then(res => {
          console.log(res);
          this.taskText = "";
          this.routerGetPaginatedTasks(0,10,"asc");
        }).catch(error => {
          console.log(error);
        });
    },
    routerEditTask: function(id, body) {
      axios.put(this.API_URL + "task/" + id, body).then(res => {
        console.log(res);
        this.routerGetPaginatedTasks(0,10,"asc");
      }).catch(error => {
          console.log(error);
      });
    }
  }
}
</script>

<style>
#home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.pagination-link.is-current {
    background-color: #00d1b2 !important;
    border-color: #00d1b2 !important;
    color: #fff !important;
}
</style>