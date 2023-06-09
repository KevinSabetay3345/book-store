import React, { useState } from 'react';
import './BodyDescription.css';
import PropTypes from 'prop-types';
import { useTranslation } from '../../../../../../../hooks/useTranslation';


export const BodyDescription = ( { description } ) => {
    const [seeMore, setSeeMore] = useState(true)
    const t = useTranslation()

    if (description !== "") {
        if (description.length > 150) {
            return (
                <p>
                    {seeMore ? description.substring(0,150) : description} 
    
                    <button className="see-more" onClick={ () => setSeeMore(prevState => !prevState) }>
                        { seeMore ? t("ver más") : t("ver menos") }
                    </button>
                </p>
            );
        }
        return <p>{ description }</p>;
    }
    return <></>;
}

BodyDescription.propTypes = {
    description: PropTypes.string
}