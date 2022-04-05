<template>
  <table class="table is-hoverable is-striped">
    <thead>
      <tr>
        <th><abbr title="Position">Servicio Id</abbr></th>
        <th>Treated</th>
        <th>Prescription</th>
        <th><abbr title="Lost">Actions</abbr></th>
      </tr>
    </thead>
    <tbody v-if="servicios">
      <tr v-for="servicio in servicios" :key="servicio.id">
        <ServicioListItem  v-bind="servicio" />
      </tr>
    </tbody>
    <tfoot>
      <CreateModal v-show="showCreateModal"></CreateModal>
      <button class="button  is-success" @click="setModal">Create Servicio</button>
    </tfoot>
  </table>
  <EditModal v-if="showEditModal" :id="editModalServicioId"></EditModal>
  <Servicio v-if="showServicioModal" :id="showServicioId"></Servicio>
</template>
<script>
import CreateModal from './CreateModal'
import EditModal from './EditModal'
import Servicio from './Servicio'
import ServicioListItem from './ServicioListItem'
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { MutationType } from '@/store/mutations'
export default defineComponent({
  name: 'Table',
  components: {
    CreateModal,
    ServicioListItem,
    Servicio,
    EditModal
  },
  setup() {
    const store = useStore()
    const setModal = () => {
      store.commit(MutationType.SetCreateModal, true)
    }
    const showCreateModal = computed(() => store.state.showCreateModal)
    const showEditModal = computed(() => store.state.showEditModal)
    const editModalServicioId = computed(() => store.state.editModalServicioId)
    const showServicioModal = computed(() => store.state.showServicioModal)
    const showServicioId = computed(()=> store.state.showServicioId)
    const servicios = computed(() => {console.log(store.state.servicios); return store.state.servicios})
    console.log({ servicios })
    return { showCreateModal, setModal, servicios, showEditModal, showServicioModal, editModalServicioId, showServicioId }
  }
})
</script>
<style scoped>  
table {
  width: 100%;
}
.fa {
  font-size: 1.2rem;
  margin-left: 15px;
}
.fa:hover {
  font-size: 1.4rem;
}
</style>