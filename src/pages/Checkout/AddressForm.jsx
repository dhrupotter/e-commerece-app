import React, { useState } from "react";
import { v4 as uuid } from "uuid";

export const AddressForm = ({ addresses, setAddresses }) => {
  const [addressForm, setAddressForm] = useState({
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
  };

  return (
    <div>
      Checkout
      <h1>Address Management</h1>
      <div>
        <p>
          <b>Address line 1</b>
        </p>
        <input
          value={addressForm["addr1"]}
          onChange={(e) => handleUpdateAddressForm(e, "addr1")}
        />
      </div>
      <div>
        <p>
          <b>Address line 2</b>
        </p>
        <input
          value={addressForm["addr2"]}
          onChange={(e) => handleUpdateAddressForm(e, "addr2")}
        />
      </div>
      <div>
        <p>
          <b>City</b>
        </p>
        <input
          value={addressForm["city"]}
          onChange={(e) => handleUpdateAddressForm(e, "city")}
        />
      </div>
      <div>
        <p>
          <b>State</b>
        </p>
        <input
          value={addressForm["state"]}
          onChange={(e) => handleUpdateAddressForm(e, "state")}
        />
      </div>
      <div>
        <p>Pin code</p>
        <input
          value={addressForm["pinCode"]}
          onChange={(e) => handleUpdateAddressForm(e, "pinCode")}
        />
      </div>
      <div>
        <p>
          <b>Contact</b>
        </p>
        <input
          value={addressForm["contact"]}
          onChange={(e) => handleUpdateAddressForm(e, "contact")}
        />
      </div>
      <button onClick={handleSaveAddress}>Save</button>
    </div>
  );
};
