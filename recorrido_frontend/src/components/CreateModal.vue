<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <form @submit.prevent="createServicio">
        <div class="field">
          <label class="label">Servicio</label>
          <div class="control">
            <textarea
              v-model="servicio"
              class="textarea"
              placeholder="Enter servicio"
            ></textarea>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button type="submit" class="button is-link">Submit</button>
          </div>
          <div class="control" @click="closeModal">
            <button class="button is-link is-light">Cancel</button>
          </div>
        </div>
      </form>
    </div>
    <button
      class="modal-close is-large"
      @click="closeModal"
      aria-label="close"
    ></button>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useStore } from '@/store'
import { Data } from '@/store/state'
import { MutationType } from '@/store/mutations'
import { ActionTypes } from '@/store/actions'
export default {
  name: 'CreateModal',
  setup() {
    const state = reactive({
      servicio: '',
    })
    const store = useStore()

    const createServicio = () => {
      if (
        state.servicio === '' 
      )
        return
      const servicio: Data = {
        tipo_servicio: state.servicio,
      }
      store.dispatch(ActionTypes.CreateServicio, servicio)
      state.servicio = ''
    }
    const closeModal = () => {
      store.commit(MutationType.SetCreateModal, false)
    }
    return { closeModal, ...toRefs(state), createServicio }
  }
}
</script>