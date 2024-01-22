import { useState } from "react";
import { AirtimeList } from "../utils/AirtimeProviders";
import axios from "axios";

const AirtimeForm = ({ selectedUser }) => {
  const [input, setInput] = useState({
    sourceAccount: "",
    phoneNumber: "",
    networkProvider: "",
    amount: "",
  });
  const [inputError, setInputError] = useState({
    sourceAccount: false,
    phoneNumber: false,
    networkProvider: false,
    amount: false,
  });
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setInputError({ ...inputError, [e.target.name]: false });
  };

  const validateInputs = () => {
    let instance = {};
    let isInvalid = [];
    Object.keys(input).forEach((field) => {
      if (!input[`${field}`]) {
        instance[`${field}`] = true;
        isInvalid.push(field);
        setInputError(instance);
      }
    });
    return isInvalid.length > 0 ? false : true;
  };

  const handleSubmit = () => {
    const postData = { ...input };
    let isReady = validateInputs();
    console.log(input);
    if (isReady) {
      axios
        .post("https://jsonplaceholder.typicode.com/posts", postData)
        .then(() => {
          setInput({});
          alert(
            `Airtime purchase successful`
          );
        })
        .catch(() => alert("Unable to transfer to recipient."));
    } else {
      alert("INVALID FORM FIELD(S)");
    }
  };

  return (
    <div className="max-w-[43vw] mx-auto bg-white rounded-lg mt-6 p-4 pr-8 pl-8 text-black">
      <div className="mb-3">
        <p className="font-bold">Source Account</p>
        <select className="border rounded-md bg-transparent p-2 w-full" name="sourceAccount" onChange={handleChange}>
          <option value={""}>Select Account</option>
          <option value={selectedUser.accountNumber}>
            Account Balance - ₦
            {Number(selectedUser.balance).toLocaleString("en-US")}
          </option>
        </select>
      </div>
      <div className="flex gap-4 justify-between mb-3">
        <div className="w-full">
          <p className="font-bold">Network Provider</p>
          <select
            className="border rounded-md bg-transparent p-2 w-full"
            name="networkProvider"
            onChange={handleChange}
          >
            <option>Select network provider</option>
            {AirtimeList.map((network, key) => (
              <option key={key}>{network.name}</option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <p className="font-bold">Phone number</p>
          <input
            className="w-full border rounded-md bg-transparent p-2"
            placeholder="Enter Account Number"
            type="number"
            name="phoneNumber"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mb-3">
        <p className="font-bold">Amount</p>
        <input
          className="border rounded-md bg-transparent p-2 w-full"
          placeholder="Enter transfer amount"
          type="number"
          name="amount"
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center justify-center mt-4 mb-2">
        <button
          onClick={handleSubmit}
          className="border p-3 w-40 rounded-full bg-[#303030] text-white hover:bg-[#aeaeae]"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AirtimeForm;
