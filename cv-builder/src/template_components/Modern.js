/* CSS FILES */
import '../main.scss';
import '../reset.css';

/* FIREBASE */
import db from '../firebase'
import { onSnapshot, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';


const ModernTemplateModel = () => {

    const [profile, setProfile] = useState({});

    function ReadFromDB () {
        const getData = onSnapshot(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), (doc) => {
            console.log(doc.data()['profile']);
            const profileObject = doc.data()['profile']; //Object
            const documentID = doc.id
            console.log(documentID);
            setProfile(profileObject);
        });
    }

    useEffect(()=> {
        ReadFromDB();
    }, [])

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

                    </div>

                </div>
            </div>
        </div>
    );
}
 
export default ModernTemplateModel;