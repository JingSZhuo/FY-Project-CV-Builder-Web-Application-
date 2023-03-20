/* CSS FILES */
import '../main.scss';
import '../reset.css';

/* FIREBASE */
// import db from '../firebase';
import { useState } from 'react';
// import { doc, updateDoc } from 'firebase/firestore';

/* COMPONENTS */
import Profile from './Profile';
import Education from './Education';
import Experience from './Experience';
import Skills from './Skills';


const ProfileSummary = () => {

    const [nextComponent,  triggerNextComponent] = useState(0);

    function NextComponent () {
        triggerNextComponent(a => a + 1);
    }
    function PreviousComponent () {
        triggerNextComponent(a => a - 1);
    }

    return ( 
        <div className='profile-form'>

            {/* PROFILE */}
            { nextComponent === 0 ? <Profile/> : null }
            <br></br>
            { nextComponent === 0 ? <button onClick={() =>  {NextComponent(); }} >Next (Education)</button> : null }

            {/* EDUCATION */}

            { nextComponent === 1 ? <Education/> : null }
            
            { nextComponent === 1 ? <button onClick={PreviousComponent} >Back</button> : null }
            { nextComponent === 1 ? <button onClick={NextComponent} >Next (Experience)</button> : null }

            {/* EXPERIENCE */}

            { nextComponent === 2 ? <Experience/> : null }

            { nextComponent === 2 ? <button onClick={PreviousComponent} >Back</button> : null }
            { nextComponent === 2 ? <button onClick={NextComponent} >Next (Skills)</button> : null }

            {/* EXPERIENCE */}

            { nextComponent === 3 ? <Skills/> : null }

            { nextComponent >= 3 ? <button onClick={PreviousComponent} >Back</button> : null }
            { nextComponent === 3 ? <button onClick={NextComponent} >Next (Other)</button> : null }

        </div>
     );
}
 
export default ProfileSummary;