import React from 'react';
import './LangSelector.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeLang } from '../../../slices/langSlice';
import getFlags from './Flags';
import ReactGA from 'react-ga4';

export function LangSelector() {
  const selectedLang = useSelector(state => state.langs.lang);
  const dispatch = useDispatch();

  function selectLang(lang) {
    dispatch( changeLang(lang) )
    ReactGA.event("change_lang", { lang })
  }

  return (
      <div className="lang-selector">
        {getFlags(selectedLang).map((lang) => (
            <button key={lang.value} aria-label={lang.value} className="lang-btn" onClick={ () => 
            selectLang(lang.value) }>
              {lang.img}
            </button>
        ))}
      </div>
  )
}