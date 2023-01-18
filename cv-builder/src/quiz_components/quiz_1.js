/* CSS FILES */ 
import '../main.css';
import '../reset.css';

/* COMPONENTS AND PAGES */



function GetAnswerForQ1 () {                                               //Get quiz Value
    const x = document.getElementById("question_one").value
    console.log(x)
}

const QuestionOne = () => {
    return ( 

        <section>

            <div>
                <h2>Q1</h2>
            </div>

            <br></br>
            <label for='role' >What sector do you want to create a CV for?</label>
            <br></br>
            <select name='role' id='question_one'>
                <option value="finance" >Accounting and Finance</option>
                <option value="computing" >Software and IT</option>
            </select>
            <input type="submit" onClick={GetAnswerForQ1} />

        </section>
     );
}
 
export default QuestionOne;