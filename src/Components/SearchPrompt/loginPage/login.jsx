import './LoginPage.scss';

const LoginPage = () => {
    const handleClick = () => {
        chrome.runtime.sendMessage({action: "sheldon_redirect"});
    }

    return (
        <div class="content">
            <img class="icon" src={chrome.runtime.getURL('assets/icons/icon48.png')} />
            <h1 class="heading">Welcome to Sheldon</h1>
            <p class="text">AI Assistant that Saves 80% of your Time on the Internet</p>
            <button onClick={handleClick}>Click Here to Login</button>
        </div>
    );
}

export default LoginPage;