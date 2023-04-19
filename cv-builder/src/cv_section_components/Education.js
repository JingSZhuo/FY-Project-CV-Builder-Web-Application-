/* CSS FILES */
import '../main.scss';
import '../reset.css';

/* FIREBASE */
import db from '../firebase';
import { arrayUnion, doc, updateDoc, onSnapshot } from 'firebase/firestore';

/* REACT  */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/* NPM PACKAGES */
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';

//* Add Education to Database */

function AddEducation () {

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
        console.log(text)
    }

    
    /* Adds to Database + adds onto array */
    async function handleSubmitEducation (event) {
        event.preventDefault();
        const Institution = DOMPurify.sanitize(document.getElementById("institution").value);
        const city = DOMPurify.sanitize(document.getElementById("city").value);
        const course = DOMPurify.sanitize(document.getElementById("course").value);
        const startdate = DOMPurify.sanitize(document.getElementById("startdate").value);
        const enddate = DOMPurify.sanitize(document.getElementById("enddate").value);

        await updateDoc(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), { 
            Education : arrayUnion(
                    {
                        Institution: Institution,
                        City: city,
                        Course: course,
                        StartDate: startdate,
                        EndDate: enddate,
                        Description: text,
                    }
            ) 
        });
    }


    return(
        <div id='education-form'>
            <head>
                <meta charSet='utf-8'></meta>
                <script>
                    <link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"/>
                </script>
            </head>
            <form onSubmit={handleSubmitEducation}>
                <input id='institution' type='text' placeholder='school or university' name='institution'/>
                <br></br>
                <br></br>
                <input id='city' type='text' placeholder='city' name='city'/>
                <br></br>
                <br></br>
                <input id='course' type='text' placeholder='course' name='course' />
                <br></br>
                <br></br>
                <p>Start date</p>
                <input id='startdate' type='date' name='startdate' />
                <br></br>
                <br></br>
                <p>End date</p>
                <input id='enddate' type='date' name='enddate' />
                <br></br>
                <br></br>
                <h3>Description</h3>
                <div style={{backgroundColor: 'white', width:"80%"}}>
                    <ReactQuill theme='snow' modules={modules} value={text} onChange={handleTextChange} /> 
                </div>
                <br></br>
                <br></br>
                <input id='submit' type='submit' value={'Add'} />
                <br></br>
                <br></br>
            </form>
        </div>  
    )
}

const Education = () => {

    const [education, setEducation] = useState([]);
        
    useEffect(()=> {
        ReadFromDB();
    }, [])


    function ReadFromDB () {
        onSnapshot(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), (doc) => {
            console.log(doc.data()['Education']);
            const educationObject = doc.data()['Education'];
            setEducation(educationObject);
        });
    }
    
    function generateKey(index) {
        return index;
    }

    return ( 
        <div>
            <h2>Education</h2>
            <br></br>
            <AddEducation/>
            <br></br>
            <div>
                {
                    education?.map((data, index) => {
                        return(
                            <div key={generateKey(index)}>
                                <p>{data['Institution'] + " - " + data['Course'] }</p>
                                <p> {data['StartDate'] + " - " + data['EndDate']} </p>
                                <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(data['Description']) }}/>
                                <Link to={`/editeducation/${index}`} state={{ identifier: `${index}` }}>Edit Education {index}</Link>
                                <hr></hr>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
 
export default Education;