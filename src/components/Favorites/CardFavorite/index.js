import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteFavorites } from '../../../actions/favorites'
import Button from '../../Button';

import './card-favorite.scss';

const CardFavorite = ({ product_name, product_picture, product_id }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
    dispatch(deleteFavorites(product_id))
    };

    return (
        <article className="card-favorite">
            <p className="card-favorite__name">{product_name}</p>
            <img className="card-favorite__img" src={product_picture} alt={product_picture} />
            <Button type="button" handleClick={onDelete}>Supprimer des favoris</Button>
        </article>
    );  
}

CardFavorite.propTypes = {
    product_name: PropTypes.string.isRequired,
};

CardFavorite.defaultProps = {
    product_picture: "",
}

export default CardFavorite;
