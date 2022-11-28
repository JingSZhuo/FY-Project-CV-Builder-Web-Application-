import { Outlet } from 'react-router-dom';
import './main.css';
import './reset.css';

function MainApp() {
  return (
    <div className="main">
      <nav className='navbar'>

      </nav>


      <section id='canvas' className='section1'>
        <h1 className='header'>Header h1</h1>
        
      </section>
      <Outlet/>
    </div>
  );
}

export default MainApp;
