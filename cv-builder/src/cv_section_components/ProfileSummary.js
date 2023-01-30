/* CSS FILES */
import '../main.css';
import '../reset.css';

/* FIREBASE */
import db from '../firebase';
import { useEffect } from 'react';
import { doc, setDoc, addDoc, collection, updateDoc } from 'firebase/firestore';



async function handleSubmit (event) {
    event.preventDefault();
    await updateDoc(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), {
        profile : {
            FName: document.getElementById("fName").value,
            LName: document.getElementById("lName").value,
            Email: document.getElementById("Email").value,
            Contact: document.getElementById("ContactNumber").value,
        }
    })
    console.log("Updated Data to DB")
}

async function CreateProfileSummaryDB() {
    console.log("Created Profile Summary Section in DB")
    //await addDoc(collection(db, "UserAuthExample"), {
    await setDoc(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), {
        profile : {
            FName: "",
            LName: "",
            Email: "",
            Contact: "",
        }
    });
}



const ProfileSummary = () => {

    useEffect(() => {
        CreateProfileSummaryDB()
    },[])


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
            <input type={"submit"} value={"submit"}/>
        </form>
     );
}
 
export default ProfileSummary;