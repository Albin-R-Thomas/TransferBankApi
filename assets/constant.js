const account = [
  {
    id: '1',
    name: 'Albin Thomas',
    pin: '1234',
    email: 'albinthomas130202.at@gmail.com',
    number: 7898807117,
    amount: 1000,
  },
  {
    id: '2',
    name: 'Albin Thomas',
    pin: '2341',
    email: 'albin30202.at@gmail.com',
    number: 7898807227,
    amount: 2000,
  },
  {
    id: '3',
    name: 'Albin Thomas',
    pin: '3412',
    email: 'albinsdfmas130202.at@gmail.com',
    number: 7898807337,
    amount: 3000,
  },
  {
    id: '4',
    name: 'Albin Thomas',
    pin: '4123',
    email: 'albimas130202.at@gmail.com',
    number: 7898807447,
    amount: 4000,
  },
];

const deleteAccount = (id) => {
  let success = false;
  for (let i = 0; i < account.length; i++) {
    if (account[i].id === id) {
      account.splice(i, 1);
      success = true;
      break;
    }
  }
  return { data: account, success: success };
};
const addAccount = (newAccount) => {
  let success = false;
  let id = newAccount.id;
  let index = -1;
  for (let i = 0; i < account.length; i++) {
    if (account[i].id === id) {
      index = i;
    }
  }

  if (index !== -1) {
    return { message: 'user already exist', success: success };
  }

  account.push(newAccount);
  success = true;
  return { data: account, success };
};
const getAccount = (id) => {
  let success = false;
  for (let i = 0; i < account.length; i++) {
    if (account[i].id === id) {
      let foundAccount = {
        id: account[i].id,
        name: account[i].name,
        amount: account[i].amount,
        phone: account[i].number,
        email: account[i].email,
      };
      success = true;
      return { data: foundAccount, success: success };
    }
  }
  return { message: 'No account was Found', success: success };
};

const transferAmount = (transferDetails) => {
  const { id1, id2, pin1, amount } = transferDetails;
  let index1 = -1;
  let index2 = -1;
  for (let i = 0; i < account.length; i++) {
    if (id1 === account[i].id) {
      index1 = i;
    }
    if (id2 === account[i].id) {
      index2 = i;
    }
  }
  if (index1 === -1 || index2 === -1) {
    return 'invalid credentials';
  } else if (index1 === index2) {
    return 'same account found';
  } else if (account[index1].pin !== pin1) {
    return 'pin mismatched';
  } else if (account[index1].amount - amount < 0) {
    return 'insufficient amount';
  } else {
    account[index1].amount -= amount;
    account[index2].amount += amount;
    return 'successfully transfered amount';
  }
};
const updateAccount = (updateDetails) => {
  let index = -1;
  let id = updateDetails.id;

  for (let i = 0; i < account.length; i++) {
    if (id === account[i].id) {
      index = i;
    }
  }
  if (index === -1) {
    return 'user does not exist';
  } else if (account[index].pin !== updateDetails.pin) {
    return 'invalid user credentials';
  } else {
    let newData = { ...account[index], ...updateDetails };
    newData.pin = updateDetails.newPin
      ? updateDetails.newPin
      : account[index].pin;
    return 'updated data';
  }
};
module.exports = {
  addAccount,
  deleteAccount,
  getAccount,
  transferAmount,
  updateAccount,
};
