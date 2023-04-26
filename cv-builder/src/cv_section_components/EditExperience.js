/* CSS FILES */
import '../main.scss';
import '../reset.css';
import 'react-quill/dist/quill.snow.css';

/* FIREBASE */
import db from '../firebase';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';

/* REACT IMPORTS */
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

/* PACKAGES */
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';

const EditExperience = () => {

    /* passing state variable via Link */
    const location = useLocation();
    const navigate = useNavigate();

    /* storing states for reading data and modification */
    const [index] = useState(location.state.identifier);
    const [Experience, setExperience] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        ReadFromDB();
    }, [])

    /* React quill settings */
    
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, false]}],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        ],
    }

    /* Read Experience Array from firebase DB*/
    function ReadFromDB () {
        onSnapshot(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), (doc) => {
            console.log(doc.data()['Experience']);
            const experienceObject = doc.data()['Experience'];
            setExperience(experienceObject);
        });
    }

    const handleTextChange = (value) => {
        setText(value);
        console.log(text)
    }

    async function handleSubmitEducation (event) {
        event.preventDefault();
        const JobTitle = DOMPurify.sanitize(document.getElementById("jobtitle").value);
        const city = DOMPurify.sanitize(document.getElementById("city").value);
        const company = DOMPurify.sanitize(document.getElementById("company").value);
        const startdate = DOMPurify.sanitize(document.getElementById("startdate").value);
        const enddate = DOMPurify.sanitize(document.getElementById("enddate").value);
        //Editing the specified element in the useState Array and then uploading the newely-updated array to firebase.
        Experience[index] = {
            JobTitle: JobTitle,
            City: city,
            Company: company,
            StartDate: startdate,
            EndDate: enddate,
            Description: text, /*replace with value from Quill textbox */
        }
        /* Re-write entire array to firebase firestore */
        await updateDoc(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), { 
            Experience
        });
        alert("Edited!")
    }

    async function DeleteFromArray(){
        Experience.splice(index, 1);
        console.log("After", Experience)
        await updateDoc(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), { 
            Experience
        });
        alert("Deleted");
        navigate('/cv_template');
    }

    return ( 
            <div className='main'>
                <nav className='navbar'>
                    <Link className='navbar-buttons' to={"/"}>Home</Link>
                </nav>
                <h1 className='form-component-subheader' style={{ marginTop: '20px', textAlign: 'center'}}>Edit Experience {location.state?.identifier}</h1>
                <form onSubmit={handleSubmitEducation} className='cv-form' style={{width: '50%', margin: '50px auto 0 auto'}}>
                    <div className='field-div'>
                        <label for={"jobtitle"}>Job Title</label>
                        <input id='jobtitle' type='text' placeholder='job title' name='jobtitle'/>
                    </div>

                    <div className='field-div'>
                        <label for={"city"}>City</label>
                        <input id='city' type='text' placeholder='city' name='city'/>
                    </div>

                    <div className='field-div'>
                        <label for={"company"}>Company</label>
                        <input id='company' type='text' placeholder='company' name='company' />
                    </div>                    

                    <div className='field-div-dates'>
                        <div>
                            <label for={"startdate"}>Start Date</label>
                            <input id='startdate' type='date' name='startdate' />
                        </div>
                        <div>
                            <label for={"enddate"}>End Date</label>
                            <input id='enddate' type='date' name='enddate' />
                        </div>
                    </div>

                    <h3>Description</h3>
                    <br></br>

                    <section style={{backgroundColor: 'white', marginBottom: '50px' ,width:"100%"}}>
                        <ReactQuill theme='snow' modules={modules} value={DOMPurify.sanitize(text)} onChange={handleTextChange}/> 
                    </section>

                    <input id='submit' type='submit' value={'Edit'} />

                </form>
                <br></br>
                <div className='delete-button'>
                    <button onClick={DeleteFromArray}>Delete</button>
                </div>
            </div>
    );
}
 
export default EditExperience;