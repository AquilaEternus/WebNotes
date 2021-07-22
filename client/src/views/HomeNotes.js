import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearQuery, getQueriedNotes } from '../actions/noteActions';
import { usePrevious } from '../helper/customHooks';
import NotePages from '../components/pager/NotePages';
import Search from '../components/Search';

const HomeNotes = (props) => {
    const history = useHistory();
    const search = useLocation().search;
    const queryParam = new URLSearchParams(search).get('q');
    const [query, setQuery] = useState(queryParam || '');
    const prevQuery = usePrevious(query);
    const prevLoc = usePrevious(history.location.pathname)
    const pageParam = new URLSearchParams(search).get('page') || 1;

    useEffect(() => {
        window.scrollTo(0, 0);
        props.clearQuery()
        props.getQueriedNotes(query, pageParam)
        if (query) {
            if (query !== prevQuery && prevLoc === history.location.pathname) {
                props.getQueriedNotes(query, 1)
                history.push(history.location.pathname + `?q=${query}&page=1`);
            }
        } else {
            history.replace(history.location.pathname)
        }
    }, [query, prevQuery, prevLoc, queryParam, pageParam, history, search]);

    if (queryParam) {
        return (
        <div className="container main-container">
            <div className="row"></div>
            <Search query={queryParam} setQuery={setQuery} />
            <NotePages getNotes={props.getQueriedNotes} />
        </div>);
    } else if (!queryParam) {
        return (
        <div className="container main-container">
            <div className="row center-align">
                <h5 className="blue-text" style={{fontFamily: 'Lobster'}}>
                    Search for Notes
                </h5>
            </div>
            <Search query={query} setQuery={setQuery} />
            <div className="row center-align">
                <img 
                    alt="Notes by the Community"
                    src={'/public/default/community_home.png'} 
                    style={{width: '60%', textAlign: 'center'}}
                />
            </div>
        </div>);
    }
}

export default connect(null, { getQueriedNotes, clearQuery })(HomeNotes);