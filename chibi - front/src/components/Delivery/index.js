/* eslint-disable react-hooks/exhaustive-deps */
import './delivery.scss';
import Form from '../Account/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import BooleanRadio from '../BooleanRadio';
import { setDeliveryAddress, setDeliveryRadio } from '../../actions/delivery';
import { Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { GET_USER_ADDRESSES } from '../../actions/auth';
import AddressForm from '../AddressForm';
import Modal from '../Modal';

const Delivery = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userAddressesStore = useSelector(state => state.auth.userAddresses);
    const { isNewAddress } = useSelector((state) => state.delivery);
    const { isLoggedIn, user } = useSelector(state => state.auth);

    const handleStorageDeliveryAddress = (element) => {
        dispatch(setDeliveryAddress(element));
        localStorage.setItem("deliveryAddress", JSON.stringify(element));
        history.push('/paiement');

    };

    const handleChange = (value) => {
        dispatch(setDeliveryRadio(value, "isNewAddress"));
    };

    useEffect(() => {
        if (isLoggedIn) {
            dispatch({type: GET_USER_ADDRESSES});
        }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return <Redirect to="/compte" />
    }
    
    return (
        <div className="delivery-container">
            <Form> 
                <h2>Livraison</h2>
                <div className="delivery">
                    <BooleanRadio 
                        label={["Livraison à votre adresse", "Livraison à une nouvelle adresse"]}
                        id={["userAddress", "newAddress"]}
                        handleChange={handleChange}
                        checked={isNewAddress}
                    />

                </div>
                {isNewAddress ?
                    <AddressForm required={true} 
                        handleStorageDeliveryAddress={handleStorageDeliveryAddress} 
                    /> :
                    <>
                        <AddressForm data={user} disabled={true} 
                            handleStorageDeliveryAddress={handleStorageDeliveryAddress} 
                        />
                        <Modal title="Choisir une autre adresse de livraison"
                            component={userAddressesStore?.length > 0 ?
                                <>
                                {userAddressesStore.map(element => (
                                    <AddressForm 
                                        key={element.id} 
                                        data={element} 
                                        handleStorageDeliveryAddress={handleStorageDeliveryAddress} 
                                    />
                                ))}
                                </> : null
                            }
                        />
                    </>
                }
            </Form>
        </div>
    );
};

export default Delivery;