import { GetterTree } from 'vuex'
import { State, Servicio } from './state'

export type Getters = {
  completedServicioCount(state: State): number;
  totalServicioCount(state: State): number;
  getServicioById(state: State): (id: number) => Servicio | undefined;
}

export const getters: GetterTree<State, State> & Getters = {
  completedServicioCount(state) {
    return state.servicios.filter(servicio => servicio.completed).length
  },
  totalServicioCount(state) {
    return state.servicios.length
  },
  getServicioById: (state) => (id: number) => {
    return state.servicios.find(servicio => servicio.id === id)
  }
}