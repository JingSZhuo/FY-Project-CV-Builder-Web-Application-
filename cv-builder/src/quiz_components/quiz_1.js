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

        <section>
            <div>
                <h2>Q1</h2>
            </div>

            <br></br>
            <label>Which sector do you want to create a CV for?</label>
            <br></br>
            <select name='role' id='question_one' onChange={UpdateDatabase}>
                <option value="null" > -- </option>
                <option value="Finance" >Accounting and Finance</option>
                <option value="SoftwareEngineer" >Software and IT</option>
            </select>
            <br></br>
        </section>
    );
}
 
export default QuestionOne;