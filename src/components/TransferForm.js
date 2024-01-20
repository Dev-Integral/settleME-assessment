import { useState } from "react";
import { BankList } from "../utils/Banklist";
import { calculateDiscount } from "../helper/helper";
import axios from "axios";

const TransferForm = ({ selectedUser }) => {
  const [input, setInput] = useState({
    sourceAccount: "",
    destinationAccount: "",
    destinationBank: "",
    amount: "",
  });
  const [inputError, setInputError] = useState({
    sourceAccount: false,
    destinationAccount: false,
    destinationBank: false,
    amount: false,
  });
  const [discountValue, setDiscountValue] = useState(0);
  const handLeInput = (e) => {
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
    setDiscountValue(calculateDiscount(selectedUser, input.amount));
    let discountedAmount;
    if (Number(calculateDiscount(selectedUser, input.amount) > 0)) {
      discountedAmount =
        input.amount -
        input?.amount * Number(calculateDiscount(selectedUser, input.amount) / 100);
    }
    const postData = { ...input, amount: discountedAmount };
    let isReady = validateInputs();
    if (isReady) {
      axios
        .post("https://jsonplaceholder.typicode.com/posts", postData)
        .then(() => {
          alert(
            `Transfer of ${input.amount} from ${input.sourceAccount} to ${input.destinationAccount} successful`
          );
        })
        .catch(() => alert("Unable to transfer to recipient."));
    } else {
        alert("INVALID FORM FIELD(S)")
    }
  };
  return (
    <div className="max-w-[43vw] mx-auto bg-white rounded-lg mt-6 p-4 pr-8 pl-8 text-black">
      <div className="mb-3">
        <p className="font-bold">Source Account</p>
        <select
          className="border rounded-md bg-transparent p-2 w-full"
          name="sourceAccount"
          onChange={handLeInput}
        >
          <option value={""}>Select Account</option>
          <option value={selectedUser.accountNumber}>
            Account Balance - ₦
            {Number(selectedUser.balance).toLocaleString("en-US")}
          </option>
        </select>
        {inputError.sourceAccount && (
            <p className="text-[red] text-sm">Invalid selection</p>
          )}
      </div>
      <div className="flex justify-between gap-4 mb-3">
        <div className="w-full">
          <p className="font-bold">Destination Account Number</p>
          <input
            className="w-full border rounded-md bg-transparent p-2"
            placeholder="Enter Account Number"
            type="number"
            name="destinationAccount"
            onChange={handLeInput}
          />
          {inputError.destinationAccount && (
            <p className="text-[red] text-sm">Invalid Account </p>
          )}
        </div>
        <div className="w-full">
          <p className="font-bold">Destination Account Bank</p>
          <select
            className=" w-full border rounded-md bg-transparent p-2"
            name="destinationBank"
            onChange={handLeInput}
          >
            <option>Select bank name</option>
            {BankList.map((bank, key) => (
              <option key={key} value={bank.name}>
                {bank.name}
              </option>
            ))}
          </select>
          {inputError.destinationBank && (
            <p className="text-[red] text-sm">Invalid Bank</p>
          )}
        </div>
      </div>
      <div className="mb-3">
        <p className="font-bold">Amount</p>
        <input
          className="border rounded-md bg-transparent p-2 w-full"
          placeholder="Enter transfer amount"
          type="number"
          name="amount"
          onChange={handLeInput}
        />
        {discountValue ? (
          <p className="mt-1">Discount Value: {discountValue}%</p>
        ) : null}
        {Number(input.amount) > Number(selectedUser?.balance) && (
          <p className="text-[red] text-sm">Invalid Amount</p>
        )}
        {inputError.amount && (
          <p className="text-[red] text-sm">Invalid Amount</p>
        )}
      </div>
      <div className="flex items-center justify-center mt-4 mb-2">
        <button
          disabled={Number(input.amount) > Number(selectedUser?.balance)}
          onClick={handleSubmit}
          className="border p-3 w-40 rounded-full bg-[#303030] text-white hover:bg-[#aeaeae]"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TransferForm;
