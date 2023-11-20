import { GET_FILTERED_NOTES, SET_USER, DELETE_NOTE, UPDATE_NOTE, ARCHIVE_NOTE, CREATE_NOTE, SET_IS_EDITING } from './types';
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
      console.error(error);
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

export const updateNote = (id,editedTitle,editedDetail,UserId) => {
  return async (dispatch) => {
    try {
      await axios.put(`notes/`,{id,title:editedTitle,detail:editedDetail,UserId});

      return dispatch({
        type: UPDATE_NOTE,
        payload: {id,editedTitle,editedDetail},
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
    const title = 'Type a title'
    const detail = 'Type a detail'
    const category = []
    
    try {
      const {data} = await axios.post(`notes`,{title, detail,category,UserId});

      return dispatch({
        type: CREATE_NOTE,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setIsEditing = (id,status) => {
  return {
    type: SET_IS_EDITING,
    payload: {id,status},
  };
};