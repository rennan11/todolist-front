<template>
  <div class="done">
    <div class="column is-half is-offset-one-quarter">
        <div v-for="task in taskList" :key="task._id">
            <Task :text="task.text" :date="task.createdAt" :id="task._id" :color="'green'" @deleteTaskEvent="deleteTask($event)" @doneTaskEvent="doneTask($event)" />
        </div>
        <div v-if="taskList.length <= 0" class="my-5">
            Você não possui tarefas concluidas ainda
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
    axios.get("https://synkar-todolist-api.herokuapp.com/task/done/0/10/asc").then(res => {
      console.log(res);
      this.taskList = res.data.data;
      this.pages = Math.ceil(Math.max(1, res.data.length / 10));
      console.log(this.pages);
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
      taskText: "",
      pages: 1,
      pageActual: 1,
      emptyField: false,
      API_URL: "https://synkar-todolist-api.herokuapp.com/"
    }
  },
  methods: {
    deleteTask: function($event) {
      var id = $event.id;
      
      this.routerDeleteTask(id);
    },
    findPage: function(index) {
      var page = index - 1;
      this.routerGetPaginatedDoneTasks(page,10,"asc");
    },
    routerGetPaginatedDoneTasks: function(page,limit,order) {
      axios.get(this.API_URL + "task/done/" + page + "/" + limit + "/" + order).then(res => {
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
        this.routerGetPaginatedDoneTasks(0,10,"asc");
      }).catch( error => {
        console.log(error);
      });
    }
  }
}
</script>

<style>
#done {
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