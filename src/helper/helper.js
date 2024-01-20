export const calculateDiscount = (selectedUser, amount) => {
  let discount = 0;
  // Year data
  const yearCreated = new Date(selectedUser.createdAt).getTime();
  const currentYear = new Date(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`
  ).getTime();
  const timeDifference = Math.abs(currentYear - yearCreated);
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  const lastFourTransactions = selectedUser?.transactions?.slice(0, 4);
  let count = 0;
  // Logic for giving old users discount
  if (daysDifference >= 1461) {
    if (lastFourTransactions.length > 0) {
      lastFourTransactions?.forEach((record) => {
        if (
          Number(record?.txnDate?.split("-")[1]) ===
            new Date().getMonth() + 1 &&
          Number(record?.txnDate?.split("-")[0]) === new Date().getFullYear()
        )
          count += 1;
      });
      if (count <= 2) {
        return (discount = 10);
      }
    }
  } else {
    if (lastFourTransactions.length > 0) {
      lastFourTransactions?.forEach((record) => {
        // logic for giving retail users with over three transactions in a month discount
        if (
          Number(record?.txnDate?.split("-")[1]) ===
            new Date().getMonth() + 1 &&
          Number(record?.txnDate?.split("-")[0]) === new Date().getFullYear() &&
          Number(record.amount) >= 50000 &&
          selectedUser.accountType === "retail" &&
          amount >= 50000
        ) {
          count += 1;
        }
        // logic for giving business users with over three transactions in a month discount
        if (
          Number(record?.txnDate?.split("-")[1]) ===
            new Date().getMonth() + 1 &&
          Number(record?.txnDate?.split("-")[0]) === new Date().getFullYear() &&
          Number(record.amount) >= 150000 &&
          selectedUser.accountType === "business" &&
          amount >= 150000
        ) {
          count += 1;
        }
      });
      // Assign discount based on account type
      if (count >= 3 && selectedUser.accountType === "retail") {
        return (discount = 18);
      }
      if (count >= 3 && selectedUser.accountType === "business") {
        return (discount = 27);
      }
    }
  }
  return discount;
};
