/* REACT IMPORTS */
import { useEffect } from 'react';

/* CSS FILES */
import '../main.scss';
import '../reset.css';

/* REACT */
import { Link } from 'react-router-dom';

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
                <Link className='navbar-buttons' to={"/"}>Home</Link>
            </nav>


            <section id='canvas' className='section1'>
                <br></br>
                <h1 className='header'>Template Page</h1>
                <br></br>
                            
                <section className='main-body-template-page'>
                    <FormSection/>
                    <ModernTemplateModel/>
                </section>
            </section>
            <br></br>

        </body>

    );
}
 
export default BaseTemplate;