export const calculateDiscount = (selectedUser) => {
    let discount = 0;
    const yearCreated = selectedUser.createdAt?.split("-")[0];
    console.log(new Date().getSeconds(selectedUser.createdAt));
    if(new Date().getMilliseconds(selectedUser.createdAt)){
        // Old user created 4 years ago
    }
    return discount
}