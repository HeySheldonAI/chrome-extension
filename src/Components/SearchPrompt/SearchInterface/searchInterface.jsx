import './searchInterface.scss';
import { useEffect, useState } from "react";

const tones = ["General", "Formal", "Informal", "Optimistic", "Worried", "Friendly", "Curious",
    "Assertive", "Encouraging", "Surprised", "Cooperative"];

const SearchInterface = ({ token }) => {
    const [responseTone, setResponseTone] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [onSettingPage, setOnSettingPage]= useState(false)

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

    if(!onSettingPage){

    return (
        <div className="flex-column">
            <div className="flex">
                <select className="border-none h-37px optionn" name="tones" id="tones" onChange={e => setResponseTone(e.target.value)}>
                    {tones.map(tone => <option value={tone} className="border-none h-37px optionn" placeholder="Response Tone">{tone} </option>)}
                </select>
                <div className='vl'></div>
                <input className="border-none input-fieldd" type="text" id="searchfield" placeholder="Write me an Excel formula that..." onChange={e => setSearchQuery(e.target.value)} />
                <button className="border-none h-37px search-buttonn">
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
                <div className='actual-response'>You can use Sheldon to get ideas for your blogs, new videos, tweets,
                 Linkedin posts. All you have to do is: Select the ‘Creative’ response tone, give Sheldon a prompt
                  like “Write me a Twitter thread on the topic - 10 Physical exercises you can perform at home” and 
                  hit enter.
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
                    <div className='actual-email'>hashtodi@gmail.com</div>
                </div>
                <div className='creditss flex'>
                    <div className='credits-headingg'>Credits:</div>
                    <div className='credit-pointt'> 20 </div>
                    <div className='credit-requestt'>Request credits</div>
                </div>
                <div className='logout-button flex'>
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