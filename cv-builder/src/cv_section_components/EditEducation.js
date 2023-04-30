/* CSS FILES */
import '../main.scss';
import '../reset.css';

/* REACT */
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

/* FIREBASE */
import db from '../firebase';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

/* PACKAGES */
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';

const EditEducation = () => {

    /* passing state variable via Link */
    const location = useLocation();
    const navigate = useNavigate();

    const [index] = useState(location.state.identifier);
    const [Education, setEducation] = useState([]);
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
        const institution = DOMPurify.sanitize(document.getElementById("institution").value);
        const city = DOMPurify.sanitize(document.getElementById("city").value);
        const course = DOMPurify.sanitize(document.getElementById("course").value);
        const startdate = DOMPurify.sanitize(document.getElementById("startdate").value);
        const enddate = DOMPurify.sanitize(document.getElementById("enddate").value);
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
        alert(`Education ${index} updated`);
        navigate('/cv_template');
    }

    async function DeleteFromArray(){
        Education.splice(index, 1);
        console.log("After", Education)
        await updateDoc(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), { 
            Education
        });
        alert("Deleted Education!");
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
                    <label for={"institution"}>Institution</label>
                    <input id='institution' type='text' placeholder='school or university' name='institution'/>
                </div>

                <div className='field-div'>
                    <label for={"city"}>City</label>
                    <input id='city' type='text' placeholder='city' name='city'/>
                </div>

                <div className='field-div'>
                    <label for={"course"}>Course</label>
                    <input id='course' type='text' placeholder='course' name='course' />
                </div>

                <div className='field-div-dates'>
                    <div>
                        <label for={"startdate"}>Start Date</label>
                        <input id='startdate' type='date' name='startdate'  onChange={setStartDateField} />
                    </div>
                    <div>
                        <label for={"enddate"}>End Date</label>
                        <input id='enddate' type='date' name='enddate'  onChange={setEndDateField} />
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
 
export default EditEducation;