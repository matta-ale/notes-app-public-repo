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

import axios from 'axios';

export const login = (user) => {
  return {
    type: LOGIN,
    payload: user,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const getFilteredNotes = (URL) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(URL);
      return dispatch({
        type: GET_FILTERED_NOTES,
        payload: data.data,
      });
    } catch (error) {
      if (error.response.data.error === 'No notes match that criteria') {
        return dispatch({
          type: GET_FILTERED_NOTES,
          payload: [],
        });
      } else {
        console.error(error);
      }
    }
  };
};

export const deleteNote = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`notes/${id}`);

      return dispatch({
        type: DELETE_NOTE,
        payload: id,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateNote = (id, editedTitle, editedDetail, UserId) => {
  return async (dispatch) => {
    try {
      await axios.put(`notes/`, {
        id,
        title: editedTitle,
        detail: editedDetail,
        UserId,
      });

      return dispatch({
        type: UPDATE_NOTE,
        payload: { id, editedTitle, editedDetail },
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const archiveNote = (id) => {
  return async (dispatch) => {
    try {
      await axios.put(`notes/status/${id}`);

      return dispatch({
        type: ARCHIVE_NOTE,
        payload: id,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const createNote = (title,detail,category,UserId) => {
  return async (dispatch) => {

    try {
      let { data } = await axios.post(`notes`, {
        title,
        detail,
        category,
        UserId,
      });

      return dispatch({
        type: CREATE_NOTE,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setIsEditing = (id, status) => {
  return {
    type: SET_IS_EDITING,
    payload: { id, status },
  };
};

export const setStatusFilter = (filters) => {
  return {
    type: SET_STATUS_FILTERS,
    payload: filters,
  };
};

export const setCategoryFilter = (filters) => {
  return {
    type: SET_CATEGORY_FILTERS,
    payload: filters,
  };
};

export const addTagToNote = (id, tag, body) => {
  try {

    return async (dispatch) => {
      let categoryArray = body.category
      categoryArray.push(tag)
      body.category = categoryArray
      await axios.post('categories',{category:tag})
      console.log('Llegó 1');
      await axios.put('notes', body);
      return dispatch({
        type: ADD_TAG_TO_NOTE,
        payload: { id, tag },
      });
    };
  // eslint-disable-next-line no-unreachable
  } catch (error) {
    console.error(error);
  }
};

export const setCategoriesArray = (categoriesArray) => {
  return {
    type: SET_CATEGORIES_ARRAY,
    payload: categoriesArray,
  };
};

export const deleteTag = (id, tagIndex) => {
  return {
    type: DELETE_TAG,
    payload: { id, tagIndex },
  };
};

export const addCreatingNote = (UserId) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();
  return {
    type: ADD_CREATING_NOTE,
    payload: {
      id: '1',
      title: 'Type new title...',
      detail: 'Type new detail...',
      category: [],
      isActive: true,
      createdAt: formattedDate,
      updatedAt: formattedDate,
      UserId: UserId,
      isEditing: true,
    },
  };
};
