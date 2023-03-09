import './LoginPage.scss';



const LoginPage = () => {
    const handleClick = () => {
        chrome.runtime.sendMessage({action: "sheldon_redirect"});
    }

    return (
        <div class="sheldon__content">
            <img class="icon" src={chrome.runtime.getURL('assets/icons/icon48.png')} />
            <div class="heading">Welcome to Sheldon</div>
            <p class="text">AI Assistant that Saves 80% of your Time on the Internet</p>
            <button className='login-button' onClick={handleClick}>
               <img className='google-img' src={chrome.runtime.getURL('assets/icons/google.svg')} /> Continue with Google
                </button>
            <img className='messy-imgg' src={chrome.runtime.getURL('assets/icons/unboxing.svg')} />  
            <img className='unboxing-imgg' src={chrome.runtime.getURL('assets/icons/messy.svg')} />  
        </div>
    );
}

export default LoginPage;