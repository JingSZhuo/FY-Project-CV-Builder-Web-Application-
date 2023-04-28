/* REACT IMPORTS */


/* CSS FILES */ 
import '../main.scss';
import '../reset.css';

/* FIREBASE */
import db from '../firebase';
import {  doc, updateDoc } from 'firebase/firestore';


async function UpdateDatabase (value) {
    await updateDoc( doc( db, "UserAuthExample", "OptionChosen" ), { q2: `${ value }` } );
}


function GetAnswerForQ2 () {                                               //Get quiz Value
    const x = document.getElementsByName("experience");

    for (let i = 0; i < x.length; i++) {
        if (x[i].value !== undefined && x[i].checked) {
            UpdateDatabase(x[i].value);
            console.log(x[i].value);
        }
    }
}


const QuestionTwo = () => {
    return ( 
        <section className='quiz-component-center'>
            <br></br>
            <div className='questionnaire-header'>
                <h3 className='questionnaire-h3'>Which one best describes you experience level for this sector?</h3>
            </div>
            <br></br>
            <form onSubmit={(e) => {e.preventDefault()}} id='question_two' className='form-custom'>
                <input className='radio-button-hide' type={"radio"} id='less-than-one' name='experience' value="level_one" onChange={GetAnswerForQ2} />
                <label className='radio-button' for={"less-than-one"}>Less than 1 year</label>
                <input className='radio-button-hide' type={"radio"} id='one-two-three' name='experience' value="level_two" onChange={GetAnswerForQ2}/>
                <label className='radio-button' for={"one-two-three"}>More than 1 year</label>
            </form>
        </section>
     );
}
 
export default QuestionTwo;