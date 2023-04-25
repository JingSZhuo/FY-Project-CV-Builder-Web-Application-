/* REACT IMPORTS */
import { Link, useNavigate } from 'react-router-dom';

/* CSS FILES */ 
import '../main.scss';
import '../reset.css';

/* FIREBASE */
import { useState } from 'react';

/* COMPONENTS AND PAGES */
import Q1 from '../quiz_components/quiz_1';
import Q2 from '../quiz_components/quiz_2';


const QuestionnairePage = () => {

    const [question, setQuestion] = useState(0);
    const navigate = useNavigate();

    function NextQuestion () {
        setQuestion(a => a + 1);             //increment by 1
    }
    function PreviousQuestion () {
        setQuestion(a => a - 1);             //decrement by 1
    }
        
    function DirectToTemplate() {
        navigate('/cv_template')
    }
    
    return ( 
        <div>
            <div className='header-position'>
                <h2 className='header' >CV Assistant</h2>
            </div>
            {/* conditonal rendering */}
            <section>
                {
                    question === 0 ? <Q1/> : null
                }
                {
                    question === 1 ? <Q2/> : null
                }
                {
                    question >= 1 ? <button onClick={PreviousQuestion}>Previous</button> : null
                }
                {
                    question >= 0 && question < 1?  <button onClick={NextQuestion}>Next</button> : <button onClick={DirectToTemplate}>Done</button>
                }
            </section>
            {/* comment out code below when finished */}
            <div>
                <br></br>
                <Link to="/preview-temaplate">Template Preview</Link>
                <br></br>
            </div>
        </div>
    );
}
 
export default QuestionnairePage;