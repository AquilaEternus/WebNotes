import React, { useState, useEffect } from 'react';
import {
    Link, useHistory
} from 'react-router-dom';
import { connect } from 'react-redux';
import { addNote } from '../actions/noteActions';
import { clearErrors } from '../actions/errorActions';
import { usePrevious } from '../helper/customHooks';
import { Editor } from '@tinymce/tinymce-react';
import Confirmation from '../components/modals/Confirmation';
import ErrorBanner from '../components/error/ErrorBanner';

const AddNote = (props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [msg, setMsg] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [isPrivate, setIsPrivate] = useState(true);
    const prevError = usePrevious(props.error);
    const history = useHistory();
    const prevLoc = usePrevious(history.location.pathname);

    useEffect(() => {
        window.scrollTo(0,0);
        if (prevError !== props.error) {
            if (props.error.id === 'ADD_NOTE_FAIL' && !props.error.status === 401) {
                setMsg(props.error.msg.msg)
            } else {
                setMsg(null);
            }
        }
        if (prevLoc !== history.location.pathname) {
            setMsg(null);
            props.clearErrors();
        }
    }, [props.error]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleEditorChange = (content, editor) => {
        setContent(content)
    }

    const handleSubmit = (e) => {
        // e.preventDefault();
        props.addNote({ title, content, isPrivate });
        setToggle(!toggle);
    }

    const changePrivateStatus = () => {
        if (isPrivate) {
            return <i className="material-icons">visibility_off</i>
        }
        return <i className="material-icons">visibility</i>
    }

    return (
        <div className="container main-container">
            <Confirmation toggle={toggle} 
                        header="Confirm Save" 
                        text="Are you sure you want to save this note?" 
                        decline={() => setToggle(!toggle)}
                        accept={handleSubmit}
            />
            <div className="row">
                <Link className="waves-effect btn-flat btn-flat-custom" to="/dashboard">
                    <i className="material-icons left">chevron_left</i>Back to Dashboard
                </Link>
                <form onSubmit={e => e.preventDefault()} className="col s12">
                    <div className="row center-align">
                        <h4 className="header-color">Add Note</h4>
                    </div>
                    <ErrorBanner msg={msg} />
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="title" type="text" name="title" value={title} onChange={handleTitleChange} />
                            <label htmlFor="title">Note Title</label>
                        </div>
                    </div>
                    <div className="row">
                        <Editor
                            tinymceScriptSrc="https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js"
                            init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                `undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help`
                            }}
                            onEditorChange={handleEditorChange}
                            value={content}
                        />
                    </div>
                    <div className="row">
                        <button onClick={() => setIsPrivate(!isPrivate)} className="waves-effect btn-flat">
                            {changePrivateStatus()} 
                        </button> 
                        {isPrivate ? <em style={{color: "grey"}}>Viewable by Only You</em> : <em style={{color: "grey"}}>Public</em>}
                    </div>
                    <div className="row">
                        <div className="col s2 m3"></div>
                        <button className="col s8 m6 btn blue waves-effect waves-light" onClick={() => setToggle(!toggle)} type="submit">Add</button>
                        <div className="col s2 m3"></div>
                    </div>
                </form>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        error: state.error
    }
}

export default connect(mapStateToProps, { addNote, clearErrors })(AddNote);