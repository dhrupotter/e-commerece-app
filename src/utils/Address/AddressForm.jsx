import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import "./AddressForm.css";

export const AddressForm = ({ addresses, setAddresses, setToggleForm }) => {
  const [addressForm, setAddressForm] = useState({
    recieverName: "",
    addr1: "",
    addr2: "",
    city: "",
    state: "",
    pinCode: "",
    contact: "",
  });

  const handleUpdateAddressForm = (e, key) => {
    setAddressForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSaveAddress = () => {
    const newAddresses = [...addresses, { ...addressForm, id: uuid() }];
    setAddresses(newAddresses);
    localStorage.setItem(`addresses`, JSON.stringify(newAddresses));
    setToggleForm(false);
  };

  return (
    <div className="address-from-page">
      <div className="address-form">
        <h2>Add address details</h2>
        <div className="form-input">
          <input
            placeholder="Enter full name"
            value={addressForm["recieverName"]}
            onChange={(e) => handleUpdateAddressForm(e, "recieverName")}
          />
        </div>
        <div className="form-input">
          <input
            placeholder="Enter address line 1"
            value={addressForm["addr1"]}
            onChange={(e) => handleUpdateAddressForm(e, "addr1")}
          />
        </div>
        <div className="form-input">
          <input
            placeholder="Enter address line 2"
            value={addressForm["addr2"]}
            onChange={(e) => handleUpdateAddressForm(e, "addr2")}
          />
        </div>
        <div className="form-input">
          <input
            placeholder="Enter city"
            value={addressForm["city"]}
            onChange={(e) => handleUpdateAddressForm(e, "city")}
          />
        </div>
        <div className="form-input">
          <input
            placeholder="Enter state"
            value={addressForm["state"]}
            onChange={(e) => handleUpdateAddressForm(e, "state")}
          />
        </div>
        <div className="form-input">
          <input
            placeholder="Enter pincode"
            value={addressForm["pinCode"]}
            onChange={(e) => handleUpdateAddressForm(e, "pinCode")}
          />
        </div>
        <div className="form-input">
          <input
            placeholder="Enter mobile number"
            value={addressForm["contact"]}
            onChange={(e) => handleUpdateAddressForm(e, "contact")}
          />
        </div>
        <button type="submit" className="form-btn" onClick={handleSaveAddress}>
          Save
        </button>
        <button className="form-btn" onClick={() => setToggleForm(false)}>
          Discard
        </button>
      </div>
    </div>
  );
};
