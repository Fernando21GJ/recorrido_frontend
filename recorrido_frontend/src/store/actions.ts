import { ActionContext, ActionTree } from 'vuex'
import { Mutations, MutationType } from './mutations'
import { State, Servicio, Data } from './state'
import axios from 'axios';
const apiUrl = "http://localhost:3000/servicios";

export enum ActionTypes {
  GetServicios = 'GET_SERVICIOS',
  SetCreateModal = 'SET_CREATE_MODAL',
  SetEditModal = 'SET_EDIT_MODAL',
  RemoveServicio = 'REMOVE_SERVICIO',
  CreateServicio = 'CREATE_SERVICIO',
  UpdateServicio = 'UPDATE_SERVICIO',
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
}


export type Actions = {
  [ActionTypes.GetServicios](context: ActionAugments): void;
  [ActionTypes.SetCreateModal](context: ActionAugments): void;
  [ActionTypes.SetEditModal](context: ActionAugments): void;
  [ActionTypes.RemoveServicio](context: ActionAugments, Servicio: {id: number}): void;
  [ActionTypes.CreateServicio](context: ActionAugments, data: Data): void;
  [ActionTypes.UpdateServicio](context: ActionAugments, servicio: Servicio): void;

}


export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GetServicios]({ commit }) {
    commit(MutationType.SetLoading, true)

    const response = await axios.get(apiUrl);

    commit(MutationType.SetLoading, false)
    commit(MutationType.SetServicios, response.data)

  },

  async [ActionTypes.SetCreateModal]({ commit }) {
    commit(MutationType.SetCreateModal, true)
  },

  async [ActionTypes.SetEditModal]({ commit }) {
    commit(MutationType.SetEditModal, {showModal: true, servicioId: 1})
  },



//Optimistic update
  async [ActionTypes.RemoveServicio]({ commit }, Servicio) {
    if(Servicio != undefined) {
      commit(MutationType.RemoveServicio, Servicio)
    }

    const response = await axios.delete(`${apiUrl}/${Servicio.id}`);

  },

  async [ActionTypes.CreateServicio]({ commit, dispatch }, Servicio) {

    const response = await axios.post(apiUrl, Servicio)
    dispatch(ActionTypes.GetServicios)
  },

  async [ActionTypes.UpdateServicio]({ commit, dispatch }, Servicio) {
    if(Servicio != undefined) {
      commit(MutationType.UpdateServicio, Servicio)
      const response = await axios.patch(`${apiUrl}/${Servicio.id}`, Servicio);
      dispatch(ActionTypes.GetServicios)
    }

  },
}