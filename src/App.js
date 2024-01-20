import { Fragment, useState } from "react";
import TransactionType from "./components/TransactionType";
import TransferForm from "./components/TransferForm";
import AirtimeForm from "./components/AirtimeForm";
import { SampleUsers } from "./utils/SampleUsers";

function App() {
  const [selectedType, setSelectedType] = useState();
  const [selectedUser, setSelectedUser] = useState(SampleUsers[0]);

  const handleUser =(e) => setSelectedUser(SampleUsers[e.target.value])
  return (
    <div className="bg-[#303030] text-white h-screen p-6">
      <div className="md:flex justify-between items-center">
        <h1 className=" text-xl mb-2">
          Welcome back, <b>{selectedUser.name.split(" ")[0]}</b>
        </h1>
        <select className="rounded-md bg-transparent p-2 capitalize bg-[#303030]" onChange={handleUser}>
          {SampleUsers.map((user, key) => (
            <option key={key} value={key}>{user.name} - {user.accountType}</option>
          ))}
        </select>
      </div>
      <div>
        <h2 className="flex items-center justify-center">
          Please select Transaction Type
        </h2>
        <TransactionType
          setSelectedType={setSelectedType}
          selectedType={selectedType}
        />
      </div>
      <div className=" items-center justify-center">
        {selectedType === "transfer" && <TransferForm selectedUser={selectedUser} />}
        {selectedType === "airtime" && <AirtimeForm selectedUser={selectedUser} />}
      </div>
    </div>
  );
}

export default App;
