import React, { useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import './SearchBar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../../hooks/useTranslation';
import ReactGA from 'react-ga4';

export function SearchBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const t = useTranslation()

  useEffect(() => {
    const searchUrl = search.replaceAll(' ', '%20')
    if (location.pathname !== "/"+searchUrl) {
      setSearch("")  
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  function handleSubmit(e) {
    e.preventDefault();
    if (search !== ""){
      navigate('/'+search);
      ReactGA.event("search", { search_term: search });
    }
  }

    return (
        <form className="App-search" onSubmit={handleSubmit}>
            <SearchOutlined className="search-icon" onClick={handleSubmit} />
            <input
                value={search}
                type="text" 
                className="search-input" 
                data-test="search-input" 
                placeholder={t("Buscar libros por palabra clave / título / autor")} 
                onChange={ (e) => setSearch(e.target.value)}
            />
        </form>
    )
}