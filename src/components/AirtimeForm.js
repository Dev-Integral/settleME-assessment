import { AirtimeList } from "../utils/AirtimeProviders";

const AirtimeForm = ({selectedUser}) => {
  return (
    <div className="max-w-[43vw] mx-auto bg-white rounded-lg mt-6 p-4 pr-8 pl-8 text-black">
      <div className="mb-3">
        <p className="font-bold">Source Account</p>
        <select className="border rounded-md bg-transparent p-2 w-full">
          <option value={""}>select Account</option>
          <option value={"personal"}>main Account - #500,000</option>
          <option value={"business"}>sub Account - #1,000,000</option>
        </select>
      </div>
      <div className="flex gap-4 justify-between mb-3">
        <div className="w-full">
          <p className="font-bold">Network Provider</p>
          <select className="border rounded-md bg-transparent p-2 w-full">
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
          />
        </div>
      </div>
      <div className="mb-3">
        <p className="font-bold">Amount</p>
        <input
          className="border rounded-md bg-transparent p-2 w-full"
          placeholder="Enter transfer amount"
          type="number"
        />
      </div>
      <div className="flex items-center justify-center mt-4 mb-2">
        <button className="border p-3 w-40 rounded-full bg-[#303030] text-white hover:bg-[#aeaeae]">
          Submit
        </button>
      </div>
    </div>
  );
};

export default AirtimeForm;
