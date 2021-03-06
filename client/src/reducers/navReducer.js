import {
  ADD_PROJECT,
  SHOW_ADD_PROJECT_MODAL,
  HIDE_ADD_PROJECT_MODAL,
  SHOW_UPDATE_PROJECT_MODAL,
  HIDE_UPDATE_PROJECT_MODAL,
  SHOW_DELETE_PROJECT_MODAL,
  HIDE_DELETE_PROJECT_MODAL,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  SHOW_TASK_MODAL,
  HIDE_TASK_MODAL
} from "../actions/types";

const initialState = {
  addProjectModal: false,
  updateProjectModal: false,
  deleteProjectModal: false,
  taskModal: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_ADD_PROJECT_MODAL:
      return {
        ...state,
        addProjectModal: true
      };
    case ADD_PROJECT:
    case HIDE_ADD_PROJECT_MODAL:
      return {
        ...state,
        addProjectModal: false
      };
    case SHOW_UPDATE_PROJECT_MODAL:
      return {
        ...state,
        updateProjectModal: true
      };
    case UPDATE_PROJECT:
    case HIDE_UPDATE_PROJECT_MODAL:
      return {
        ...state,
        updateProjectModal: false
      };
    case SHOW_DELETE_PROJECT_MODAL:
      return {
        ...state,
        deleteProjectModal: true
      };
    case DELETE_PROJECT:
    case HIDE_DELETE_PROJECT_MODAL:
      return {
        ...state,
        deleteProjectModal: false
      };
    case SHOW_TASK_MODAL:
      return {
        ...state,
        taskModal: true
      };
    case HIDE_TASK_MODAL:
      return {
        ...state,
        taskModal: false
      };
    default:
      return state;
  }
}
