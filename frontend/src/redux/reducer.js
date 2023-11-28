import {
  GET_FILTERED_NOTES,
  LOGIN,
  LOGOUT,
  DELETE_NOTE,
  UPDATE_NOTE,
  ARCHIVE_NOTE,
  CREATE_NOTE,
  SET_IS_EDITING,
  SET_STATUS_FILTERS,
  SET_CATEGORY_FILTERS,
  ADD_TAG_TO_NOTE,
  SET_CATEGORIES_ARRAY,
  DELETE_TAG,
  ADD_CREATING_NOTE,
} from './types';

const initialState = {
  filteredNotes: [],
  filters: {
    userId: null,
    isActive: true,
    category: 'all',
    page: 1,
    pageSize: 100,
  },
  user: null,
  categoriesArray: [
    'All',
    //   'Kids',
    //   'Work',
    //   'Home',
    //   'Food',
    //   'Health',
    //   'Personal',
    //   'Study',
  ],
  isCreating: false,
};

export const notesReducer = (state = initialState, action) => {
  let copy = [];
  let copy2 = [];
  let copy3 = [];
  let copy4 = [];
  let copy5 = [];
  let copy6 = [];
  let copy7 = [];
  let copy8 = [];
  let splicedArray = [];
  let elem;
  let index;
  let tagElem;
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        filters: { ...state.filters, userId: action.payload.userId },
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        filters: { ...state.filters, userId: null },
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
        isCreating: false,
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
      copy5 = state.filteredNotes;
      elem = state.filteredNotes.find((note) => note.id === action.payload.id);
      //busco el índice
      index = state.filteredNotes.findIndex(
        (note) => note.id === action.payload.id
      );
      elem = { ...elem, isEditing: action.payload.status };
      copy5[index] = elem;
      return {
        ...state,
        filteredNotes: copy5,
      };

    case SET_STATUS_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };

    case SET_CATEGORY_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };

    case ADD_TAG_TO_NOTE:
      copy6 = state.filteredNotes;
      console.log('Copy6: ', copy6);
      console.log(action.payload.id);
      elem = state.filteredNotes.find((note) => note.id === action.payload.id);
      console.log('Elem: ',elem);
      index = state.filteredNotes.findIndex(
        (note) => note.id === action.payload.id
      );
      //está la tag ya en esa note?
      tagElem = elem.category.find(
        (category) => category === action.payload.tag
      );
      if (!tagElem) {
        copy6[index] = {
          ...copy6[index],
          category: [...copy6[index].category, action.payload.tag],
        };
      }
      console.log('Llegó 2');
      return {
        ...state,
        filteredNotes: copy6,
      };

    case SET_CATEGORIES_ARRAY:
      return {
        ...state,
        categoriesArray: action.payload,
      };

    case DELETE_TAG:
      copy7 = state.filteredNotes;
      elem = state.filteredNotes.find((note) => note.id === action.payload.id);
      index = state.filteredNotes.findIndex(
        (note) => note.id === action.payload.id
      );
      splicedArray = copy7[index].category;
      splicedArray.splice(action.payload.tagIndex, 1);
      copy7[index] = { ...copy7[index], category: splicedArray };
      console.log('Array: ' + copy7[index].category);
      return {
        ...state,
        filteredNotes: copy7,
      };

    case ADD_CREATING_NOTE:
      copy8 = state.filteredNotes;
      copy8.unshift(action.payload);
      return {
        ...state,
        filteredNotes: copy8,
        isCreating:true
      };
    default:
      return { ...state };
  }
};
