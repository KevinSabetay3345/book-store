import React, { useState } from 'react';
import './BodyDescription.css';
import PropTypes from 'prop-types';

export const BodyDescription = ( { description } ) => {
    const [seeMore, setSeeMore] = useState(true);

    if (typeof description !== 'undefined') {
        if (description.length > 150) {
            return (
                <p>
                    {seeMore ? description.substring(0,150) : description} 
    
                    <button className="see-more" onClick={ () => setSeeMore(prevState => !prevState) }>
                        { seeMore ? "ver más" : "ver menos" }
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