/*
Este componente hubiese estado mejor si la API de Google Books tenia una query para obtener las categorias.
This component would be better if Google Books API has a query to get the categories.
*/

import React, { useEffect, useState, useRef } from 'react';
import './Categories.css';
import { Link } from 'react-router-dom';
import { fetchBooks } from '../../../actions/BookActions';
import {useDispatch, useSelector} from 'react-redux';

export function Categories(){
    const [ selected, setSelected ] = useState("");
    const dispatch = useDispatch();
    const isLoaded = useSelector(state => state.books.isLoaded);
    const searchFromCategorie = useRef(false);

    /* when search is made with searchBar, categorie stops selecting */
    useEffect( () => {
        if (!searchFromCategorie.current && !isLoaded) {
            setSelected("");
        }
        searchFromCategorie.current = false;
    }, [isLoaded])

    function handleClick(e){
        searchFromCategorie.current = true;
        setSelected(e.target.value);
        dispatch( fetchBooks(e.target.value) );
    }

    return (
        <Link to="/" className="link">
            <div className="categories-list">
                <button className={ selected === "animales" ? "btn selected" : "btn" } onClick={ handleClick } value="animales"> Animales y naturaleza</button>
                <button className={ selected === "ciencia" ? "btn selected" : "btn" } onClick={ handleClick } value="ciencia"> Ciencia</button>
                <button className={ selected === "ficcion" ? "btn selected" : "btn" } onClick={ handleClick } value="ficcion">Ciencia ficción</button>
                <button className={ selected === "cocina" ? "btn selected" : "btn" } onClick={ handleClick } value="cocina"> Cocina</button>
                <button className={ selected === "comics" ? "btn selected" : "btn" } onClick={ handleClick } value="comics"> Comics</button>
                <button className={ selected === "tecnologia" ? "btn selected" : "btn" } onClick={ handleClick } value="tecnologia"> Computación y tecnología</button>
                <button className={ selected === "deportes" ? "btn selected" : "btn" } onClick={ handleClick } value="deportes"> Deportes</button>
                <button className={ selected === "derecho" ? "btn selected" : "btn" } onClick={ handleClick } value="derecho"> Derecho</button>
                <button className={ selected === "educacion" ? "btn selected" : "btn" } onClick={ handleClick } value="educacion"> Educación</button>
                <button className={ selected === "filosofia" ? "btn selected" : "btn" } onClick={ handleClick } value="filosofia"> Filosofía</button>
                <button className={ selected === "historia" ? "btn selected" : "btn" } onClick={ handleClick } value="historia"> Historia</button>
                <button className={ selected === "matematica" ? "btn selected" : "btn" } onClick={ handleClick } value="matematica"> Matemática</button>
                <button className={ selected === "novela" ? "btn selected" : "btn" } onClick={ handleClick } value="novela"> Novela</button>
                <button className={ selected === "politica" ? "btn selected" : "btn" } onClick={ handleClick } value="politica"> Política</button>
            </div>
        </Link>
  )

}
