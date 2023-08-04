//pega a modal do home.html
const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

//quando clicar no botao de sair executa a funcao logaut para sair da conta, através de um evento de click
document.getElementById("button-logout").addEventListener("click", logout);

//ADICIONAR LANÇAMENTO
document.getElementById("transaction-form").addEventListener("submit", function (e) {
    e.preventDefault();

    //pega dados
    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    //salva dados na lista
    data.transactions.unshift({
        value: value, description: description, type: type, date: date
    });

    //salva no local storage
    saveData(data);
    //reseta modal
    e.target.reset();
    //fecha modal
    myModal.hide();
    //lista transações
    getTransactions()

    alert("Lançamento adicionado com sucesso.")

});

checkLogged();

//area de login
function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "index.html";
        return;
    }

    //pega os dados do usuario logado
    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        //converte os dados que foram salvos em string la na index.js na funcao saveAccount() de volta para um objeto
        data = JSON.parse(dataUser);
    }

    getTransactions();

}

//para sair da conta
function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

//busca listagem de transações
function getTransactions() {
    const transactions = data.transactions;
    let transactionHtml = ``;

    if (transactions.length) {
        transactions.forEach((item) => {
            let type = "Entrada";

            if (item.type === "2") {
                type = "Sáida"
            }

            transactionHtml += `
            <tr>
                <th scope="row">${item.date}</th>
                <td>${item.value.toFixed(2)}</td>
                <td>${type}</td>
                <td>${item.description}</td>
                <td><button type="button" class="btn delete-button" id="${Date.now}">Excluir</button></td>
            </tr>           
            `
        })
    }

    document.getElementById("transactions-list").innerHTML = transactionHtml;
}

//salva no local storage
function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}
