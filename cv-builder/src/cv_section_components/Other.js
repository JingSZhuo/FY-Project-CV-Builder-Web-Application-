/* CSS FILES */

import '../main.scss';
import '../reset.css';
import 'react-quill/dist/quill.snow.css';

/* REACT */

import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';

/* FIREBASE  */
import db from '../firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';


function OtherForm () {

    const [text, setText] = useState('');

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, false]}],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        ],
    }

    const handleTextChange = (value) => {
        setText(value);
    }

    async function handleSubmitFunction (event) {
        event.preventDefault();
        const otherHeaderTitle = DOMPurify.sanitize(document.getElementById('heading').value);
        await updateDoc(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), { 
            OtherTitle : otherHeaderTitle,
            Other: text
        });
    }

    return(
        <div id='skills-form'>
            <head>
                <meta charSet='utf-8'></meta>
                <script>
                    <link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"/>
                </script>
            </head>

            <form onSubmit={handleSubmitFunction}>
                <h4>Add a extra section (optional)</h4>
                <br></br>
                <h4>Header Title </h4>
                <input id='heading' type='text' placeholder='Add a header'/>
                <br></br>
                <br></br>
                <p>Editing this textbox will replace the old ones..</p>
                <br></br>
                <ReactQuill id='otherTextBox' theme='snow' modules={modules} value={DOMPurify.sanitize(text)} onChange={handleTextChange} />
                <br></br>
                <br></br>
                <input id='submit' type='submit' value={'Add/Edit'} />
                <br></br>
                <br></br>
            </form>
        </div>
    )
}

const Other = () => {

    const [header, setHeader] = useState('');
    const [other, setOther] = useState(''); 

    useEffect(() => {
        ReadFromDB();
        setValueFromDatabase();
    }, [header, other]);

    async function ReadFromDB() {
        onSnapshot(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), (doc) => {
            setOther(doc.data()['Other']);
            setHeader(doc.data()['OtherTitle']);
        });
    }
    function setValueFromDatabase() {
        document.getElementById('heading').value = header;
        document.getElementById('otherTextBox').value = other;
    }

    return ( 
        <div id='skills-form'>
            <br></br>
            <OtherForm/>
            <br></br>
            <h1>{header}</h1>
            <br></br>
            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(other)}}/>
        </div>
    );
}
 
export default Other;