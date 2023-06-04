import React from 'react';
import './Categories.css';
import { Link } from 'react-router-dom';
import { fetchBooks, selectCategory } from '../../../slices/bookSlice';
import { useDispatch, useSelector} from 'react-redux';

export function Categories(){
    const dispatch = useDispatch();
    const selected = useSelector(state => state.books.categorySelected);

    function handleClick(e){
        dispatch( selectCategory(e.target.value) );
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
