/* CSS FILES */ 
import '../main.scss';
import '../reset.css';

/* REACT HOOKS */

/* COMPONENTS AND PAGES */

/* FIREBASE */
import db from '../firebase';
import {  doc, updateDoc } from 'firebase/firestore';

const QuestionOne = () => {

    async function UpdateDatabase () {
        await updateDoc( doc( db, "UserAuthExample", "OptionChosen" ), { 
            q1: `${ document.getElementById("question_one").value }` ,
        });
        console.log(document.getElementById("question_one").value);
    }

    return ( 
        <section className='quiz-component-center'>
            <br></br>
            <div className='questionnaire-header'>
                <h3 className='questionnaire-h3'>Which sector do you want to create a CV for?</h3>
            </div>
            <br></br>
            <div className='custom-select'>
                <select name='role' id='question_one' onChange={UpdateDatabase}>
                    <option value="null" > Please select... </option>
                    <option value="Finance" >Accounting and Finance</option>
                    <option value="SoftwareEngineer" >Software and IT</option>
                    <option value="Admin" >Administration</option>
                    <option value="Data" >Data Engineer</option>
                </select>
            </div>
            <br></br>
        </section>
    );
}
 
export default QuestionOne;