/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import './addresses.scss';
import { useEffect } from 'react';
import { addNewAddress, editAddress, deleteAddress } from '../../../actions/auth';
import AsideNavbar from '../AsideNavbar';
import { GET_USER_ADDRESSES } from '../../../actions/auth';
import AddressForm from '../../AddressForm';
import Modal from '../../Modal';

function Addresses() {
    const dispatch = useDispatch();
    const { userAddresses } = useSelector((state) => state.auth);

    const handleClickAdd = (address) => {
        dispatch(addNewAddress(address))
    };

    const handleClickEdit = (address) => {
        dispatch(editAddress(address))
    };

    const handleClickDelete = (address) => {
        dispatch(deleteAddress(address))
    };

    useEffect(() => {
        dispatch({type: GET_USER_ADDRESSES});
    }, []);
    console.log("user", userAddresses)
    return (
        <AsideNavbar>
            <h2>Mes adresses</h2>
            <div className="addresses">
                <Modal title="Ajouter une adresse"
                    component={
                        <AddressForm 
                            handleClickAdd={handleClickAdd}
                        />
                    }
                />
                {userAddresses && userAddresses.map(address => (
                    <div className="form__auth" key={address.id}>
                        <AddressForm 
                            data={address} 
                            handleClickEdit={handleClickEdit}
                            handleClickDelete={handleClickDelete}
                        />
                    </div>
                ))}
            </div>
        </AsideNavbar>
    );
}
  
export default Addresses;