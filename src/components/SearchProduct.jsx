// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link } from "react-router-dom";

const SearchProduct = () => {
    const [codigo, setCodigo] = useState('')

    const handleChange = (event) => {
        setCodigo(event.target.value);
    };
    const handleSearch = () => {
        setCodigo('');
    };

    return (
        <div>
            <div className='container-search me-3 d-flex gap-2'>
                <input
                    type="text"
                    id='codigo'
                    placeholder='0.000.000.000'
                    value={codigo}
                    onChange={handleChange}
                />
                <Link to={`/item/${codigo}`}><button className='btn btn-outline-success' onClick={handleSearch} >Buscar</button></Link>
            </div>
        </div>
    );
}

export default SearchProduct;