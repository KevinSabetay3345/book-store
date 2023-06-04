import React, {useState} from 'react';
import { SearchOutlined } from '@ant-design/icons';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchBooks } from '../../../slices/bookSlice';

export function SearchBar() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (search !== ""){
      dispatch( fetchBooks(search) );
      navigate('/');
    }
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