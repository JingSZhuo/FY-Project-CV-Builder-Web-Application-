/* CSS FILES */
import '../main.scss';
import '../reset.css';

/* REACT */
import React from 'react';

/* FIREBASE */
import db from '../firebase';
import { deleteField, doc, updateDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';


const EndSurvey = () => {

    const navigate = useNavigate();

    const SubmitSurveyAndWipeDate = async (event) => {
        event.preventDefault();
        await updateDoc(doc(db, "UserAuthExample", "DocumentExample(useAuthID?)"), {
            profile : {},
            Education: deleteField(),
            Experience: deleteField(),
            Skills: deleteField(),
            Other: deleteField(),
            OtherTitle: deleteField(),
        });
        alert('Survey submitted and data wiped');
        navigate('/');
    }

    return(
        <body className="main">
            <nav className='navbar'>
                <Link className='navbar-buttons' to={"/"}>Home</Link>
            </nav>


            <section id='canvas' className='section1'>
                <h1 className='header'>Survey Page</h1>
                            
                <section className='main-body-template-page'>
                    <form onSubmit={SubmitSurveyAndWipeDate}>
                        <h2>Survey</h2>
                        <br></br>
                        <p>All submissions will be anonymous</p>
                        <br></br>
                        <label for="q1-survey">How easy is it to use the CV builder?</label>
                        <br></br>
                        <div className='slider-question'>
                            <span>1</span><input id='q1-survey' type={'range'} min={"1"} max={"10"} step={"1"} defaultValue={"5"}/><span>10</span>
                        </div>
                        <br></br>
                        <label for="q2-survey">Do you find the CV builder user friendly?</label>
                        <br></br>
                        <div className='slider-question'>
                            <span>1</span><input id='q2-survey' type={'range'} min={"1"} max={"10"} step={"1"} defaultValue={"5"}/><span>10</span>
                        </div>
                        <br></br>
                        <label for="q3-survey">How likely would you recommend this CV builder web app to others?</label>
                        <br></br>
                        <div className='slider-question'>
                            <span>1</span><input id='q3-survey' type={'range'} min={"1"} max={"10"} step={"1"} defaultValue={"5"}/><span>10</span>
                        </div>
                        <br></br>
                        <div className='textarea-custom'>
                            <label for='textarea-user-opinion'>Any other feedback you would like to add?</label>
                            <textarea id='textarea-user-opinion' rows={"10"} cols={"50"}></textarea>
                        </div>
                        <br></br>
                        <div>
                            <input type={"submit"}/>
                        </div>
                    </form>
                </section>
            </section>
            <br></br>
        </body>
    )
}

export default EndSurvey;