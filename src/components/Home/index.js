import './home.scss';
import Carousels from '../Carousels';
import cafe from '../../assets/coffeeshop.jpg';

function Home() {
  return (
    <div className="home">
        <Carousels />
      <div className="presentation">
        <div className="presentation__img">
          <img src={cafe} alt="café" />
        </div>
        <div className="home__presentation">
          <p>CHIBI CAFE est un coffee shop / salon de thé situé en plein coeur de Paris.</p>
            
          <p>  Nous vous proposons des cafés et thés de spécialité, des déclinaisons de pâtisseries et des boissons colorées.
            Une épicerie fine proposant un large choix de produits sucrés.</p>
          <div className="presentation__link">
            <a className="store-nav__link"  href="/menu">Voir le menu</a>
            <a className="store-nav__link"  href="/boutique">Voir la boutique</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;