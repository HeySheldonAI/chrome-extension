import './searchInterface.scss';
import { useEffect, useState } from "react";

import generateCustomHeader from "../../../helpers/generateCustomHeader";

const tones = ["General", "Formal", "Informal", "Optimistic", "Worried", "Friendly", "Curious",
    "Assertive", "Encouraging", "Surprised", "Cooperative"];

const defaultResponse = 'You can use Sheldon to get ideas for your blogs, new videos, tweets, Linkedin posts. All you have to do is: Select the ‘Creative’ response tone, give Sheldon a prompt like “Write me a Twitter thread on the topic - 10 Physical exercises you can perform at home” and hit enter.'

const SearchInterface = ({ token }) => {
    const [responseTone, setResponseTone] = useState(tones[0]);
    const [searchQuery, setSearchQuery] = useState('');
    const [onSettingPage, setOnSettingPage]= useState(false);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [sheldonResponse, setSheldonResponse] = useState(defaultResponse)

    useEffect(() => {
        let myHeaders = new Headers();
        myHeaders.append("x-custom-header", `${generateCustomHeader().responsePayload}`);
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        };

        fetch("https://prod.heysheldon.com/api/v1/user/get", requestOptions)
        .then(response => response.text())
        .then(data => {
            const user = JSON.parse(data).responsePayload
            setUser(user);
        })
        .catch(error => console.log('error', error));
    }, []);

    const handleSearch = () => {
        setLoading(true);
        let myHeaders = new Headers();
        myHeaders.append("x-custom-header", `${generateCustomHeader().responsePayload}`);
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        let body = {
            searchPrompt: searchQuery,
            searchTone: responseTone
        }

        // var urlencoded = new URLSearchParams();
        // urlencoded.append("searchPrompt", "what is the average of 4, 5, 6");
        // urlencoded.append("searchTone", "General");

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: body,
            user: user
        };

        fetch("https://prod.heysheldon.com/api/v1/search/new", requestOptions)
        .then(res => res.text())
        .then(data => {
            const response = JSON.parse(data);
            console.log(response);
            setLoading(false);
            if (response.responseType === 'error') setError(true);
            else setError(false);
        })
        .catch(err => console.log(err));
    }

    if(!onSettingPage){

    return (
        <div className="flex-column font-poppins">
            <div className="flex">
                <select className="border-none h-37px sheldon__option" name="tones" id="tones" onChange={e => setResponseTone(e.target.value)}>
                    {tones.map(tone => <option value={tone} className="border-none h-37px sheldon__option" placeholder="Response Tone">{tone} </option>)}
                </select>
                <div className='vl'></div>
                <input className="border-none input-field" type="text" id="searchfield" placeholder="Write me an Excel formula that..." onChange={e => setSearchQuery(e.target.value)} />
                <button className="border-none h-37px search-buttonn" onClick={handleSearch}>
                    <img src={chrome.runtime.getURL('assets/icons/search.svg')} />
                </button>
            </div>
            <div className="hl"></div>
            {/* <div className='search-suggestion flex-column'>
                <div className='div1'>Search Suggestions</div>
                <div className='div2 flex'>
                    <button className='suggestion-button flex'>
                        <img src={chrome.runtime.getURL('assets/icons/Lightbulb.svg')}  />
                        <div>Write excel formula for:  </div>
                    </button>
                    <button className='suggestion-button flex'>
                        <img src={chrome.runtime.getURL('assets/icons/Lightbulb.svg')}  />
                        <div>How to merge columns in Excel  </div>
                    </button>
                    <button className='suggestion-button flex'>
                        <img src={chrome.runtime.getURL('assets/icons/Lightbulb.svg')}  />
                        <div>How to merge columns in Excel  </div>
                    </button>
                </div>
            </div>
            <div className="hl"></div> */}
            <div className='sheldon-response'>
                <div className='response-heading'>Sheldon's Response</div>
                <div className='actual-response'>
                    { error ? 'Sheldon seems to be having some troubles. Please try again later.' : loading ? 'Sheldon is thinking...' : sheldonResponse }
                </div>
            </div>
            <div className='hl'></div>
            <div className="flex footerr">
                <div className='footerr-left'>Sheldon</div>
                <img className='settingg' onClick={()=>setOnSettingPage(true)} src={chrome.runtime.getURL('assets/icons/setting.svg')} />
            </div>
        </div>
    );
}
if(onSettingPage){
    return(
        <div className='flex-column'>
            <div className='h-37px headerr flex'>
                <div className='backk flex' onClick={()=> setOnSettingPage(false)}>
                    <img src={chrome.runtime.getURL('assets/icons/backArrow.svg')} />
                    &nbsp;Back
                    </div>
                <div className='headingg'>Settings</div>
            </div>
            <div className='hl' />
            <div className='bodyy'>
                <div className='emaill flex'>
                    <div className='email-heading'>Email:</div>
                    <div className='actual-email'>{ user.email }</div>
                </div>
                <div className='creditss flex'>
                    <div className='credits-headingg'>Credits:</div>
                    <div className='credit-pointt'>  { user.remainingCredits } </div>
                    <div className='credit-requestt'>Request credits</div>
                </div>
                <div className='logout-button flex'  onClick={() => chrome.runtime.sendMessage({ action: 'sheldon_redirect' })}>
                    Logout
                </div>
                <div className='flex bodyy-end'>
                  <a href='#'>Contact</a>
                  <a href='#'>Report a bug</a>
                  <a href='#'>Request a feature</a> 
                </div>
            </div>
            <div className='hl' />
            <div className="flex footerr">
                <div className='footerr-left'>Sheldon</div>
            </div>
        </div>
    )
}
}



export default SearchInterface;