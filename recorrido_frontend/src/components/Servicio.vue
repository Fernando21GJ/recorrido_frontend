<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <h1>VIEW SERVICIO</h1>
      <div class="card">
        <div class="card-content">
          <div class="media">

          </div>
          <div class="content">
            <p class="subtitle is-6">Servicio: {{ servicio.tipo_servicio }}</p>
          </div>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" @click="closeModal" aria-label="close"></button>
  </div>
</template>
<script lang="ts">
import { computed } from "vue";
import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";
export default {
  name: "ServicioModal",
  props: {
    id: { type: Number, required: true },
  },
  setup(props: any) {
    const store = useStore();
    const servicio = computed(() => store.getters.getServicioById(Number(props.id)));
    const closeModal = () => {
      store.commit(MutationType.SetServicioModal, {
        showModal: false,
        servicioId: undefined,
      });
    };
    return { closeModal, servicio };
  },
};
</script>
<style scoped>
h1 {
  color: #ffffff;
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
}
</style>