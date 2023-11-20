import {
  GET_FILTERED_NOTES,
  SET_USER,
  DELETE_NOTE,
  UPDATE_NOTE,
  ARCHIVE_NOTE,
  CREATE_NOTE,
  SET_IS_EDITING,
  SET_STATUS_FILTERS,
  SET_CATEGORY_FILTERS,
  ADD_TAG_TO_NOTE,
  SET_CATEGORIES_ARRAY,
  DELETE_TAG
} from './types';

import axios from 'axios';

export const setUserId = (userId) => {
  return {
    type: SET_USER,
    payload: userId,
  };
};

export const getFilteredNotes = (URL) => {
  console.log(URL);
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

export const createNote = (UserId) => {
  return async (dispatch) => {
    const title = 'Type a title';
    const detail = 'Type a detail';
    const category = [];

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

export const addTagToNote = (id,tag) => {
  return {
    type: ADD_TAG_TO_NOTE,
    payload: {id,tag},
  };
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
    payload: {id,tagIndex},
  };
};