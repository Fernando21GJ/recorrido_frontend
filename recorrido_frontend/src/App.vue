<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import ServicioList from './components/ServicioList.vue'
import { useStore } from './store'
import { ActionTypes } from './store/actions'
export default defineComponent({
  components: { ServicioList },
  setup() {
    const store = useStore()
    const loading = computed(() => store.state.loading)
    onMounted(() => store.dispatch(ActionTypes.GetServicios))
    const completedCount = computed(() => store.getters.completedServicioCount)
    const totalCount = computed(() => store.getters.totalServicioCount)
    return { loading, completedCount, totalCount }
  }
})
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item">
          Home
        </a>

        <a class="navbar-item">
          About
        </a>
      </div>
    </div>
  </nav>
  <div class="container mx-auto mt-4">
    <h1 class="is-size-3 has-text-centered p-2 has-text-weight-bold is-success">
      Recorrido Frontend
    </h1>
    <h3  class="has-text-centered p-2">Manage records in recorrido</h3>

    <div v-if="loading">
      <h3 class="has-text-centered mt-4">Loading...</h3>
    </div>
    <div v-else>
      <p class="has-text-centered mt-2">
        {{ completedCount }} of {{ totalCount }} treated.
      </p>
      <ServicioList/>
    </div>
  </div>
</template>
<style>
@import '~bulma/css/bulma.css';
</style>