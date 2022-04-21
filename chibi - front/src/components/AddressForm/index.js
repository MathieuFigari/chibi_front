import './address-form.scss';
import Input from '../Input';
import Button from '../Button';
import { useState } from 'react';

const AddressForm = ({ data, disabled, required, handleClickEdit, handleClickDelete, handleClickAdd, handleStorageDeliveryAddress }) => {
    const [userAddress, setUserAddress] = useState({
        first_name: data?.first_name || "", 
        last_name: data?.last_name || "", 
        phone_number: data?.phone_number || "",
        street_number: (data?.principal_street_number || data?.street_number) || "",
        name_of_the_road: (data?.principal_name_of_the_road || data?.name_of_the_road) || "",
        postal_code: (data?.principal_postal_code || data?.postal_code) || "",
        city: (data?.principal_city || data?.city) || "",
        id: data?.id || ""
    });

    const handleChangeAddress = (value, name) => {
        setUserAddress({
            ...userAddress,
            [ name ] : value
        });
    }
    
    return (
        <div className="address-form">
            <Input type="text" name="first_name" id="first_name" placeholder="Prénom"                 
                value={userAddress.first_name}
                handleChange={handleChangeAddress}
                disabled={disabled}
                required={required}
            />
            <Input type="text" name="last_name" id="last_name" placeholder="Nom" 
                value={userAddress.last_name}
                handleChange={handleChangeAddress}
                disabled={disabled}
                required={required}
            />
            <Input type="tel" id="phone_number" name="phone_number" placeholder="Numéro de mobile" 
                value={userAddress.phone_number}
                handleChange={handleChangeAddress}
                disabled={disabled}
                required={required}
            />
            <div className="address">
                <Input type="text" id="street_number" name="street_number" placeholder="N° de rue"
                    value={userAddress.street_number}
                    handleChange={handleChangeAddress}
                    disabled={disabled}
                    required={required}
                />
                <Input type="text" id="name_of_the_road" name="name_of_the_road" placeholder="Nom de rue"
                    value={userAddress.name_of_the_road}
                    handleChange={handleChangeAddress}
                    disabled={disabled}
                    required={required}
                />
            </div>
            <div className="city">
                <Input type="text" id="postal_code" name="postal_code" pattern="[0-9]{5}" placeholder="Code postal"
                    value={userAddress.postal_code}
                    handleChange={handleChangeAddress}
                    disabled={disabled}
                    required={required}
                />
                <Input type="text" id="city" name="city" placeholder="Ville" 
                    value={userAddress.city}
                    handleChange={handleChangeAddress}
                    disabled={disabled}
                    required={required}
                />
            </div>
            {handleStorageDeliveryAddress && 
                <Button handleClick={() => handleStorageDeliveryAddress(userAddress)}>
                    Livrer à cette adresse
                </Button> 
            }
            {handleClickEdit &&
                <div className="names">
                    <Button handleClick={() => handleClickEdit(userAddress)}>Modifier</Button>
                    <Button handleClick={() => handleClickDelete(userAddress)}>Supprimer</Button>
                </div>
            }

            {handleClickAdd &&
                <Button handleClick={() => handleClickAdd(userAddress)}>Ajouter</Button>
            }
        </div>
    );
};

export default AddressForm;