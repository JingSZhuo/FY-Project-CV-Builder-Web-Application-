/* CSS FILES */
import '../main.scss';
import '../reset.css';

/* REACT */
import { useLocation } from 'react-router-dom';


/* FIREBASE */
import db from '../firebase';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const EditEducation = () => {

    const location = useLocation();

    const [index, setIndex] = useState(location.state.identifier);
    const [Education, setEducation] = useState([]);

    /* Load Data once */
    useEffect(() => {
        ReadFromDB()
    }, [])


    /* Read From DB */
    function ReadFromDB () {
        onSnapshot(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), (doc) => {
            console.log(doc.data()['Education']);
            const educationObject = doc.data()['Education'];
            setEducation(educationObject);
        });
    }

    /* Modify education state (Array) and then adds to DB -> as Firebase does not allow modification of specfic index element*/
    async function handleSubmitEducation (event) {
        event.preventDefault();
        const institution = document.getElementById("institution").value
        const city = document.getElementById("city").value
        const course = document.getElementById("course").value
        const startdate = document.getElementById("startdate").value
        const enddate = document.getElementById("enddate").value
        const description = document.getElementById("description").value
        Education[index] = {
            Institution: institution,
            City: city,
            Course: course,
            StartDate: startdate,
            EndDate: enddate,
            Description: description,
        }
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
                <textarea id='description' type='text' name='description' placeholder='description' style={{resize: 'vertical', width: '300px', minHeight: '100px'}} />
                <br></br>
                <br></br>
                <input id='submit' type='submit' value={'Edit'} />
                <br></br>
                <br></br>
            </form>
            {/* <button onClick={TestAddToArray}>Test</button> */}
        </div>
    );
}
 
export default EditEducation;