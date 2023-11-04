import React from 'react';
import './Categories.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../../hooks/useTranslation';
import ReactGA from 'react-ga4';

export function Categories(){
    const navigate = useNavigate();
    const t = useTranslation();
    
    function handleClick(e){
        navigate("/"+e.target.value);
        ReactGA.event("select_category", { category: e.target.value });
    }

    const categories = [
        {
            value: t("Animales"),
            label: t("Animales y naturaleza")
        },
        {
            value: t("Ciencia"),
            label: t("Ciencia")
        },
        {
            value: t("Ficción"),
            label: t("Ciencia ficción")
        },
        {
            value: t("Cocina"),
            label: t("Cocina")
        },
        {
            value: t("Comics"),
            label: t("Comics")
        },
        {
            value: t("Tecnología"),
            label: t("Computación y tecnología")
        },
        {
            value: t("Deportes"),
            label: t("Deportes")
        },
        {
            value: t("Derecho"),
            label: t("Derecho")
        },
        {
            value: t("Educación"),
            label: t("Educación")
        },
        {
            value: t("Filosofía"),
            label: t("Filosofía")
        },
        {
            value: t("Historia"),
            label: t("Historia")
        },
        {
            value: t("Matemática"),
            label: t("Matemática")
        },
        {
            value: t("Novela"),
            label: t("Novela")
        },
        {
            value: t("Política"),
            label: t("Política")
        },
    ]
    
    return (
        <div className="categories-list">
            { categories.map(category => (
                <button
                    data-test="categories"
                    className="btn"
                    key={category.value}
                    value={category.value}
                    onClick={ handleClick }
                >
                    { category.label }
                </button>
            ))}
        </div>
    )

}
