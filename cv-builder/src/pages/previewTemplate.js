/* CSS FILES */ 
import '../main.scss';
import '../reset.css';

/* COMPONENTS */
import ModernTemplateModel from '../template_components/Modern';

const PreviewTemplate = () => {
    return ( 
        <body className="main">
            <nav className='navbar'>
    
            </nav>
    
    
            <section id='canvas' className='section1'>
                <h1 className='header'>Main Page</h1>
                <br></br>
                <section className='preview'>
                    <ModernTemplateModel/>
                </section>
            </section>
        </body>
     );
}
 
export default PreviewTemplate;