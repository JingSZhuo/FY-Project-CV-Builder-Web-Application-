/* CSS FILES */ 
import '../main.css';
import '../reset.css';

/* COMPONENTS AND PAGES */



function GetAnswerForQ2 () {                                               //Get quiz Value
    const x = document.getElementsByName("experience");

    for (let i = 0; i < x.length; i++) {
        if (x[i].value !== undefined && x[i].checked) 
            console.log(x[i].value)
    }

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
                <input type={"radio"} id='less-than-one' name='experience' value="one"/>
                <label>Less than 1 year</label>
                <input type={"radio"} id='one-two-three' name='experience' value="two"/>
                <label>1 - 3 years</label>
                <input type={"radio"} id='three-plus' name='experience' value="three"/>
                <label>3+ years</label>

                <input type="submit" onClick={GetAnswerForQ2}/>
            </form>
        </section>
     );
}
 
export default QuestionTwo;