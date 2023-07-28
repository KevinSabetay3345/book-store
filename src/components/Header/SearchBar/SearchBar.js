import React, {useState} from 'react';
import { SearchOutlined } from '@ant-design/icons';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchBooks } from '../../../slices/bookSlice';
import { useTranslation } from '../../../hooks/useTranslation';

export function SearchBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const t = useTranslation();

  function handleSubmit(e) {
    e.preventDefault();
    if (search !== ""){
      dispatch( fetchBooks(search) );
      navigate('/'+search);
    }
  }

    return (
        <form className="App-search" onSubmit={handleSubmit}>
            <SearchOutlined className="search-icon" onClick={handleSubmit} />
            <input
                value={search}
                type="text" 
                className="search-input" 
                placeholder={t("Buscar libros por palabra clave / título / autor")} 
                onChange={ (e) => setSearch(e.target.value)}
            />
        </form>
    )
}