/* CSS FILES */ 
import '../main.scss';
import '../reset.css';

/* COMPONENTS */
import ModernTemplateModel from '../template_components/Modern';
import jsPDF from 'jspdf';

/*  REACT */
import { Link } from 'react-router-dom';

/* OTHER */
//import "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.js"

const PreviewTemplate = () => {

    const pdfConverterSettings ={
        margin: 1,
        filename: "cv.pdf",
        html2canvas: {
            scale: 2
        },
        jsPDF: {
            unit: 'in',
            format: 'letter',
            orientation: 'portrait'
        }
    };

    const ConvertToPDF = () => {

        const offsetHeight = document.getElementById('template').offsetHeight;
        const offsetWidth = document.getElementById('template').offsetWidth;

        console.log(offsetWidth, offsetHeight);

        const doc = new jsPDF('p', 'px', [offsetWidth, offsetHeight+2]);
        const getComponentID = document.getElementById('template');
       
        doc.html(getComponentID, {
            callback: function () {
                doc.save('cv.pdf');
            }
        })        
    }

    return ( 
        <div className="main">

            <nav className='navbar'>
                <Link className='navbar-buttons' to={"/"}>Home</Link>
            </nav>
    
    
            <section id='canvas' className='section1'>
                <h1 className='header'>Preview</h1>
                <br></br>
                <section className='preview'>
                    <ModernTemplateModel/>
                    <div className='cv-options'>
                        <button onClick={ConvertToPDF}>Export to PDF</button>
                        <Link to={'/surveyCV'}>Finish</Link>
                    </div>
                </section>   
            </section>
        </div>
     );
}
 
export default PreviewTemplate;