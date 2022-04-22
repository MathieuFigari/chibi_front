import { NavLink } from 'react-router-dom';
import './store-nav.scss';

export default function StoreNav({ categories }) {
    console.log(categories);
    return (
        <ul className="store-nav">
            {categories.map(category => (
                <li key={category.id} className="store-nav__item">
                    <NavLink 
                        className="store-nav__link" 
                        activeClassName="store-nav__link--selected" 
                        exact to={`/boutique/${category.id}`}
                    >
                        {category.category_name}
                    </NavLink>
                </li>
            ))}
            <li className="store-nav__item">
                <NavLink 
                    className="store-nav__link" 
                    activeClassName="store-nav__link--selected" 
                    exact to="/boutique/formulaire/custom"
                >
                    Sablés personnalisés
                </NavLink>
            </li>
        </ul>
    )
}
