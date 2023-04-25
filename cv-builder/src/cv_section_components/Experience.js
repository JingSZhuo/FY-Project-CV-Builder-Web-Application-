/* CSS FILES */
import '../main.scss';
import '../reset.css';

/* FIREBASE */
import db from '../firebase';
import { arrayUnion, doc, updateDoc, onSnapshot } from 'firebase/firestore';

/* REACT */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

/* NPM PACKAGES */
import DOMPurify from 'dompurify';
import ReactQuill from 'react-quill';

function AddExperience () {

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
        const JobTitle = DOMPurify.sanitize(document.getElementById("jobtitle").value);
        const city = DOMPurify.sanitize(document.getElementById("city").value);
        const company = DOMPurify.sanitize(document.getElementById("company").value);
        const startdate = DOMPurify.sanitize(document.getElementById("startdate").value);
        const enddate = DOMPurify.sanitize(document.getElementById("enddate").value);
        
        await updateDoc(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), { 
            Experience : arrayUnion(
                    {
                        JobTitle: JobTitle,
                        City: city,
                        Company: company,
                        StartDate: startdate,
                        EndDate: enddate,
                        Description: text, /*replace with value from Quill textbox */
                    }
            ) 
        });
        return true;
    }

    return(
        <div id='experience-form' >

            <form onSubmit={handleSubmitEducation} className='cv-form'>
                <div className='field-div'>
                    <label for={"jobtitle"} >Job Title</label>
                    <input id='jobtitle' type='text' placeholder='job title' name='jobtitle' data-testid="text-input"/>
                </div>
                <br></br>
                <br></br>
                <div className='field-div'>
                    <label for={"city"}>City</label>
                    <input id='city' type='text' placeholder='city' name='city' data-testid="text-input"/>
                </div>
                <br></br>
                <br></br>
                <div className='field-div'>
                    <label for={"company"} >Company</label>
                    <input id='company' type='text' placeholder='company' name='company' data-testid="text-input"/>
                </div>
                <br></br>
                <br></br>
                <div className='field-div-dates'>
                    <div>
                        <label for={"startdate"}>Start Date</label>
                        <input id='startdate' type='date' name='startdate' data-testid="date-input"/>
                    </div>
                    <div>
                        <label for={"enddate"}>End Date</label>
                        <input id='enddate' type='date' name='enddate' data-testid="date-input"/>
                    </div>
                </div>
                <br></br>
                <br></br>
                <h3>Description</h3>
                <br></br>
                <section style={{backgroundColor: 'white', width:"100%"}} data-testid="text-input">
                    <ReactQuill theme='snow' modules={modules} value={text} onChange={handleTextChange} /> 
                </section>
                <br></br>
                <br></br>
                <input id='submit' type='submit' value={'Add'} data-testid="submit-input"/>
                <br></br>
                <br></br>
            </form>
        </div>
    )
}

const Experience = () => {

    const [experience, setExperience] = useState([]);
    const [jobrole, setJobRole] = useState(""); 
    const [yearExp, setYearExp] = useState("");
    const [recommendation, setRecommendation] = useState([]);
    const [recommendationRandomized, setRecommendationRandomized] = useState([]);

    const [trigger, setTrigger] = useState(false); 

    useEffect(() => {
        ReadFromDB();
    }, [jobrole, yearExp, trigger])

    function ReadFromDB () {
        //load Experience data object
        onSnapshot(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), (doc) => {
            const educationObject = doc.data()['Experience'];
            setExperience(educationObject);
        });
        //load user questionnaire answers
        onSnapshot(doc(db, "UserAuthExample", "OptionChosen"), (doc) => {
            setJobRole(doc.data()['q1']);
            setYearExp(doc.data()['q2']);
        });

        //Conditional -> as jobrole / yearExp is still being updated -> to prevent rendering and empty path error.
        if(jobrole === "" || yearExp === ""){
            //console.log("loading job role/yearExp..");
        }
        else {
            //console.log("loaded job role/yearExp...");
            //use user questionnaire answers to load appropriate dataset recommendation
            onSnapshot(doc(db, "JobRoles", jobrole), (doc) => {
                //console.log(doc.data()[`${yearExp}`]);
                console.log("Job role:", jobrole);
                console.log("yearexp:", yearExp);
                setRecommendation(doc.data()[`${yearExp}`]);
                
                //To avoid re-rendering infinitely by using a state updater instead of an array dependency
                setTrigger(true);
                if (!trigger){ 
                    console.log("Cannot randomise");
                }
                else { 
                    const randArray = [];
                    //Getting 3 random elements from recommendation array without repeats
                    for (let i=0; i <3; i++) {
                        const randomIndex = Math.floor(Math.random() * recommendation.length);
                        const randomElement = recommendation[randomIndex];
                        randArray.push(randomElement);
                        recommendation.splice(randomIndex, 1);
                    }
                    setRecommendationRandomized(randArray);
                    console.log("Randomised Array"); 
                }
            });
        }
    }

    return ( 
        <div>
            <h2 className='form-component-subheader' >Experience</h2>
            <br></br>
            <AddExperience/>
            <br></br>
            <div className="suggestions-container">
                <h2>Here are some suggestions</h2>
                {
                    recommendationRandomized?.map((data, index) => {
                        return(
                            <div key={generateKey(index)}>
                                <ul>
                                    <li>{data}</li>
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
            <br></br>
            <div>
                {
                    experience?.map((data, index) => {
                        return(
                            <div key={generateKey(index)} className='edit-individual-component-div' data-testid="list">
                                <h6>{data['JobTitle'] + " - " + data['Company'] }</h6>
                                <p> {data['StartDate'] + " - " + data['EndDate']} </p>
                                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(data['Description'] )}} ></div>
                                <Link to={`/editexperience/${index}`} state={{ identifier: `${index}` }}>Edit {index}</Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

function generateKey(index) {
    return index;
}

export { AddExperience, Experience, generateKey };