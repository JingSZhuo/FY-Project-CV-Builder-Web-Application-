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


function SkillsForm () {

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
        await updateDoc(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), { 
            Skills: text
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
                <h4>Add some skills to highlight</h4>
                <br></br>
                <p>Editing this textbox will replace the old ones..</p>
                <br></br>
                <ReactQuill theme='snow' modules={modules} value={text} onChange={handleTextChange} />
                <br></br>
                <br></br>
                <input id='submit' type='submit' value={'Add/Edit Skills'} />
                <br></br>
                <br></br>
            </form>
        </div>
    )
}

const Skills = () => {

    const [skill, setSkills] = useState(''); 

    useEffect(() => {
        ReadFromDB();
    }, []);

    async function ReadFromDB() {
        onSnapshot(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), (doc) => {
            setSkills(doc.data()['Skills']);
        });
    }


    return ( 
        <div id='skills-form'>
            <h1>Skills</h1>
            <br></br>
            <SkillsForm/>
            <br></br>
            <br></br>
            <h5>Your Skills Listed</h5>
            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(skill)}}/>
        </div>
    );
}
 
export default Skills;