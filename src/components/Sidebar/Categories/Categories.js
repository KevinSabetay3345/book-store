import React from 'react';
import './Categories.css';
import { Link } from 'react-router-dom';
import { fetchBooks, selectCategory } from '../../../slices/bookSlice';
import { useDispatch, useSelector} from 'react-redux';
import { useTranslation } from '../../../hooks/useTranslation';

export function Categories(){
    const dispatch = useDispatch();
    const selected = useSelector(state => state.books.categorySelected);
    const t = useTranslation();

    function handleClick(e){
        dispatch( selectCategory(e.target.value) );
        dispatch( fetchBooks(e.target.value) );
    }

    return (
        <Link to="/" className="link">
            <div className="categories-list">
                <button className={ selected === "animales" ? "btn selected" : "btn" } onClick={ handleClick } value="animales"> { t("Animales y naturaleza") }</button>
                <button className={ selected === "ciencia" ? "btn selected" : "btn" } onClick={ handleClick } value="ciencia"> { t("Ciencia") }</button>
                <button className={ selected === "ficcion" ? "btn selected" : "btn" } onClick={ handleClick } value="ficcion">{ t("Ciencia ficción") }</button>
                <button className={ selected === "cocina" ? "btn selected" : "btn" } onClick={ handleClick } value="cocina"> { t("Cocina") }</button>
                <button className={ selected === "comics" ? "btn selected" : "btn" } onClick={ handleClick } value="comics"> { t("Comics") }</button>
                <button className={ selected === "tecnologia" ? "btn selected" : "btn" } onClick={ handleClick } value="tecnologia"> { t("Computación y tecnología") }</button>
                <button className={ selected === "deportes" ? "btn selected" : "btn" } onClick={ handleClick } value="deportes"> { t("Deportes") }</button>
                <button className={ selected === "derecho" ? "btn selected" : "btn" } onClick={ handleClick } value="derecho"> { t("Derecho") }</button>
                <button className={ selected === "educacion" ? "btn selected" : "btn" } onClick={ handleClick } value="educacion"> { t("Educación") }</button>
                <button className={ selected === "filosofia" ? "btn selected" : "btn" } onClick={ handleClick } value="filosofia"> { t("Filosofía") }</button>
                <button className={ selected === "historia" ? "btn selected" : "btn" } onClick={ handleClick } value="historia"> { t("Historia") }</button>
                <button className={ selected === "matematica" ? "btn selected" : "btn" } onClick={ handleClick } value="matematica"> { t("Matemática") }</button>
                <button className={ selected === "novela" ? "btn selected" : "btn" } onClick={ handleClick } value="novela"> { t("Novela") }</button>
                <button className={ selected === "politica" ? "btn selected" : "btn" } onClick={ handleClick } value="politica"> { t("Política") }</button>
            </div>
        </Link>
  )

}
