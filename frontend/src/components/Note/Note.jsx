/* eslint-disable react/prop-types */
import styles from './Note.module.css';
//import { ROUTES } from '../../Helpers/PathRouters';
import { DateTime } from 'luxon';
import archive from '../../assets/img/archive.png';
import unarchive from '../../assets/img/unarchive.png';
import deleteButton from '../../assets/img/delete.png';
import edit from '../../assets/img/edit.png';
import addtag from '../../assets/img/addtag.png';
import saveChanges from '../../assets/img/saveChanges.png';
import { deleteNote } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import {
  updateNote,
  getFilteredNotes,
  archiveNote,
  setIsEditing,
  addTagToNote,
  deleteTag,
  setCategoriesArray
} from '../../redux/actions';
import { urlMaker } from '../../helpers/urlMaker';
import axios from 'axios'

export default function Note(props) {
  // eslint-disable-next-line react/prop-types, no-unused-vars
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const { id, title, detail, category, isActive, updatedAt, UserId } = props;
  const dateTime = DateTime.fromISO(updatedAt, { zone: 'utc' });
  //estados locales para modificar nota
  const notes = useSelector(state => state.filteredNotes)

  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDetail, setEditedDetail] = useState(detail);
  const filters = useSelector((state) => state.filters);
  const isEditing = useSelector((state) =>
    state.filteredNotes.find((note) => note.id === id)
  ).isEditing;
  const titleInputRef = useRef(null);
  const [newTag, setNewTag] = useState('');
  const [isAddingTag, setIsAddingTag] = useState(false);

  const formattedDate = dateTime.setZone('utc-3').toLocaleString({
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  useEffect(() => {
    if (isEditing) {
      titleInputRef.current.focus();
    }
  }, [isEditing]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteNote(id));
    } catch (error) {
      window.alert(error.message);
    }
  };

  const handleEdit = async () => {
    await dispatch(setIsEditing(id, true));
  };

  const handleSaveChanges = async () => {
    // Lógica para guardar los cambios en la base de datos
    try {
      await dispatch(updateNote(id, editedTitle, editedDetail, UserId));
      const URL = urlMaker(filters);
      await dispatch(getFilteredNotes(URL));
    } catch (error) {
      window.alert(error.message);
    }
    await dispatch(setIsEditing(id, false));
  };

  const handleArchive = async () => {
    try {
      await dispatch(archiveNote(id));
      const URL = urlMaker(filters);
      await dispatch(getFilteredNotes(URL));
    } catch (error) {
      window.alert(error.message);
    }
  };

  const handleAddTag = async () => {
    //agregar tag a los tags de la note
    dispatch(addTagToNote(id, newTag));
    let myNote = notes.find(item => item.id === id)
    let body = {...myNote,category: myNote.category}
    await axios.put('notes',body)
    const URL = urlMaker(filters);
    await dispatch(getFilteredNotes(URL));
    setNewTag('');
    setIsAddingTag(false);
    //agregar tag si no está en el listado de tags
  };

  const handleDeleteTag = async (tagIndex) => {
    await dispatch(deleteTag(id,tagIndex))
    let myNote = notes.find(item => item.id === id)
    console.log(myNote.category);
    let body = {...myNote,category: myNote.category}
    await axios.put('notes',body)
    const URL = urlMaker(filters);
    await dispatch(getFilteredNotes(URL));
    let categoriesArray = ['All']
      notes.forEach(note => {
        note.category.forEach((tag => {
          if(!categoriesArray.includes(tag)) categoriesArray.push(tag)
        }))
      })
      await dispatch(setCategoriesArray(categoriesArray))

  }

  return (
    <div className={styles.note}>
      <div className={styles.tags}>
        {Array.isArray(category) &&
          category.map((tag, index) => (
            <div key={index} className={styles.tagContainer}>
              <p key={index} className={styles.tag}>
                {tag}
              </p>
              <button  onClick={() => handleDeleteTag(index)}>
                <img src={deleteButton} alt='delete button' />
              </button>
            </div>
          ))}
      </div>
      {isEditing ? (
        <>
          <input
            className={styles.editTitle}
            type='text'
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            ref={titleInputRef}
          />
          <textarea
            className={styles.editDetail}
            value={editedDetail}
            onChange={(e) => setEditedDetail(e.target.value)}
          />
        </>
      ) : (
        <>
          <h2 className={styles.title}>{title}</h2>

          {isAddingTag ? (
            <>
              <div className={styles.addingTag}>
                <input
                  type='text'
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder='Enter new tag'
                />
                <div className={styles.addTagButtons}>
                  <button onClick={handleAddTag}>Add</button>
                  <button onClick={() => setIsAddingTag(false)}>Cancel</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className={styles.detail}>{detail}</p>
            </>
          )}
        </>
      )}

      <span className={styles.lastUpdate}>Updated: {formattedDate}</span>
      <span
        className={`${styles.isActive} ${
          isActive ? styles.active : styles.archive
        }`}
      >
        {isActive ? 'Active' : 'Archived'}
      </span>
      {isEditing ? (
        <button className={styles.saveChanges} onClick={handleSaveChanges}>
          <img src={saveChanges} alt='save changes button' />
          <span>Save</span>
        </button>
      ) : (
        <div className={styles.buttonContainer}>
          <button onClick={handleEdit}>
            <img src={edit} alt='edit button' />
            <span>Edit</span>
          </button>
          <button onClick={() => setIsAddingTag(true)}>
            <img src={addtag} alt='add tag button' />
            <span>Add tag</span>
          </button>
          {isActive ? (
            <button onClick={handleArchive}>
              <img src={archive} alt='archive button' />
              <span>Archive</span>
            </button>
          ) : (
            <button onClick={handleArchive}>
              <img src={unarchive} alt='unarchive button' />
              <span>Unarchive</span>
            </button>
          )}
          <button onClick={handleDelete}>
            <img src={deleteButton} alt='delete button' />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
}
