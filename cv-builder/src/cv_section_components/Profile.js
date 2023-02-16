/* CSS FILES */
import '../main.scss';
import '../reset.css';

/* FIREBASE */
import db from '../firebase';
import { useEffect, useState } from 'react';
import { doc, setDoc, addDoc, collection, updateDoc } from 'firebase/firestore';


/* SUBMIT FORM FUNCTION */
async function handleSubmit (event) {     
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

const Profile = () => {
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
                <input type={"submit"} value={"preview"}/>
            </form>

     );
}
 
export default Profile;