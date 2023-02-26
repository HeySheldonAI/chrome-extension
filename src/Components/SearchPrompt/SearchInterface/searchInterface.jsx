import { useEffect, useState } from "react";

const tones = ["General", "Formal", "Informal", "Optimistic", "Worried", "Friendly", "Curious",
"Assertive", "Encouraging", "Surprised", "Cooperative"];

const SearchInterface = ({ token }) => {
    const [responseTone, setResponseTone] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    fetch('https://staging.heysheldon.com/api/v1/user/get', {
        method: 'POST',
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    }).then(res => {
        const data = JSON.parse(res);
        console.log(data);
    })

    return (
        <div>
            <div>
                <select name="tones" id="tones" onChange={ e => setResponseTone(e.target.value) }>
                    { tones.map(tone => <option value={ tone }>{ tone }</option>)}
                </select>
                <input type="text" id="searchfield" onChange={ e => setSearchQuery(e.target.value) } />
                <button></button>
            </div>
            <div>
                <p>Search Suggestions</p>
            </div>
            <div>
                <p>Sheldon's Response</p>
                <p>Response here</p>
            </div>
            <div>
                <p>Sheldon</p>
            </div>
        </div>
    );
}

export default SearchInterface;