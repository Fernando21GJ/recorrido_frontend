import { MutationTree } from "vuex";
import { State, Servicio, Data } from "./state";

export enum MutationType {
  CreateServicio = "CREATE_SERVICIO",
  SetServicios = "SET_SERVICIOS",
  CompleteServicio = "COMPLETE_SERVICIOS",
  RemoveServicio = "REMOVE_SERVICIOS",
  EditServicio = "EDIT_SERVICIO",
  UpdateServicio = `UPDATE_SERVICIO`,

  SetLoading = "SET_LOADING",
  SetCreateModal = "SET_CREATE_MODAL",
  SetEditModal = "SET_EDIT_MODAL",
  SetServicioModal = "SET_SERVICIO_MODAL",
}

export type Mutations = {

    [MutationType.CreateServicio](state: State, servicio: Data): void;
    [MutationType.SetServicios](state: State, servicio: Servicio[]): void;
    [MutationType.CompleteServicio](
      state: State,
      servicio: Partial<Servicio> & { id: number }
    ): void;
    [MutationType.RemoveServicio](
      state: State,
      servicio: Partial<Servicio> & { id: number }
    ): void;
    [MutationType.EditServicio](
      state: State,
      servicio: Partial<Servicio> & { id: number }
    ): void;
    [MutationType.UpdateServicio](
      state: State,
      servicio: Partial<Servicio> & { id: number }
    ): void;
  
    [MutationType.SetLoading](state: State, value: boolean): void;
    [MutationType.SetCreateModal](state: State, value: boolean): void;
    [MutationType.SetEditModal](state: State, value: {showModal: boolean, servicioId: number|undefined}): void;
    [MutationType.SetServicioModal](state: State, value: {showModal: boolean, servicioId: number|undefined}): void;
  };
  
  export const mutations: MutationTree<State> & Mutations = {
    [MutationType.CreateServicio](state, servicio) {
      state.data == servicio
    },
    [MutationType.SetServicios](state, servicios) {
      state.servicios = servicios
    },
    [MutationType.CompleteServicio](state, newServicio) {
      const servicio = state.servicios.findIndex(servicio => servicio.id === newServicio.id)
      if (servicio === -1) return
      state.servicios[servicio] = { ...state.servicios[servicio], ...newServicio }
    },
    [MutationType.RemoveServicio](state, Servicio) {
      const servicio = state.servicios.findIndex(servicio => servicio.id === Servicio.id)
      if (servicio === -1) return
      //If servicio exist in the state, remove it
      state.servicios.splice(servicio, 1) 
    },
    [MutationType.EditServicio](state, Servicio) {
      const servicio = state.servicios.findIndex(servicio => servicio.id === Servicio.id)
      if (servicio === -1) return
      //If servicio exist in the state, toggle the editing property
      state.servicios[servicio] = { ...state.servicios[servicio], editing: !state.servicios[servicio].editing } 
      console.log("servicio", state.servicios[servicio])
    },
    [MutationType.UpdateServicio](state, Servicio) {
      state.servicios = state.servicios.map(servicio => {
        if(servicio.id === Servicio.id) {
          return {...servicio, ...Servicio}
        }
        return servicio;
      })
    },
  
    [MutationType.SetLoading](state, value) {
      state.loading = value
    },
    [MutationType.SetCreateModal](state, value) {
      state.showCreateModal = value
    },
    [MutationType.SetEditModal](state, value) {
      state.showEditModal = value.showModal
      state.editModalServicioId = value.servicioId
    },
    [MutationType.SetServicioModal](state, {showModal, servicioId}) {
      state.showServicioModal = showModal
      state.showServicioId = servicioId
    }
  }