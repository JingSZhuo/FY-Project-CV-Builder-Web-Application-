/* CSS FILES */
import '../main.scss';
import '../reset.css';

/* FIREBASE */
import db from '../firebase';
import { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';

/* COMPONENTS */
import Profile from './Profile';
import Education from './Education';


const ProfileSummary = () => {

    const [nextComponent,  triggerNextComponent] = useState(0);

    function NextComponent () {
        triggerNextComponent(a => a + 1);
    }
    function PreviousComponent () {
        triggerNextComponent(a => a - 1);
    }

    // async function CreateEducationArray () {
    //     await updateDoc(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), { 
    //         Education : [
    //             {
    //                 Institution: "",
    //                 City: "",
    //                 StartDate: "",
    //                 EndDate: "",
    //                 Description: "",
    //             }
    //         ]
    //     });
    
    // }


    return ( 
        <div className='profile-form'>

            {/* PROFILE */}
            { nextComponent === 0 ? <Profile/> : null }
            <br></br>
            { nextComponent === 0 ? <button onClick={() =>  {NextComponent(); }} >Next (Education)</button> : null }

            {/* EDUCATION */}

            { nextComponent === 1 ? <Education/> : null }
            
            { nextComponent >= 1 ? <button onClick={PreviousComponent} >Back</button> : null }
            { nextComponent === 1 ? <button onClick={NextComponent} >Next (Experience)</button> : null }
           

        </div>
     );
}
 
export default ProfileSummary;