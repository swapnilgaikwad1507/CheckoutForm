import React from "react";
import FormInput from './FormInput';

const AddressField = (props) => {

    return (
        <>

            {props.labelName && <label className="label-name">{props.labelName}</label>}
            <input className="form-control" name={props.name}
                placeholder='Address (House No, Building, Street, Area) *'
                value={props.value}
                onChange={(e) => props.updateUserInput(e.target.value, e.target.name)}
            />

            <input className="form-control input-field" name={props.nameLocality}
                placeholder='Locality / Town *'
                value={props.value}
                onChange={(e) => props.updateUserInput(e.target.value, e.target.name)}
            />

            <div className='row'>
                <div className="col-md-4 mx-auto">

                    <input className="form-control input-field" name={props.nameState}
                        placeholder='State'
                        value={props.value}
                        onChange={(e) => props.updateUserInput(e.target.value, e.target.name)}
                    />
                </div>
                <div className="col-md-4 mx-auto">
                    <input className="form-control input-field" name={props.nameCity}
                        placeholder='City'
                        value={props.value}
                        onChange={(e) => props.updateUserInput(e.target.value, e.target.name)}
                    />
                </div>
                <div className="col-md-4 mx-auto">
                    <input className="form-control input-field" name={props.nameZipcode}
                        placeholder='Zipcode'
                        value={props.value}
                        onChange={(e) => props.updateUserInput(e.target.value, e.target.name)}
                    />
                </div>
            </div></>
    )

}

export default AddressField