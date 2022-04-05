<template>
  <th>{{ id }}</th>
  <td>
    <input type="checkbox" :checked="completed" @change="toggleCompletion()" />
  </td>
  <td>{{ tipo_servicio }} <strong>(C)</strong></td>
  <td>
    <span class="icon" @click="viewServicio()">
      <i class="fa fa-eye"></i>
    </span>
    <span class="icon" @click="editServicio()">
      <i class="fa fa-edit"></i>
    </span>
    <span class="icon" @click="removeServicio()">
      <i class="fa fa-trash"></i>
    </span>
  </td>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { MutationType } from '@/store/mutations'
import { ActionTypes } from '@/store/actions'
export default defineComponent({
  props: {
    tipo_servicio: {type: String, required: true }, 
    completed: { type: Boolean, required: true },
    id: { type: Number, required: true },
  },
  setup(props) {
    const store = useStore()
    const toggleCompletion = () => {
      store.commit(MutationType.CompleteServicio, {
        id: props.id,
        completed: !props.completed
      })
    }
    
    const removeServicio = () => {
        store.dispatch(ActionTypes.removeServicio, {
          id: props.id
        })
    }
    const viewServicio = () => {
      store.commit(MutationType.SetServicioModal, {showModal:true, servicioId:props.id})
    }
    const editServicio = () => {
      store.commit(MutationType.SetEditModal, {showModal:true, servicioId: props.id})
    }
    return { toggleCompletion, removeServicio, editServicio, viewServicio }
  }
})
</script>