import {
  GET_FILTERED_NOTES,
  SET_USER,
  DELETE_NOTE,
  UPDATE_NOTE,
  ARCHIVE_NOTE,
  CREATE_NOTE,
  SET_IS_EDITING,
} from './types';

const initialState = {
  filteredNotes: [],
  filters: {
    userId: '',
    isActive: true,
    category: undefined,
    page: 1,
    pageSize: 100,
  },
  userId: { userId: '', username: '' },
};

export const notesReducer = (state = initialState, action) => {
  let copy = [];
  let copy2 = [];
  let copy3 = [];
  let copy4 = [];
  let copy5 = []
  let elem;
  let index;
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userId: action.payload,
        filters: { ...state.filters, userId: action.payload },
      };

    case GET_FILTERED_NOTES:
      copy4 = action.payload;
      //ordenar array en updatedAt descendente
      copy4 = copy4.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      copy4.map((note) => {
        note.isEditing = false;
      });
      return {
        ...state,
        filteredNotes: copy4,
      };

    case DELETE_NOTE:
      copy = state.filteredNotes.filter((note) => {
        return note.id !== action.payload;
      });

      return {
        ...state,
        filteredNotes: copy,
      };

    case UPDATE_NOTE:
      //busco el elemento en el filteredArray
      copy2 = state.filteredNotes;
      elem = state.filteredNotes.find((note) => note.id === action.payload.id);
      //busco el índice
      index = state.filteredNotes.findIndex(
        (note) => note.id === action.payload.id
      );
      elem = {
        ...elem,
        title: action.payload.editedTitle,
        detail: action.payload.editedDetail,
      };
      copy2[index] = elem;
      return {
        ...state,
        filteredNotes: copy2,
      };
    case CREATE_NOTE:
      copy3 = state.filteredNotes;
      copy3.push(action.payload);

      return {
        ...state,
        filteredNotes: copy3,
      };

    case ARCHIVE_NOTE:
      //busco el elemento en el filteredArray
      copy2 = state.filteredNotes;
      elem = state.filteredNotes.find((note) => note.id === action.payload);
      //busco el índice
      index = state.filteredNotes.findIndex(
        (note) => note.id === action.payload
      );
      elem = { ...elem, isActive: !elem.isActive };
      copy2[index] = elem;
      return {
        ...state,
        filteredNotes: copy2,
      };

    case SET_IS_EDITING:
      //busco el elemento en el filteredArray
      copy5=state.filteredNotes
      elem = state.filteredNotes.find((note) => note.id === action.payload.id);
      //busco el índice
      index = state.filteredNotes.findIndex(
        (note) => note.id === action.payload.id
      );
      elem = { ...elem, isEditing: action.payload.status };
      copy5[index] = elem
      return {
        ...state,
        filteredNotes: copy5,
      };
    default:
      return { ...state };
  }
};
