/* REACT ROUTER DOM */
import { Outlet } from 'react-router-dom';

/* CSS FILES */
import './main.css';
import './reset.css';

/* COMPONENTS AND PAGES */
import QuestionnairePage from './pages/questionnaire'

function MainApp() {
  return (
    <body className="main">
      <nav className='navbar'>

      </nav>


      <section id='canvas' className='section'>
        <h1 className='header'>Main Page</h1>
        <QuestionnairePage/>
      </section>
      <Outlet/>
    </body>
  );
}

export default MainApp;
