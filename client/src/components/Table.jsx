import React from 'react'
import { useState, useEffect } from 'react'

function Table() {
    const [contacts, setContacts] = useState([])

    async function fetchContacts() {
        const url = "http://localhost:3000/contacts"
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            setContacts(json);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchContacts()
    })

    // taken from here: https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
    // and modified!!!! 
    function formatPhoneNumber(phoneNumberString) {
        let result = ""; 
        
        for (let i = 0; i < phoneNumberString.length; i++){
            result += phoneNumberString[i];
            
            if (i == 2 || i == 5){
                result += "-";
            }
        }
        
        return result; 
    }

    return (
            <>
                {/* {console.log(contacts)} */}
                <h1 className="text-3xl font-bold flex justify-center mb-15">Table</h1>

                <div className="overflow-x-auto mx-50 mb-20 rounded-box border border-base-content/5 bg-base-100">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Phone number</th>
                        </tr>
                        </thead>
                        <tbody>
                            {contacts.map((value, id) => {
                                return(
                                    <tr key={id}>
                                        <td>{value.firstName}</td>
                                        <td>{value.lastName}</td>
                                        <td>{formatPhoneNumber(value.phoneNumber)}</td> 
                                    </tr>
                                )
                            })} 
                        </tbody>
                    </table>
                </div>
            </>
    )
}

export default Table