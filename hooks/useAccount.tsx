import React, { useEffect, useState } from "react";
import { backendUrl } from "../casamia.config";

export interface AccountType {
  id: string;
  email: string;
}

interface BasicUserAccount {
  name: string;
  email: string;
}

const basicUserAccountDefault: BasicUserAccount = {
  name: "name",
  email: "mail",
};

export interface UserAccount {
  userName: string;
  email: string;
  points: number;
  money: number;
  name: string;
  gender: number;
  accountId?: string;
}

// @Get('findAllMoneyTransactionsByAccountId')
// findAllMoneyTransactionsByAccountId(@Query('accountId') accountId: string) {
//   return this.client.send(
//     { cmd: 'find-all-money-transactions-by-account-id' },
//     accountId,
//   );
// }

// @Get('findAllPointsTransactionsByAccountId')
// findAllPointsTransactionsByAccountId(@Query('accountId') accountId: string) {
//   return this.client.send(
//     { cmd: 'find-all-points-transactions-by-account-id' },
//     accountId,
//   );
// }

export default function useAccount() {
  const [userAccount, setUserAccount] = useState<UserAccount>({
    userName: "",
    name: "",
    email: "",
    points: 0,
    money: 0,
    gender: 0,
    accountId: "",
  });
  const [error, setError] = useState<string | null>(null);

  const findAccountByEmail = async (email: string) => {
    try {
      const response = await fetch(
        `${backendUrl}account/findByEmail?email=${email}`
      );

      const data = await response.json();

      setUserAccount({
        userName: data.userName,
        name: data.name,
        email: data.email,
        points: data.points,
        money: data.money,
        gender: data.gender,
        accountId: data.id,
      });

      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const createAccount = async (email: string) => {
    try {
      const response = await fetch(`${backendUrl}account/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        cache: "no-cache",
      });
      const data = await response.json();
      setUserAccount(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const findAllPointsTransactionsByAccountId = async () => {
    try {
      const response = await fetch(
        `${backendUrl}account/findAllPointsTransactionsByAccountId?accountId=${userAccount.accountId}`
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const findAllMoneyTransactionsByAccountId = async () => {
    try {
      const response = await fetch(
        `${backendUrl}account/findAllMoneyTransactionsByAccountId?accountId=${userAccount.accountId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache",
        }
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  //isProfileComplete(email: string)
  async function isProfileComplete(email: string) {
    try {
      const response = await fetch(
        `${backendUrl}account/isProfileComplete?email=${email}`
      );
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  //updateUserName(email: string, userName: string)
  async function updateUserName(email: string, userName: string) {
    try {
      const response = await fetch(`${backendUrl}account/updateUserName`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, userName }),
      });
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  //http://localhost:3001/account/updateProfile
  // id, userName, name, gender

  async function updateProfile(
    id: string,
    userName: string,
    name: string,
    gender: number
  ) {
    try {
      const response = await fetch(`${backendUrl}account/updateProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, userName, name, gender }),
      });
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  return {
    userAccount,
    findAccountByEmail,
    createAccount,
    isProfileComplete,
    updateUserName,
    findAllPointsTransactionsByAccountId,
    findAllMoneyTransactionsByAccountId,
    updateProfile,
  };
}
