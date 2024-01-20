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
        if (
          Number(record?.txnDate?.split("-")[1]) ===
            new Date().getMonth() + 1 &&
          Number(record?.txnDate?.split("-")[0]) === new Date().getFullYear()
        )
          count += 1;
      });
      if (count >= 3 && selectedUser.accountType === "retail") {
        return (discount = 18);
      }
    }
  }
  return discount;
};
