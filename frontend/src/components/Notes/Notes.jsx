import Note from '../Note/Note';
import styles from './Notes.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getFilteredNotes, createNote, setIsEditing} from '../../redux/actions';
import logo from '../../assets/img/logo.png';
import newNote from '../../assets/img/newNote.png';
import { urlMaker } from '../../helpers/urlMaker';

export default function Notes() {
  const notes = useSelector((state) => state.filteredNotes);
  const userData = useSelector((state) => state.userId);
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    const URL = urlMaker(filters);
    dispatch(getFilteredNotes(URL));
  }, [filters]);

  const handleNewNote = async () => {
    await dispatch(createNote(userData.userId))
    const URL = urlMaker(filters);
    await dispatch(getFilteredNotes(URL));
    const noteId = notes[notes.length-1].id
    await dispatch(setIsEditing(noteId,true))
  };

  const handleFilters = (event) => {
    const value = event.target.value
    if (event.target.name === 'statusFilter') {
      console.log(value);
    }
  }
  
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
            <select name = "statusFilter" className={styles.select} onChange={handleFilters}>
              <option value='active'>Active</option>
              <option value='archived'>Archived</option>
              <option value='all'>All</option>
            </select>
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
