import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrNote, editNote } from '../actions/noteActions';
import { clearErrors } from '../actions/errorActions';
import { usePrevious } from '../helper/customHooks';
import { Editor } from '@tinymce/tinymce-react';
import ErrorBanner from '../components/error/ErrorBanner';
import Loading from '../components/views/Loading';
import Confirmation from '../components/modals/Confirmation';
import M from 'materialize-css/dist/js/materialize.min.js';
 
const EditNote = (props) => {
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState('');
    const [msg, setMsg] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [isPrivate, setIsPrivate] = useState(null);
    const { note_id } = useParams();
    const prevError = usePrevious(props.error);
    const history = useHistory();
    const prevLoc = usePrevious(history.location.pathname);
   

    useEffect(()=> {
        M.AutoInit();    
        // if (!props.note) {
        props.getCurrNote(note_id);
        // }  
        if (prevError !== props.error) {
            if (props.error.id === 'EDIT_NOTE_FAIL' && !props.error.status === 401) {
                // console.log(props.error)
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

    const changePrivateStatus = () => {
        if (isPrivate === null ) {
            if (props.note.isPrivate) {
                return <i className="material-icons">visibility_off</i>
            }
            return <i className="material-icons">visibility</i>
        } else {
            if (isPrivate) {
                return <i className="material-icons">visibility_off</i>
            }
            return <i className="material-icons">visibility</i>
        }       
    }

    const changePrivateStatusText = () => {
        if (isPrivate === null ) {
            return props.note.isPrivate ? <em style={{color: "grey"}}>Viewable by Only You</em> : <em style={{color: "grey"}}>Public</em>
        } else {
            return isPrivate ? <em style={{color: "grey"}}>Viewable by Only You</em> : <em style={{color: "grey"}}>Public</em>
        }
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleEditorChange = (content, editor) => {
        setContent(content)
    }

    const handleIsPrivateChange = () => {
        if (isPrivate !== null) {
            setIsPrivate(!isPrivate);
        } else {
            setIsPrivate(!props.note.isPrivate)
        }
    }

    const handleSubmit = () => {
        setToggle(!toggle)
        let privacyStatus;
        if (isPrivate === null) {
            privacyStatus = props.note.isPrivate;
        } else {
            privacyStatus = isPrivate;
        }
        if (!content && !title) {
            props.editNote(note_id, props.note.title, props.note.text, privacyStatus);
        } else if (!title) {
            props.editNote(note_id, props.note.title, content, privacyStatus);
        } else if (!content) {
            props.editNote(note_id, title, props.note.text, privacyStatus);
        } else {
            props.editNote(note_id, title, content, privacyStatus);
        }
    }

    if (props.loading && !props.note) {
        return (<div className="container">
        <Loading />
    </div>)
    }
    else if (!props.loading && props.note){
        return (
            <div className="container main-container">
                <Link className="waves-effect waves-blue btn-flat btn-flat-custom" to="/dashboard/mynotes">
                    <i className="material-icons left">chevron_left</i>Back to MyNotes
                </Link>
                <Confirmation toggle={toggle} 
                        header="Confirm Edit" 
                        text="Are you sure you want to edit this note?" 
                        decline={() => setToggle(!toggle)}
                        accept={handleSubmit}
                    />

                <div className="row">
                    <form onSubmit={e => e.preventDefault()} className="col s12">
                        <div className="row center-align">
                            <h4 className="header-color">Edit Note</h4>
                        </div>
                        <ErrorBanner msg={msg} />
                        
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="title" type="text" name="title" value={title || props.note.title} onChange={handleTitleChange} />
                            </div>
                        </div>
                        <div className="row">
                            <Editor
                                tinymceScriptSrc={process.env.PUBLIC_URL + '/js/tinymce.min.js'}
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
                                value={content || props.note.text}
                            />
                        </div>
                        <div className="row">
                            <button onClick={() => handleIsPrivateChange()} className="waves-effect btn-flat">
                                {changePrivateStatus()} 
                            </button> 
                            {changePrivateStatusText()}
                        </div>
                        <div className="row">
                            <div className="col s2 m3"></div>
                            <button className="col s8 m6 btn blue" onClick={() => setToggle(!toggle)}>Edit</button>
                            <div className="col s2 m3"></div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
    else {
        return (null);
    }
}

const mapStateToProps = (state) => {
    return {
        note: state.note.currNote,
        loading: state.note.loading,
        error: state.error
    }
}

export default connect(mapStateToProps, { getCurrNote, clearErrors, editNote })(EditNote);