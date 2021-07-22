import React, { useEffect, useState } from 'react';

const Search = (props) => {
    const [query, setQuery] = useState(props.query);

    useEffect(() => {
        const timeoutReq = setTimeout(() => {
            props.setQuery(query)
        }, 800)
        return () => {
            clearTimeout(timeoutReq);
        }
    }, [query, props])

    return (
        <div className="row">
             <form className="col s12">
                <div className="row">
                    <div className="input-field col s12">
                    <i className="material-icons prefix grey-text">search</i>
                        <input id="search" 
                            name="search" 
                            placeholder="  ex: @user; title" 
                            type="search" 
                            value={query} 
                            onChange={(e) => setQuery(e.target.value)} 
                        />
                        {/* <label htmlFor="search">Search</label> */}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Search;