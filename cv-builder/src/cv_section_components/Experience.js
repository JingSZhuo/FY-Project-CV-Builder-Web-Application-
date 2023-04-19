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
    }

    return(
        <div id='experience-form' >
            <head>
                <meta charSet='utf-8'></meta>
                <script>
                    <link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"/>
                </script>
            </head>

            <form onSubmit={handleSubmitEducation}>

                <input id='jobtitle' type='text' placeholder='job title' name='jobtitle'/>
                <br></br>
                <br></br>
                <input id='city' type='text' placeholder='city' name='city'/>
                <br></br>
                <br></br>
                <input id='company' type='text' placeholder='company' name='company' />
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
            console.log("loading job role/yearExp..");
        }
        else {
            console.log("loaded job role/yearExp...");
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
        
    function generateKey(index) {
        return index;
    }

    return ( 
        <div>
            <h1>Experience</h1>
            <br></br>
            <AddExperience/>
            <br></br>
            <div>
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
                            <div key={generateKey(index)}>
                                <p>{data['JobTitle'] + " - " + data['Company'] }</p>
                                <p> {data['StartDate'] + " - " + data['EndDate']} </p>
                                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(data['Description'] )}} ></div>
                                <Link to={`/editexperience/${index}`} state={{ identifier: `${index}` }}>Edit Experience {index}</Link>
                                <hr></hr>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
 
export default Experience;