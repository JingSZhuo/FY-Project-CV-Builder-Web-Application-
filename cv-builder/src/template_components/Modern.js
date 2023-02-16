/* CSS FILES */
import '../main.scss';
import '../reset.css';

/* FIREBASE */
import db from '../firebase'
import { onSnapshot, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';


const ModernTemplateModel = () => {

    const [profile, setProfile] = useState({});
    const [education, setEducation] = useState([]);

    function ReadFromDB () {
        onSnapshot(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), (doc) => {
            console.log(doc.data()['profile']);
            console.log(doc.data()['Education'])
            const profileObject = doc.data()['profile']; //Object
            const educationObject = doc.data()['Education'];
            //const documentID = doc.id
            //console.log(documentID);
            setProfile(profileObject);
            setEducation(educationObject);
        });
    }

    function generateKey(index) {
        return index;
    }

    useEffect(()=> {
        ReadFromDB();
    }, [])

    if (education == null) {
        return <div>Loading...</div>
    }

    if (education.length === 0) {
        return <div>Loading...</div>
    }

    return ( 
        <div className='cv-preview'>
            <div className='template'>
                <div className='flex-outer'>
                    <div className='left-side'>
                        <br></br>
                        {profile['FName'] + "\t"}
                        {profile['LName']}
                        <br></br>
                        {profile['Email']}
                        <br></br>
                        {profile['Contact']}
                        <br></br>
                        {profile['id']}
                    </div>
                    <div className='right-side'>
                        <div>
                            <h2>Education</h2>
                            {
                                education?.map((data, index) => {

                                    return(
                                        <div key={generateKey(index)}>
                                            <p>{data['Institution'] + " - " + data['Course'] }</p>
                                            <p> {data['StartDate'] + " - " + data['EndDate']} </p>
                                            <p>{data['Description']}</p>
                                            <hr></hr>
                                            {/* ADD EDIT BUTTON - PASS PROPS TO COMPONENT? */}
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
 
export default ModernTemplateModel;