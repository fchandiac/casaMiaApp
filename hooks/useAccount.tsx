import React, {useEffect, useState} from "react";
const backendUrl = "https://casamiabackend.onrender.com/";

interface BasicUserAccount {
    name: string;
    email: string;
}

const basicUserAccountDefault: BasicUserAccount = {
    name: "name",
    email: "mail",
};

interface UserAccount {
    userName: string;
    email: string;
    points: number;
    money: number;
    name: string;
    gender: number;
}




export default function useAccount() {
    const [userAccount, setUserAccount] = useState<UserAccount>({
        userName: "",
        name: "",
        email: "",
        points: 0,
        money: 0,
        gender: 0,
    });
    const [error, setError] = useState<string | null>(null);

    const findAccountByEmail = async (email: string) => {
        try {
            const response = await fetch(`${backendUrl}account/findByEmail?email=${email}`);
            const data = await response.json();
            setUserAccount(data);
            return data;
        } catch (e) {
            console.log(e);
        }
    }

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
    }

    //isProfileComplete(email: string)
    async function isProfileComplete(email: string) {
        try {
            const response = await fetch(`${backendUrl}account/isProfileComplete?email=${email}`);
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
            console.log(data);
            return data;
        } catch (e) {
            console.log(e);
        }
    }



    

    return {userAccount, findAccountByEmail, createAccount, isProfileComplete, updateUserName};
}

