/* CSS FILES */
import '../main.scss';
import '../reset.css';

/* FIREBASE */
import db from '../firebase';
import { doc,  updateDoc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

/* NPM PACKAGES */
import DOMPurify from 'dompurify';

/* SUBMIT FORM FUNCTION */
async function handleSubmit (event) {     
    event.preventDefault();
    const FName = DOMPurify.sanitize(document.getElementById("fName").value);
    const LName = DOMPurify.sanitize(document.getElementById("lName").value);
    const Email = DOMPurify.sanitize(document.getElementById("Email").value);
    const Contact = DOMPurify.sanitize(document.getElementById("ContactNumber").value);
    try{
        if(FName.trim() === "") throw new Error("Cannot be empty"); 
        if (isNaN(Contact) || Contact.trim() === "") throw new Error("Not a number")
        await updateDoc(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), {
            profile : {
                FName: FName,
                LName: LName,
                Email: Email,
                Contact: Contact,
            }
        });
        alert("Submitted to DB");
    }
    catch (error) { alert("Something went wrong with data input") }
}

const Profile = () => {

    const [profile , setProfile] = useState([]);
    const [trigger, setTrigger] = useState('false');

    useEffect(() => {
        ReadFromDB();
        setValueFromDatabase();
    }, [trigger]);

    async function ReadFromDB() {
        onSnapshot(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), (doc) => {
            const profileObject = doc.data()['profile'];
            setProfile(profileObject);
            setTrigger('true');
        });
    }

    function setValueFromDatabase() {
        console.log(profile);
        if (profile === undefined) {
            //Simplify this??
            console.log("Empty profile")
            document.getElementById('fName').value = "";
            document.getElementById('lName').value = "";
            document.getElementById('Email').value = "";
            document.getElementById('ContactNumber').value = "";
        } else{
            document.getElementById('fName').value = profile['FName'];
            document.getElementById('lName').value = profile['LName'];
            document.getElementById('Email').value = profile['Email'];
            document.getElementById('ContactNumber').value = profile['Contact'];
            console.log("Values set")
        }
    }


    return ( 
            <form onSubmit={handleSubmit}>
                <h2>Profile Summary</h2>
                <br></br>
                <input id='fName' type={"text"} placeholder='First Name' name='fName'/>
                <br></br>
                <br></br>
                <input id='lName' type={"text"} placeholder='Last Name' name='lName'/>
                <br></br>
                <br></br>
                <input id='Email' type={"email"} placeholder='Email' name='email' />
                <br></br>
                <br></br> 
                <input id='ContactNumber' type={"number"} placeholder='Contact Number' name='contact_number' />
                <br></br>
                <br></br> 
                <input type={"submit"} value={"Add/Change"} data-testid="submit"/>
            </form>
     );
}
 
export default Profile;