import React from 'react';
import './LangSelector.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeLang } from '../../../slices/langSlice';
import getFlags from './Flags';

export function LangSelector() {
  const selectedLang = useSelector(state => state.langs.lang);
  const dispatch = useDispatch();

    return (
        <div className="lang-selector">
          {getFlags(selectedLang).map((lang) => (
              <button key={lang.value} aria-label={lang.value} className="lang-btn" onClick={ (e) => dispatch( changeLang(lang.value) ) }>
                {lang.img}
              </button>
          ))}
        </div>
    )
}