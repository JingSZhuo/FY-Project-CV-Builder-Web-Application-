// /* REACT IMPORTS */
import { useNavigate } from 'react-router-dom';

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

function DirectToTemplate() {
    const navigate = useNavigate()
    navigate('/')
}

const QuestionTwo = () => {


    return ( 

        <section>

            <div>
                <h2>Q2</h2>
            </div>

            <br></br>
            <label>How many years of experience do you have in this field?</label>
            <br></br>
            <form onSubmit={(e) => {e.preventDefault()}} id='question_two'>
                <input type={"radio"} id='less-than-one' name='experience' value="one" onChange={GetAnswerForQ2} />
                <label>Less than 1 year</label>
                <input type={"radio"} id='one-two-three' name='experience' value="two" onChange={GetAnswerForQ2}/>
                <label>1 - 3 years</label>
                <input type={"radio"} id='three-plus' name='experience' value="three" onChange={GetAnswerForQ2}/>
                <label>3+ years</label>

                {/* <input type="submit" onClick={DirectToTemplate}/> */}
            </form>
        </section>
     );
}
 
export default QuestionTwo;