import Note from '../Note/Note';
import styles from './Notes.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getFilteredNotes,
  addCreatingNote,
  setStatusFilter,
  setCategoriesArray,
  login,
  logout,
} from '../../redux/actions';
import logo from '../../assets/img/logo.png';
import logoutImage from '../../assets/img/logout.png';
import { urlMaker } from '../../helpers/urlMaker';
import axios from 'axios';
import Loading from '../Loading/Loading';

//import { categoryFilters } from '../../helpers/categoryFilters';

export default function Notes() {
  const notes = useSelector((state) => state.filteredNotes);
  // eslint-disable-next-line no-unused-vars
  const [forceRender, setForceRender] = useState(false); //esto es solo para forzar un re render. Cambiar un local state fuerza un re render
  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const categoryFilters = useSelector((state) => state.categoriesArray);
  //const [isFirstRender, setIsFirstRender] = useState(true);
  const localStorageData = localStorage.getItem('userData');
  const userDataObject = JSON.parse(localStorageData);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(login(userDataObject));
  }, []);

  useEffect(() => {
    async function run() {
      if (filters.userId) {
        const URL = urlMaker(filters);
        setIsLoading(true);
        await dispatch(getFilteredNotes(URL));
        setIsLoading(false);
      }
    }
    run();
  }, [filters]);

  useEffect(() => {
    async function run() {
      let noteArray = [];
      await notes.forEach((note) => {
        noteArray.push(note.id);
      });
      let categoriesArray = ['All'];
      const { data } = await axios.post('categoriesbynote', {
        notes: noteArray,
      });
      console.log();
      await data.forEach((tag) => {
        categoriesArray.push(tag.name);
      });
      dispatch(setCategoriesArray(categoriesArray));
    }
    run();
  }, [notes, notes.Categories]);

  const handleNewNote = async () => {
    await dispatch(addCreatingNote(userData.userId));
    setForceRender((prev) => !prev);
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

  const handleLogout = async () => {
    dispatch(logout());
    localStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterPanel}>
        <div className={styles.filtersDiv}>
          <button className={styles.newNoteButton} onClick={handleNewNote}>
            <img src={logo} alt='new note button' />
            <span>New note</span>
          </button>
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
      <div className={styles.rightPanel}>
        <div className={styles.navbar}>
          <div className={styles.welcomeLogout}>
            <h2>{userData?.username}</h2>
            <button className={styles.logoutButton} onClick={handleLogout}>
              <img src={logoutImage} alt='logout button' />
              <span>Logout</span>
            </button>
          </div>
        </div>
        {isLoading ? (
          <div className={styles.loadingDiv}>
            <div className={styles.loadingBackground}>
              <h3>Loading...</h3>
              <Loading></Loading>
            </div>
          </div>
        ) : (
          <>
            {notes.length === 0 ? (
              <div className={styles.notesContainer}>
                <div className={styles.noNotes}>
                  <h1 className={styles.title}></h1>No notes! Create a new
                  one...
                </div>
              </div>
            ) : (
              <div className={styles.notesContainer}>
                {notes.map((note) => {
                  return (
                    <Note
                      key={note.id}
                      id={note.id}
                      title={note.title}
                      detail={note.detail}
                      Categories={note.Categories}
                      isActive={note.isActive}
                      createdAt={note.createdAt}
                      updatedAt={note.updatedAt}
                      UserId={userData?.userId}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
