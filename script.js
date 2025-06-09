
const btn = document.getElementById('dropdownBtn');
const menu = document.getElementById('dropdownMenu');

btn.onclick = function(e) {
    e.stopPropagation();
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
};


document.body.onclick = function() {
    menu.style.display = 'none';
};


const langPack = {
    zh: {
        title: "輸入你的電子郵件即可註冊或登入。",
        region: "台灣",
        change: "變更",
        emailPlaceholder: "電子郵件*",
        terms: `繼續即代表我同意Nike 的
      <a href="https://agreementservice.svs.nike.com/rest/agreement?agreementType=privacyPolicy&country=TW&language=zh&requestType=redirect&uxId=4fd2d5e7db76e0f85a6bb56721bd51df" target="_blank">隱私權政策</a>
      與
      <a href="https://agreementservice.svs.nike.com/rest/agreement?agreementType=termsOfUse&location=tw&language=zh&requestType=redirect&uxId=4fd2d5e7db76e0f85a6bb56721bd51df" target="_blank">使用條款</a>。`,
        continue: "繼續",
        emailError: "請輸入正確的電子郵件格式",
        emailRequired: "請輸入電子郵件",
        checkEmail: "請至信箱內收取驗證信: "
    },
    en: {
        title: "Enter your email to sign up or log in.",
        region: "US",
        change: "Change",
        emailPlaceholder: "Email*",
        terms: `By continuing, I agree to Nike's
      <a href="https://agreementservice.svs.nike.com/rest/agreement?agreementType=privacyPolicy&country=TW&language=en&requestType=redirect&uxId=4fd2d5e7db76e0f85a6bb56721bd51df" target="_blank">Privacy Policy</a>
      and
      <a href="https://agreementservice.svs.nike.com/rest/agreement?agreementType=termsOfUse&location=tw&language=en&requestType=redirect&uxId=4fd2d5e7db76e0f85a6bb56721bd51df" target="_blank">Terms of Use</a>.`,
        continue: "Continue",
        emailError: "Please enter a valid email address",
        emailRequired: "Please enter your email",
        checkEmail: "Please check your email for the verification link: "
    }
};

let currentLang = 'zh';


function setLang(lang) {
    currentLang = lang;
    document.querySelector('h1').textContent = langPack[lang].title;
    document.querySelector('.region').childNodes[0].nodeValue = langPack[lang].region;
    document.getElementById('dropdownBtn').textContent = langPack[lang].change;
    document.getElementById('email').placeholder = langPack[lang].emailPlaceholder;
    document.querySelector('.terms').innerHTML = langPack[lang].terms;
    document.querySelector('.button-wrapper button').textContent = langPack[lang].continue;

    // 切換語言時清除錯誤訊息
    document.getElementById('emailError').textContent = "";
    document.getElementById('email').classList.remove('error');
}


document.querySelectorAll('.dropdown-item').forEach(item => {
    item.onclick = function() {
        setLang(this.dataset.lang);
        menu.style.display = 'none';
    };
});


function validateEmail() {
    const email = document.getElementById('email');
    const errorDiv = document.getElementById('emailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value && !emailPattern.test(email.value)) {
        email.classList.add('error');
        errorDiv.textContent = langPack[currentLang].emailError;
    } else {
        email.classList.remove('error');
        errorDiv.textContent = "";
    }
}


function continueLogin() {
    const email = document.getElementById('email');
    const errorDiv = document.getElementById('emailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.value) {
        email.classList.add('error');
        errorDiv.textContent = langPack[currentLang].emailRequired;
        return;
    }

    if (!emailPattern.test(email.value)) {
        email.classList.add('error');
        errorDiv.textContent = langPack[currentLang].emailError;
        return;
    }

    email.classList.remove('error');
    errorDiv.textContent = "";
    alert(langPack[currentLang].checkEmail + email.value);

    //fetch('/api/email', {
       // method: 'POST',
       // headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify({ email })
    //})
       // .then(res => res.json())
       // .then(data => {
           // alert(data.message);
       // })
        //.catch(err => {
           // alert('發生錯誤');
       // });
}