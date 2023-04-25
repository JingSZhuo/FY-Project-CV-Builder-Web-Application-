/* CSS FILES */
import '../main.scss';
import '../reset.css';

/* FIREBASE */
import db from '../firebase';
import { arrayUnion, doc, updateDoc, onSnapshot } from 'firebase/firestore';

/* REACT  */
import React from 'react';
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

        try {
            if(Institution === "") throw new Error("Cannot be empty!");
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
            alert("Submitted");
        } catch (error) {
            alert("Rejected!")
        }
    }


    return(
            <form onSubmit={handleSubmitEducation} className='cv-form'>
                <div className='field-div'>
                    <label for={"institution"} >Institution</label>
                    <input id='institution' type='text' placeholder='school or university' name='institution'/>
                </div>
                <br></br>
                <br></br>
                <div className='field-div'>
                    <label for={"city"} >City</label>
                    <input id='city' type='text' placeholder='city' name='city'/>
                </div>
                <br></br>
                <br></br>
                <div className='field-div'>
                    <label for={"course"}>Course</label>
                    <input id='course' type='text' placeholder='course' name='course' />
                </div>
                <br></br>
                <br></br>
                <div className='field-div-dates'>
                    <div>
                        <label for={"startdate"}>Start Date</label>
                        <input id='startdate' type='date' name='startdate' />
                    </div>
                    <div>
                        <label for={"enddate"} >End Date</label>
                        <input id='enddate' type='date' name='enddate' />
                    </div>
                </div>                
                <br></br>
                <br></br>
                <h3>Description</h3>
                <br></br>
                <section style={{backgroundColor: 'white', width:"100%"}}>
                    <ReactQuill theme='snow' modules={modules} value={text} onChange={handleTextChange} /> 
                </section>
                <br></br>
                <br></br>
                <input id='submit' type={"submit"} value={'Add'} data-testid="submit-edu" />
                <br></br>
                <br></br>
            </form>
    )
}

const generateKey = (index) => {
    return index;
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
            console.log(education)
        });
    }

    return ( 
        <div data-testid="list-edu">
            <h2 className='form-component-subheader' >Education</h2>
            <br></br>
            <AddEducation/>
            <br></br>
            <div>
                {
                    education?.map((data, index) => {
                        return(
                            <div key={generateKey(index)} className='edit-individual-component-div'>
                                <h6>{data['Institution'] + " - " + data['Course'] }</h6>
                                <p> {data['StartDate'] + " - " + data['EndDate']} </p>
                                <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(data['Description']) }}/>
                                <Link to={`/editeducation/${index}`} state={{ identifier: `${index}` }}>Edit {index}</Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export { AddEducation, Education, generateKey };
