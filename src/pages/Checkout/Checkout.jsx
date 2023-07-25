import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import "./Checkout.css";
import { AddressForm } from "../../utils/Address/AddressForm";
import CheckoutBill from "../../components/CheckoutBill/CheckoutBill";

const Checkout = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState([]);
  useEffect(() => {
    // addresses -> get
    localStorage.setItem(
      `addresses`,
      JSON.stringify([
        {
          id: uuid(),
          recieverName: "Dhruvi Gandhi",
          addr1: "A/501, Manila Towers",
          addr2: "Bodakdev",
          city: "Ahmedabad",
          state: "Gujarat",
          pinCode: "380015",
          contact: "6354609690",
        },
      ])
    );
    const storedAddresses = JSON.parse(localStorage.getItem("addresses"));
    const firstAddress = storedAddresses.length > 0 ? storedAddresses[0] : [];
    setAddresses(storedAddresses || []);
    setSelectedAddress(firstAddress);
  }, []);

  const handleDeleteAddress = (addrId) => {
    const filteredAddresses = addresses.filter((addr) => addr.id !== addrId);
    setAddresses(filteredAddresses);
    localStorage.setItem(`addresses`, JSON.stringify(filteredAddresses));
  };

  return (
    <>
      <div className="checkout">
        <div className="address-details">
          {addresses?.map((addr) => {
            console.log(selectedAddress, addr);
            return (
              <div className="address">
                <div className="address-heading">
                  <label>
                    <input
                      type="radio"
                      checked={addr.id === selectedAddress.id}
                      onChange={() =>
                        setSelectedAddress(
                          addresses.find((address) => address.id === addr.id)
                        )
                      }
                    />
                    <strong>{addr.recieverName}</strong>
                  </label>{" "}
                  <button onClick={(e) => handleDeleteAddress(addr.id)}>
                    Delete
                  </button>
                </div>
                <p>
                  {addr.addr1}, {addr.addr2}
                </p>
                <p>
                  {addr.city} - {addr.pinCode}
                </p>
                <p>
                  <b>Contact: </b>
                  {addr.contact}
                </p>
                <hr />
              </div>
            );
          })}
          <button onClick={() => setToggleForm(true)} className="add-address">
            Add new address
          </button>
        </div>
        <div className="checkout-bill-section">
          <CheckoutBill addr={selectedAddress} />
        </div>
      </div>
      {toggleForm && (
        <AddressForm
          addresses={addresses}
          setAddresses={setAddresses}
          setToggleForm={setToggleForm}
        />
      )}
    </>
  );
};

export default Checkout;
