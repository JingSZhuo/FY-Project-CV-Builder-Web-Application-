/* CSS FILES */
import '../main.scss';
import '../reset.css';

/* REACT */
import { useState } from 'react';

/* COMPONENTS */
import Profile from './Profile';
import { Education } from './Education';
import { Experience } from './Experience';
import Skills from './Skills';
import Other from './Other';
import { useNavigate } from 'react-router-dom';


const ProfileSummary = () => {

    const [nextComponent,  triggerNextComponent] = useState(0);
    const navigate = useNavigate();

    function NextComponent () {
        triggerNextComponent(a => a + 1);
    }
    function PreviousComponent () {
        triggerNextComponent(a => a - 1);
    }

    return ( 
        <div className='profile-form'>

<           head>
                <meta charSet='utf-8'></meta>
                <script>
                    <link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"/>
                </script>
            </head>

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

            {/* SKILLS */}

            { nextComponent === 3 ? <Skills/> : null }

            { nextComponent === 3 ? <button onClick={PreviousComponent} >Back</button> : null }
            { nextComponent === 3 ? <button onClick={NextComponent} >Next (Other)</button> : null }

            
            {/* OTHER SECTION */}

            { nextComponent === 4 ? <Other/> : null }

            { nextComponent >= 4 ? <button onClick={PreviousComponent} >Back</button> : null }
            { nextComponent === 4 ? <button onClick={() => { navigate('/preview-temaplate'); }}>Finish</button> : null }
        </div>
     );
}

export default ProfileSummary;