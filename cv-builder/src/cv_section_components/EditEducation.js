/* CSS FILES */
import '../main.scss';
import '../reset.css';

/* REACT */
import { useLocation } from 'react-router-dom';

/* FIREBASE */
import db from '../firebase';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

/* PACKAGES */
import ReactQuill from 'react-quill';

const EditEducation = () => {

    /* passing state variable via Link */
    const location = useLocation();

    const [index] = useState(location.state.identifier);
    const [Education, setEducation] = useState([]);
    const [text, setText] = useState('');

    /* Load Data once */
    useEffect(() => {
        ReadFromDB()
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

    /*1. Read Education From DB AND set education object read from firebase to state variable*/
    function ReadFromDB () {
        onSnapshot(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), (doc) => {
            console.log(doc.data()['Education']);
            const educationObject = doc.data()['Education'];
            setEducation(educationObject);
        });
    }

    const handleTextChange = (value) => {
        setText(value);
        console.log(text)
    }

    /*2. Modify education state variable (Array) and then updates it to firebase -> as Firebase does not allow modification of specfic index element - have to update on client side*/
    async function handleSubmitEducation (event) {
        event.preventDefault();
        const institution = document.getElementById("institution").value
        const city = document.getElementById("city").value
        const course = document.getElementById("course").value
        const startdate = document.getElementById("startdate").value
        const enddate = document.getElementById("enddate").value
        /*3. Modify useState array's specific element */
        Education[index] = {
            Institution: institution,
            City: city,
            Course: course,
            StartDate: startdate,
            EndDate: enddate,
            Description: text,
        }
        /*4. Upload entire state variable (array) to Firebase with updated element */
        await updateDoc(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), { 
            Education
        });
    }


    return ( 
        <div>
            <h1>Edit</h1>
            <p>{location.state?.identifier}</p>
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
                <ReactQuill theme='snow' modules={modules} value={text} onChange={handleTextChange} /> 
                <br></br>
                <br></br>
                <input id='submit' type='submit' value={'Edit'} />
                <br></br>
                <br></br>
            </form>
        </div>
    );
}
 
export default EditEducation;