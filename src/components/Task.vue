<template>
  <div class="block">
        <article class="message is-small" :class="{'is-dark': !isDone, 'is-success': isDone || color == 'green' }">
            <div class="message-body is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
                <div class="is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
                    <button class="button is-rounded is-small mr-2" :class="{'hideElement': color == 'green'}" @click="emitEventDone">
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
        id: String,
        color: String
    },
    filters: {
        filterDate: function(value) {
            var offset = new Date().getTimezoneOffset();
            offset = offset / 60;
            var hours = 0;
            if(offset < 0) hours = ((value.slice(11,13) * 1) + Math.abs(offset));
            else hours = ((value.slice(11,13) * 1) - Math.abs(offset));
            if(hours < 0) hours += 24;
            return hours + ":" + value.slice(14,16) + " " + value.slice(8,10) + "/" + value.slice(5,7) + "/" + value.slice(0,4);
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

.hideElement {
    display: none;
}
</style>