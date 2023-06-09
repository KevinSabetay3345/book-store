import { useSelector } from 'react-redux'
import EN from '../langs/EN'
import PT from '../langs/PT'
import { useCallback } from 'react';

const useTranslation = () => {
  const lang = useSelector(state => state.langs.lang);
  
  const translate = useCallback((text) =>  {
    if (lang === "EN") {
      return (EN[text] === undefined) ? text : EN[text]
    } else if (lang === "PT") {
      return (PT[text] === undefined) ? text : PT[text]
    }
    return text
  }, [lang])

  return translate
}

export { useTranslation }