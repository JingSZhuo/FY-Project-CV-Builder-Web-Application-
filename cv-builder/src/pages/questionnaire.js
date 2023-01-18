/* CSS FILES */ 
import '../main.css';
import '../reset.css';

/* FIREBASE */
import { getDatabase, onValue, ref, update } from 'firebase/database';
import db from '../firebase';
import { useEffect, useState } from 'react';

/* COMPONENTS AND PAGES */
import Q1 from '../quiz_components/quiz_1'

const QuestionnairePage = () => {

    const [question, setQuestion] = useState(0)

    function NextQuestion () {
        setQuestion(a => a + 1)             //increment by 1
        console.log("Question", question)
    }
    function PreviousQuestion () {
        setQuestion(a => a - 1)             //decrement by 1
        console.log("Question", question)
    }

    function QuestionNumber () {
        return question;
    }

    return ( 
        <div>

            <div>
                <h1>Questionnaire</h1>
            </div>
            {/* conditonal rendering */}
            {
                QuestionNumber() === 0 ?  <Q1/>  :    <button onClick={PreviousQuestion}>Previous</button>
            }
            {
                QuestionNumber() === 0 ?  <button onClick={NextQuestion}>Next</button> : <div/>
            }


        </div>
    );
}
 
export default QuestionnairePage;