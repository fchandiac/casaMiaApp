import React, {useEffect, useState} from "react";
const backendUrl = "http://localhost:3001/";

interface BasicUserAccount {
    name: string;
    email: string;
}

const basicUserAccountDefault: BasicUserAccount = {
    name: "name",
    email: "mail",
};




export default function useAccount() {
    const [userAccount, setUserAccount] = useState<BasicUserAccount>(basicUserAccountDefault);

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
            });
            const data = await response.json();
            setUserAccount(data);
            return data;
        } catch (e) {
            console.log(e);
        }
    }

    

    return {userAccount, findAccountByEmail, createAccount};
}

