/* CSS FILES */
import '../main.scss';
import '../reset.css';

/* FIREBASE */
import db from '../firebase';
import { arrayUnion, doc, updateDoc, onSnapshot } from 'firebase/firestore';

/* REACT  */
import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

//* Add Education to Database */

function AddEducation () {

    //const [educationArray, setEducationArray] = useState([]);

    
    /* Adds to Database + adds onto array */
    async function handleSubmitEducation (event) {
        event.preventDefault();
        const Institution = document.getElementById("institution").value
        const city = document.getElementById("city").value
        const course = document.getElementById("course").value
        const startdate = document.getElementById("startdate").value
        const enddate = document.getElementById("enddate").value
        const description = document.getElementById("description").value
        
        // const educationObject = {
        //     Institution: Institution,
        //     City: city,
        //     Course: course,
        //     StartDate: startdate,
        //     EndDate: enddate,
        //     Description: description,
        // }
        await updateDoc(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), { 
            Education : arrayUnion(
                    {
                        Institution: Institution,
                        City: city,
                        Course: course,
                        StartDate: startdate,
                        EndDate: enddate,
                        Description: description,
                    }
                
            ) 
        });
    }


    return(
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
            <input id='submit' type='submit' value={'Add'} />
            <br></br>
            <br></br>
        </form>
    )

}

const Education = () => {

    const [education, setEducation] = useState([]);
    const navigate = useNavigate();
        
    useEffect(()=> {
        ReadFromDB();
    }, [])


    function ReadFromDB () {
        onSnapshot(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), (doc) => {
            console.log(doc.data()['Education']);
            const educationObject = doc.data()['Education'];
            setEducation(educationObject);
        });
    }
    
    function generateKey(index) {
        return index;
    }

    return ( 
        <div>

            <h2>Education</h2>
            <br></br>
            <div>
                {
                    education?.map((data, index) => {

                        return(
                            <div key={generateKey(index)}>
                                <p>{data['Institution'] + " - " + data['Course'] }</p>
                                <p> {data['StartDate'] + " - " + data['EndDate']} </p>
                                <p>{data['Description']}</p>
                                <Link to={`/editeducation/${index}`}state={{ identifier: `${index}` }}>Edit</Link>
                                <hr></hr>
                                {/* ADD EDIT BUTTON - PASS PROPS TO COMPONENT? */}
                            </div>
                        )
                    })
                }
            </div>
            <AddEducation/>
        </div>
    );
}
 
export default Education;