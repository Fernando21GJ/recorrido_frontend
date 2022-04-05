export type Servicio = {
    id: number;
    tipo_servicio: string;
    completed: boolean;
    editing: boolean;
  };
  export type Data = {
    tipo_servicio: string;
  };
  export type State = {
    loading: boolean;
    servicios: Servicio[];
    data: Data | null;
    showCreateModal: boolean;
    showEditModal: boolean;
    showServicioModal: boolean;
    editModalServicioId: number | undefined;
    showServicioId: number | undefined;
  };
  export const state: State = {
    loading: false,
    servicios: [],
    data: null,
    showCreateModal: false,
    showEditModal: false,
    showServicioModal: false,
    editModalServicioId: undefined,
    showServicioId: undefined,
  };