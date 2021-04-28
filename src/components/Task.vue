<template>
  <div class="block">
        <article class="message is-small" :class="{'is-dark': !isDone, 'is-success': isDone }">
            <div class="message-body is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
                <div class="is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
                    <button class="button is-rounded is-small mr-2" @click="emitEventDone">
                        <span class="icon is-small">
                        <i class="fas fa-check"></i>
                        </span>
                    </button>
                    <p>{{text}}</p>
                </div>
                <div>
                    {{date | filterDate}}
                    <button class="delete is-small ml-2" aria-label="delete" @click="emitEventDelete"></button>
                </div>
            </div>
        </article>
  </div>
</template>

<script>
export default {
    data() {
        return {
            isDone: false
        }
    },
    props: {
        text: String,
        date: String,
        id: String
    },
    filters: {
        filterDate: function(value) {
            var offset = new Date().getTimezoneOffset();
            offset = offset / 60;
            if(offset < 0) ((value.slice(11,13) * 1) + Math.abs(offset)) + ":" + value.slice(14,16) + " " + value.slice(8,10) + "/" + value.slice(5,7) + "/" + value.slice(0,4);
            else return ((value.slice(11,13) * 1) - Math.abs(offset)) + ":" + value.slice(14,16) + " " + value.slice(8,10) + "/" + value.slice(5,7) + "/" + value.slice(0,4);
        }
    },
    methods: {
        emitEventDelete: function() {
            this.$emit("deleteTaskEvent",{ id: this.id });
        },
        emitEventDone: function() {
            this.isDone = true;
            this.$emit("doneTaskEvent", { id: this.id });
        }
    }
}
</script>

<style>
.block {
  margin-bottom: 1.5rem;
}
</style>