/* CSS FILES */
import '../main.scss';
import '../reset.css';

/* FIREBASE */
import db from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';


//* Add Education to Database */

function AddEducation () {

    async function handleSubmitEducation (event) {
        event.preventDefault();
        const Institution = document.getElementById("institution").value
        const city = document.getElementById("city").value
        const course = document.getElementById("course").value
        const startdate = document.getElementById("startdate").value
        const enddate = document.getElementById("enddate").value
        const description = document.getElementById("description").value
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
            <input id='submit' type='submit' value={'submit'} />
            <br></br>
            <br></br>
        </form>
    )

}

const Education = () => {
    return ( 
        <div>

            <h2>Education</h2>
            <br></br>
            <AddEducation/>


        </div>
    );
}
 
export default Education;