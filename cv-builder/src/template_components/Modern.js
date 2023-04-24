/* CSS FILES */
import '../main.scss';
import '../reset.css';

/* FIREBASE */
import db from '../firebase'
import { onSnapshot, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

/* REACT */
import DOMPurify from 'dompurify';

const ModernTemplateModel = () => {

    const [profile, setProfile] = useState([]);
    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);
    const [skills, setSkills] = useState('');
    const [otherHeader, setOtherHeader] = useState('');
    const [other, setOther] = useState('');

    function ReadFromDB () {
        onSnapshot(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), (doc) => {
            const profileObject = doc.data()['profile'];
            const educationObject = doc.data()['Education'];
            const experienceObject = doc.data()['Experience'];
            const skills = doc.data()['Skills'];
            const otherHeader = doc.data()['OtherTitle'];
            const other = doc.data()['Other'];
            setProfile(profileObject);
            setEducation(educationObject);
            setExperience(experienceObject);
            setSkills(skills);
            setOtherHeader(otherHeader);
            setOther(other);
        });
    }

    function generateKey(index) {
        return index;
    }

    useEffect(()=> {
        ReadFromDB();
    }, [])

    /* Conditional Rendering */

    if (profile == null) {
        return <div>Loading profile...</div>
    }

    return ( 
        <div className='cv-preview' id='cv-preview'>
            <div className='template' id='template' >
                <div className='flex-outer'>
                    <div className='left-side' >
                        <h2 style={{fontSize: '1rem'}}>Profile</h2>
                        <p style={{fontSize: '0.7rem'}} >{profile['FName'] + " " + profile['LName']}</p>
                        <br></br>
                        <p style={{fontSize: '0.5rem'}} >{profile['Email']}</p>
                        <br></br>
                        <p style={{fontSize: '0.7rem'}}>{profile['Contact']}</p>

                        <br></br>
                        <br></br>
                        <div>
                        <h2>Skills</h2>
                            <div className='fontsize-test' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(skills) }}/>
                        </div>
                    </div>
                    <div className='right-side' >
                        <div>
                            <h2>Education</h2>
                            {
                                education?.map((data, index) => {

                                    return(
                                        <div key={generateKey(index)}>
                                            <p style={{fontSize: '0.7rem'}}>{data['Institution'] + " - " + data['Course'] }</p>
                                            <p style={{fontSize: '0.45rem'}}> {data['StartDate'] + " - " + data['EndDate']} </p>
                                            <div style={{fontSize: '0.6rem'}} dangerouslySetInnerHTML={{__html: data['Description'] }} ></div>
                                            <hr></hr>
                                            {/* ADD EDIT BUTTON - PASS PROPS TO COMPONENT? */}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <br></br>
                        <div>
                            <h2>Experience</h2>
                            {
                                experience?.map((data, index) => {

                                    return(
                                        <div key={generateKey(index)}>
                                            <p style={{fontSize: '0.7rem'}}>{data['JobTitle'] + " - " + data['Company'] }</p>
                                            <p style={{fontSize: '0.45rem'}}> {data['StartDate'] + " - " + data['EndDate']} </p>
                                            {/* <p>{data['Description']}</p> */}
                                            <div style={{fontSize: '0.6rem'}} dangerouslySetInnerHTML={{__html: data['Description'] }} ></div>
                                            <hr></hr>
                                            {/* ADD EDIT BUTTON - PASS PROPS TO COMPONENT? */}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <br></br>
                        <div>
                            <h2>{otherHeader}</h2>
                            <div className='fontsize-test' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(other) }}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ModernTemplateModel;