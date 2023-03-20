/* CSS FILES */
import '../main.scss';
import '../reset.css';
import 'react-quill/dist/quill.snow.css';

/* FIREBASE */
import db from '../firebase';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';

/* REACT IMPORTS */
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

/* PACKAGES */
import ReactQuill from 'react-quill';

const EditExperience = () => {

    /* passing state variable via Link */
    const location = useLocation();

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
        const JobTitle = document.getElementById("jobtitle").value
        const city = document.getElementById("city").value
        const company = document.getElementById("company").value
        const startdate = document.getElementById("startdate").value
        const enddate = document.getElementById("enddate").value
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
    }



    return ( 
        <div>
            <div>
                <h1>Edit</h1>
                <p>{location.state?.identifier}</p>
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
                    <ReactQuill theme='snow' modules={modules} value={text} onChange={handleTextChange} /> 
                    <br></br>
                    <br></br>
                    <input id='submit' type='submit' value={'Edit'} />
                    <br></br>
                    <br></br>
                </form>
            </div>
        </div>
    );
}
 
export default EditExperience;