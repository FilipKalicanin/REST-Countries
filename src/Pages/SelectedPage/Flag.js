import React from 'react'

function Flag({ flagURL }) {

    return (
        <div className='flag-container'>
            <img src={flagURL} alt='selecteg-country-flag' className='selected-country-flag' />
        </div>
    )
}

export default Flag
