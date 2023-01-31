/* CSS FILES */
import '../main.css';
import '../reset.css';

/* FIREBASE */
import db from '../firebase';
import { useEffect } from 'react';
import { doc, setDoc, addDoc, collection, updateDoc } from 'firebase/firestore';



async function handleSubmit (event) {     //Create fresh document
    event.preventDefault();
    const FName = document.getElementById("fName").value;
    const LName = document.getElementById("lName").value;
    const Email = document.getElementById("Email").value;
    const Contact = document.getElementById("ContactNumber").value;
    try  {
        if(FName.trim() === "") throw new Error("Cannot be empty"); 
        if (isNaN(Contact) || Contact.trim() === "") throw new Error("Not a number")
        await setDoc(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), {
            profile : {
                FName: FName,
                LName: LName,
                Email: Email,
                Contact: Contact,
            }
        });
        alert("Submitted to DB");
    }
    catch (error) { alert("Something went wrong with data input: ", error.message) }
}

const ProfileSummary = () => {

    useEffect(() => {
        
    }, [])


    return ( 
        <form onSubmit={handleSubmit} className='profile-form' >
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
            <input type={"submit"} value={"preview"}/>
        </form>
     );
}
 
export default ProfileSummary;