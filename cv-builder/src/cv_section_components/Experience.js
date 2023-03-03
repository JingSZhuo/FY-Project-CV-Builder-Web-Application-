/* CSS FILES */
import '../main.scss';
import '../reset.css';

/* FIREBASE */
import db from '../firebase';
import { arrayUnion, doc, updateDoc, onSnapshot } from 'firebase/firestore';

/* REACT */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

// import ReactQuill from 'react-quill'
import ReactQuill from 'react-quill';

function AddExperience () {

    const [text, setText] = useState('');

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, false]}],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
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
        const JobTitle = document.getElementById("jobtitle").value
        const city = document.getElementById("city").value
        const company = document.getElementById("company").value
        const startdate = document.getElementById("startdate").value
        const enddate = document.getElementById("enddate").value
        
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
        <div>
            
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

    useEffect(() => {
        ReadFromDB();
    }, [])

    function ReadFromDB () {
        onSnapshot(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), (doc) => {
            console.log(doc.data()['Experience']);
            const educationObject = doc.data()['Experience'];
            setExperience(educationObject);
        });
    }

        
    function generateKey(index) {
        return index;
    }

    return ( 
        <div>
            <h1>Experience</h1>
            <br></br>
            <div>
                {
                    experience?.map((data, index) => {

                        return(
                            <div key={generateKey(index)}>
                                <p>{data['JobTitle'] + " - " + data['Company'] }</p>
                                <p> {data['StartDate'] + " - " + data['EndDate']} </p>
                                {/* <p>{data['Description']}</p> */}
                                <div dangerouslySetInnerHTML={{__html: data['Description'] }} ></div>
                                <Link to={`/editexperience/${index}`} state={{ identifier: `${index}` }}>Edit</Link> {/* ADD EDIT EXPERIENCE COMPONENT*/ }
                                <hr></hr>
                            </div>
                        )
                    })
                }
            </div>
            <AddExperience/>
        </div>
    );
}
 
export default Experience;