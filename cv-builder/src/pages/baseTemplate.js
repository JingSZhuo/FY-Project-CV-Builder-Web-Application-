/* REACT IMPORTS */
import { useEffect } from 'react';

/* CSS FILES */
import '../main.css';
import '../reset.css';

/* FIREBASE */
import db from '../firebase'
import { useNavigate } from 'react-router-dom';

const BaseTemplate = () => {

    const navigate = useNavigate();

    function Redirect () {
        navigate('/');
    }

    useEffect(() => {
        console.log("performing some action...");
    }, [])

    return ( 

        <body className="main">
            <nav className='navbar'>

            </nav>


            <section id='canvas' className='section1'>
                <h1 className='header'>Template Page</h1>
            </section>
            <br></br>
            

        </body>

    );
}
 
export default BaseTemplate;