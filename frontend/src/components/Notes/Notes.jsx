import Note from '../Note/Note';
import styles from './Notes.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  getFilteredNotes,
  createNote,
  setIsEditing,
  setStatusFilter,
  setCategoriesArray,
  setUserId
} from '../../redux/actions';
import logo from '../../assets/img/logo.png';
import newNote from '../../assets/img/newNote.png';
import { urlMaker } from '../../helpers/urlMaker';
//import { categoryFilters } from '../../helpers/categoryFilters';

export default function Notes() {
  const notes = useSelector((state) => state.filteredNotes);
  const userData = useSelector((state) => state.userId);
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const categoryFilters = useSelector((state) => state.categoriesArray);
  const [isFirstRender, setIsFirstRender] = useState(true)
  //const storedUserData = sessionStorage.getItem('userData'); 

  useEffect(() => {
    async function run() {
      const URL = urlMaker(filters);
      await dispatch(getFilteredNotes(URL)); 
      //await dispatch(setUserId(storedUserData.userId))
      
    if (isFirstRender) {
      let categoriesArray = ['All']
      notes.forEach(note => {
        note.category.forEach((tag => {
          if(!categoriesArray.includes(tag)) categoriesArray.push(tag)
        }))
      })
      await dispatch(setCategoriesArray(categoriesArray))
      setIsFirstRender(false)
    }
  }
  run()
  }, [filters]);



  const handleNewNote = async () => {
    await dispatch(createNote(userData.userId));
    const URL = urlMaker(filters);
    await dispatch(getFilteredNotes(URL));
    const noteId = notes[notes.length - 1].id;
    await dispatch(setIsEditing(noteId, true));
  };

  const handleFilters = async (event) => {
    let filterValue;
    let filtersCopy = filters;
    const value = event.target.value;
    if (event.target.name === 'statusFilter') {
      switch (value) {
        case 'active':
          filterValue = true;
          break;
        case 'archived':
          filterValue = false;
          break;
        case 'all':
          filterValue = 'all';
          break;
        default:
          filterValue = true;
      }
      filtersCopy = { ...filtersCopy, isActive: filterValue };
    } else if (event.target.name === 'categoryFilter') {
      filterValue = value;
      filtersCopy = { ...filtersCopy, category: filterValue };
    }
    dispatch(setStatusFilter(filtersCopy));
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterPanel}>
        <div className={styles.upperDiv}>
          <div className={styles.upperSubDiv}>
            <img src={logo} alt='logo' />
            <h2>Welcome {userData.username}!</h2>
            <button className={styles.newNoteButton} onClick={handleNewNote}>
              <img src={newNote} alt='new note button' />
              <span>New note</span>
            </button>
          </div>
          <div className={styles.filtersDiv}>
            <div className={styles.selectSection}>
              <div className={styles.spanSelect}>
              <span>Filter by status: </span>
              <select
                name='statusFilter'
                className={styles.select}
                onChange={handleFilters}
              >
                <option value='active'>Active</option>
                <option value='archived'>Archived</option>
                <option value='all'>All</option>
              </select>
              </div>
              <div className={styles.spanSelect}>
              <span>Filter by tag: </span>
              <select
                name='categoryFilter'
                className={styles.select}
                onChange={handleFilters}
              >
                {categoryFilters.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.notesContainer}>
        {notes.map((note) => {
          return (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              detail={note.detail}
              category={note.category}
              isActive={note.isActive}
              createdAt={note.createdAt}
              updatedAt={note.updatedAt}
              UserId={userData.userId}
            />
          );
        })}
      </div>
    </div>
  );
}
