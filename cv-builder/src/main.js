/* REACT ROUTER DOM */
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

/* CSS FILES */
import './main.scss';
import './reset.css';

/* COMPONENTS AND PAGES */
import QuestionnairePage from './pages/questionnaire'
import { useState } from 'react';

function IntroLogo () {
  return(
    <div className='intro' >
      <h1 className='header'>Main Page</h1>
      <p className='subheader'>Build effective CVs</p>
    </div>
  )
}

const MainApp = () => {

  const [question, setQuestion] = useState(0);

  function SpawnQuestionnaire () {
    setQuestion(1);
  }

  return (
    <body className="main">
      <nav className='navbar'>
        <Link className='navbar-buttons' onClick={() => {setQuestion(0)}} to={"/"}>Home</Link>
        <div className='navbar-buttons' onClick={SpawnQuestionnaire} >Create</div>
      </nav>


      <section id='canvas' className='section'>
        {question === 0 ? <IntroLogo/>  : <QuestionnairePage/> }
      </section>
      <Outlet/>
    </body>
  );
}

export default MainApp;
