/* CSS FILES */

import '../main.scss';
import '../reset.css';
import 'react-quill/dist/quill.snow.css';

/* REACT */

import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';  //JavaScript Library downloaded from https://quilljs.com/
import DOMPurify from 'dompurify';  //JavaScript Library downloaded from https://www.npmjs.com/package/dompurify 

/* FIREBASE  */
import db from '../firebase';
import { doc, onSnapshot, updateDoc, deleteField } from 'firebase/firestore';


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
        alert("Added Skills!");
    }

    return(
        <div id='skills-form'>
            <head>
                <meta charSet='utf-8'></meta>
                <script>
                    <link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"/>
                </script>
            </head>

            <form onSubmit={handleSubmitFunction} className='cv-form'>
                <h2>Add some skills to highlight</h2>
                <br></br>
                <p style={{fontSize: '0.7em'}}>Editing this textbox will replace the old ones, including delete!</p>
                <br></br>
                <section style={{backgroundColor: 'white', width:"100%"}} data-testid="text-input">
                    <ReactQuill theme='snow' modules={modules} value={text} onChange={handleTextChange} />
                </section>
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
            <h2 className='form-component-subheader' >Skills</h2>
            <br></br>
            <SkillsForm/>
            <br></br>
            <br></br>
            <h5>Your Skills Listed</h5>
            <br></br>
            <div className='edit-individual-component-div'>
                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(skill)}}/>
            </div>
            {skill === undefined ? null: <DeleteComponent/> }
        </div>
    );
}


async function DeleteFromDB(){
    await updateDoc(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), { 
        Skills : deleteField(),
    });
    alert('Deleted Skills Section!');
}


const DeleteComponent = () => {
    return(
        <div className='delete-button'>
            <button onClick={DeleteFromDB}>Delete</button>
        </div>
    );
}
 
 
export default Skills;