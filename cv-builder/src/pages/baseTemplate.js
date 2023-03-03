/* REACT IMPORTS */
import { useEffect } from 'react';

/* CSS FILES */
import '../main.scss';
import '../reset.css';

/* FIREBASE */
// import db from '../firebase'
// import { useNavigate } from 'react-router-dom';
// import { onSnapshot, doc } from 'firebase/firestore';

/* COMPONENTS */

import FormSection from '../cv_section_components/formSection';
import ModernTemplateModel from '../template_components/Modern';

const BaseTemplate = () => {

    useEffect(() => {
        console.log("performing some action...");
    }, [])

    return ( 

        <body className="main">
            <nav className='navbar'>

            </nav>


            <section id='canvas' className='section1'>
                <h1 className='header'>Template Page</h1>
                            
                <section className='main-body-template-page'>
                    <FormSection/>
                    <ModernTemplateModel />
                </section>
            </section>
            <br></br>

        </body>

    );
}
 
export default BaseTemplate;