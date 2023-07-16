import React, { useEffect, useState } from "react";
import { AddressForm } from "./AddressForm";

const Checkout = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    // addresses -> get
    console.log(localStorage.getItem("addresses"));
    setAddresses(JSON.parse(localStorage.getItem("addresses")) || []);
  }, []);

  console.log(addresses);

  const handleDeleteAddress = (addrId) => {
    const filteredAddresses = addresses.filter((addr) => addr.id !== addrId);
    setAddresses(filteredAddresses);
    localStorage.setItem(`addresses`, JSON.stringify(filteredAddresses));
  };
  return (
    <>
      <div>
        <button onClick={() => setToggleForm(true)}>Add new address</button>
      </div>
      {toggleForm && (
        <AddressForm addresses={addresses} setAddresses={setAddresses} />
      )}
      {addresses?.map((addr) => (
        <div>
          {addr.contact}{" "}
          <button onClick={(e) => handleDeleteAddress(addr.id)}>Delete</button>
        </div>
      ))}
    </>
  );
};

export default Checkout;
