//pega a modal do index.html e dos input
const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

//verifica se tem alguem logado
checkLogged();

//LOGAR NO SISTEMA

//escuta o form, pra pegar quando uma ação é executada
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();//para permanecer na mesma pagina

    //pega valores do form
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    //se não encontrar a conta
    if(!account) {
        alert("Opps! Verifique o usuário ou a senha.");
        return;
    }

    //se senha for diferente
    if(account) {
        if(account.password !== password) {
            alert("Opps! Verifique o usuário ou a senha.");
            return;            
        }

        saveSession(email, checkSession)

        //caso tenha uma conta com essa senha
    window.location.href ="home.html";
    }
});

//CRIAR CONTA

//escuta o form, pra pegar quando uma ação é executada
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();//para permanecer na mesma pagina
    
    //pega valores do form
    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if(email.length < 5) {
        alert("Preencha o campo com um e-mail válido.");
        return; 
    }

    if(password.length < 4) {
        alert("Preencha a senha com no minímo 4 digitos.");
        return;
    }

    //salva conta
    saveAccount({
        login: email,
        password: password,
        trasactions: []
    });

    //para esconder o form usa hide
    myModal.hide();

    alert("Conta criada com sucesso.");

});

//se tiver alguem logado na local storage, pega esse login e joga na session storage
function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}

//salva a pessoa no localStorage
function saveAccount(data) {
    //Json.stringfy transforma em string
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
    //caso esteja check salva na memoria, idependente se fechar o nikel
    if(saveSession) {
        localStorage.setItem("session", data);
    }
    //se não, salva na seção e quando fechar a pagina os dados são apagados
    sessionStorage.setItem("logged", data);
}

//pega a key(email) salva no local Storage caso ela exista
function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        //Json.parse transforma para objeto a conta salva em string na funcao saveAccount
        return JSON.parse(account);
    }
    //caso nao ache conta retorna vazia
    return"";
}