<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <form @submit.prevent="updateServicio">
          <h1>Edit Modal</h1>
  

        <div class="field">
          <label class="label">Servicio</label>
          <div class="control">
            <textarea
              v-model="servicio"
              class="textarea"
              placeholder="Enter Servicio"
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
import { defineComponent, reactive, toRefs, computed, onMounted } from 'vue'
import { useStore } from '@/store'
import { Servicio} from '@/store/state'
import { MutationType } from '@/store/mutations'
import { ActionTypes } from '@/store/actions'
export default {
  name: 'EditModal',
  props: {
      id: { type: Number, required: true }
  },
  setup(props: any) {
    const state = reactive({
      servicio: '',
    })
    const store = useStore()
    const setFields = () => {
       const servicio = store.getters.getServicioById(Number(props.id))
       if(servicio) {
           console.log("servicio ", servicio)
           state.servicio = servicio.tipo_servicio
       }
    }
    onMounted(() => { setFields() });
    const updateServicio = () => {
      if (
        state.servicio=== '' 
      )
        return
      const servicio: Servicio = {
        id: props.id,
        tipo_servicio: state.servicio,
        completed: false,
        editing: false
      }
      store.dispatch(ActionTypes.UpdateServicio, servicio)
      state.servicio = ''

    }
    const closeModal = () => {
      store.commit(MutationType.SetEditModal, {showModal: false, servicioId: undefined})
    }
    return { closeModal, ...toRefs(state), updateServicio}
  }
}
</script>
<style scoped>
label {
    color: #ffffff;
}
h1 {
    color: #ffffff;
    text-align: center;
    font-size: 2rem;
    margin-bottom: 3rem;
}
</style>