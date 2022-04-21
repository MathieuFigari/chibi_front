import './appheader.scss';
import NavBar from "./NavBar";
import panda from '../../assets/panda.png';

function AppHeader() {
    return (
      <div className="header">
          <h1 className="header__title"><a href="/">Chibi Café <img src={panda} alt='panda' /></a></h1>
          <NavBar />
      </div>
    );
  }
  
export default AppHeader;