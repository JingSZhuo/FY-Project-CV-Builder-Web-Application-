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
import ReactQuill from 'react-quill';  //JavaScript Library downloaded from https://quilljs.com/
import DOMPurify from 'dompurify';  //JavaScript Library downloaded from https://www.npmjs.com/package/dompurify 

//* Add Education to Database */

function AddEducation () {

    const [text, setText] = useState('');
    const [startDate, setStartDate] = useState('');

    const setStartDateField = (event) => {
        setStartDate(event.target.value);
    };
    const setEndDateField = (event) => {
        if(startDate > event.target.value){
            event.target.value = startDate;
            alert('End date cannot be before the start date');
            return false;
        }
    };

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
            if(Institution === "") throw "Institution field cannot be empty";
            if(city === "") throw "City field cannot be empty";
            if(course === "") throw "Course field cannot be empty";
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
            alert("Added Education!");
        } catch (error) {
            alert(error)
        }
    }


    return(
            <form onSubmit={handleSubmitEducation} className='cv-form'>
                <div className='field-div'>
                    <label htmlFor={"institution"} >Institution</label>
                    <input id='institution' type='text' placeholder='school or university' name='institution' data-testid="institution-field"/>
                </div>

                <div className='field-div'>
                    <label htmlFor={"city"} >City</label>
                    <input id='city' type='text' placeholder='city' name='city' data-testid="city-field"/>
                </div>

                <div className='field-div'>
                    <label htmlFor={"course"}>Course</label>
                    <input id='course' type='text' placeholder='course' name='course' data-testid="course-field"/>
                </div>

                <div className='field-div-dates'>
                    <div>
                        <label htmlFor={"startdate"}>Start Date</label>
                        <input id='startdate' type='date' name='startdate' onChange={setStartDateField} data-testid="startdate-field"/>
                    </div>
                    <div>
                        <label htmlFor={"enddate"} >End Date</label>
                        <input id='enddate' type='date' name='enddate' onChange={setEndDateField} data-testid="enddate-field"/>
                    </div>
                </div>                

                <h3>Description</h3>
                <br></br>
                <section style={{backgroundColor: 'white', marginBottom: '50px' ,width:"100%"}}>
                    <ReactQuill theme='snow' modules={modules} value={text} onChange={handleTextChange} data-testid="text-quill-field" /> 
                </section>

                <input id='submit' type={"submit"} value={'Add'} data-testid="submit-edu" />
                <div id='helpbox-education'>
                    <span onClick={close}>X</span>
                    <p>Some suggestions for Education:</p>
                    <div>
                        <ul>
                            <li>Gained proficiecy in [..programming langauges: C#, Java, Python, C++]</li>
                            <li>Treasurer for [...Society Name...], increased membership sales by 10% and saved 50% in costs</li>
                            <li>Achieved 1st class in [...subject...], with expertise in [...technical skill...]</li>
                            <li>Team leader for netball team representing [...university team name...]</li>
                        </ul>
                    </div>
                </div>
            </form>
    )
}

function close(){
    console.log('closed');
    document.getElementById('helpbox-education').style.display = 'none';
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
        <div>
            <h2 className='form-component-subheader' >Education</h2>
            <br></br>
            <AddEducation/>
            <br></br>
            <div>
                {
                    education?.map((data, index) => {
                        return(
                            <div key={generateKey(index)} className='edit-individual-component-div' data-testid="list-edu">
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

export { AddEducation, Education, generateKey, ReactQuill };
