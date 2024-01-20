import React from "react";

const TransactionType = ({ setSelectedType, selectedType }) => {
  return (
    <div className="flex items-center justify-center py-3">
      <div
        className={`p-4 border cursor-pointer w-40 text-center ${selectedType === "airtime" ? "text-[#303030] bg-white " : ""}]`}
        onClick={() => setSelectedType("airtime")}
      >
        <p>Buy Airtime</p>
      </div>
      <div
        className={`p-4 border cursor-pointer w-40 text-center ${selectedType === "transfer" ? "text-[#303030] bg-white " : ""}]`}
        onClick={() => setSelectedType("transfer")}
      >
        <p>Transfer</p>
      </div>
    </div>
  );
};

export default TransactionType;
