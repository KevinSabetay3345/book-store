import React, {useState, useEffect, useRef} from 'react';
import { SearchOutlined } from '@ant-design/icons';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../../slices/bookSlice';

export function SearchBar() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const isLoaded = useSelector(state => state.books.isLoaded);
  const searchFromSearchbox = useRef(false);

  /* when search is made with categories, searchbox = "" */
  useEffect( () => {
      if (!searchFromSearchbox.current && !isLoaded) {
          setSearch("");
      }
      searchFromSearchbox.current = false;
  }, [isLoaded])

  function handleSubmit(e) {
    e.preventDefault();
    searchFromSearchbox.current = true;
    if (search !== ""){
      dispatch( fetchBooks(search) );
    }
    navigate('/');
  }

    return (
        <form className="App-search" onSubmit={handleSubmit}>
            <SearchOutlined className="search-icon" />
            <input 
                value={search}
                type="text" 
                className="search-input" 
                placeholder="Buscar libros por palabra clave / título / autor" 
                onChange={ (e) => setSearch(e.target.value)}
            />
        </form>
    )
}