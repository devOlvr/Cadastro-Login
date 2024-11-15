const usernameInput = document.querySelector("#username");
const phoneInput = document.querySelector("#phone");
const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");
const formCadastro = document.querySelector(".form-cadastro");
const formLogin = document.querySelector(".form-login");

const phoneValue = phoneInput.value.replace(/\D+/g, "");

formCadastro.addEventListener("click", (event) => {
  event.preventDefault();
});

formLogin.addEventListener("click", (event) => {
  event.preventDefault();
});

function userValidation() {
  // Verifica se algum campo está vazio
  if (
    usernameInput.value == "" ||
    emailInput.value == "" ||
    phoneInput.value == "" ||
    passwordInput.value == ""
  ) {
    alert("Campo(s) em branco(s). Por favor, preencha todos os campos.");
    return false; // Impede a continuação da execução
  }

  // Validação de formato de e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value)) {
    alert("Por favor, insira um e-mail válido.");
    return false; // Impede a continuação da execução
  }

  // Validação de telefone
  if (phoneInput.value.length < 15 || phoneInput.value.length > 15) {
    alert("Por favor, insira um número de telefone válido.");
    return false; // Impede a continuação da execução
  }

  // Validação de senha (mínimo de 6 caracteres)
  if (passwordInput.value.length < 6) {
    alert("A senha deve ter pelo menos 6 caracteres.");
    return false; // Impede a continuação da execução
  }

  return true; // Todos os campos são válidos
}

async function handleConfirmRegister() {
  // Chama a função de validação
  if (!userValidation()) {
    return false; // Se a validação falhar, impede o envio
  } else {
    // Recupera os usuários armazenados no localStorage
    let userRegister = [];

    try {
      userRegister = JSON.parse(localStorage.getItem("users")) || [];
    } catch (err) {
      console.error("Erro ao ler os usuários do localStorage", err);
      userRegister = [];
    }

    const usernameRegister = usernameInput.value;
    const phoneRegister = phoneInput.value;
    const emailRegister = emailInput.value;
    const passwordRegister = passwordInput.value;

    // Verifica se o usuário já está cadastrado
    const userExists = userRegister.some(
      (user) => user.email === emailRegister || user.phone === phoneRegister
    );
    if (userExists) {
      alert("Já existe um usuário cadastrado com esse e-mail ou telefone.");
      return; // Impede o cadastro se o usuário já existir
    }

    // Adiciona o novo usuário
    userRegister.push({
      username: usernameRegister,
      phone: phoneRegister,
      email: emailRegister,
      password: passwordRegister,
    });

    // Armazena os usuários no localStorage
    localStorage.setItem("users", JSON.stringify(userRegister));

    // Limpa os campos do formulário
    usernameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";

    // Alerta de sucesso
    alert("Usuário cadastrado com sucesso!");
  }
}

function maskFormation(mask) {
  const phoneInput = document.querySelector("#phone");
  let valuePhoneInput = phoneInput.value;

  // Remove todos os caracteres não numéricos
  let valuePhoneInputNoPoint = valuePhoneInput.replace(/\D+/g, "");

  // Aplicação da máscara
  if (mask === "phoneNumber") {
    // Aplica a máscara no telefone: (XX) XXXXX-XXXX
    if (valuePhoneInputNoPoint.length <= 10) {
      phoneInput.value = valuePhoneInputNoPoint.replace(
        /^(\d{2})(\d{5})(\d{4})/,
        "($1) $2-$3"
      );
    } else {
      // Caso o valor do telefone tenha mais de 10 dígitos, corrige a máscara
      phoneInput.value = valuePhoneInputNoPoint.replace(
        /^(\d{2})(\d{5})(\d{4})/,
        "($1) $2-$3"
      );
    }
  }

  // Verifica o comprimento para garantir que o valor não ultrapasse o máximo
  const maxLength = phoneInput.maxLength;
  if (valuePhoneInputNoPoint.length > maxLength) {
    phoneInput.value = phoneInput.value.substring(0, maxLength);
  }
}

function handleChangeForm() {
  const sectionCadastro = document.querySelector(".section-cadastro");
  const formLogin = document.querySelector(".section-login");

  if (sectionCadastro.style.display == "block") {
    sectionCadastro.style.display = "none";
    formLogin.style.display = "block";
  } else {
    sectionCadastro.style.display = "block";
    formLogin.style.display = "none";
  }

  console.log("Trocar Formulário");
}
