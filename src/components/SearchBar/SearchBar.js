import React, {useState} from 'react';
import { SearchOutlined } from '@ant-design/icons';
import './SearchBar.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchBooks } from '../../actions/BookActions';

export function SearchBar() {
  let history = useHistory();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (search !== ""){
      dispatch( fetchBooks(search) );
    }
    // history push is for changing the route to show books
    history.push('/');
  }

    return (
        <form className="App-search" onSubmit={handleSubmit}>
            <SearchOutlined className="search-icon" />
            <input 
                type="text" 
                className="search-input" 
                placeholder="Buscar libros por palabra clave / título / autor" 
                onChange={ (e) => setSearch(e.target.value)}
            />
            
        </form>
    )
}