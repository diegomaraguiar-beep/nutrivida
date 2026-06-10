/* =========================================================
   NutriVida — JavaScript
   Funcionalidades interativas (2ª etapa do projeto):
   1) Modo claro/escuro com persistência (localStorage)
   2) Calculadora de IMC com classificação
   3) Formulário de agendamento com validação + mensagem de sucesso
   4) Sorteador de curiosidades (dica do dia)
   5) Contadores animados de estatísticas
   6) Animação de elementos ao rolar a página (scroll reveal)
   ========================================================= */

// Espera o HTML carregar antes de manipular o DOM
document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     1) MODO CLARO / ESCURO
     ===================================================== */
  const btnTema = document.getElementById("btnTema");
  const iconeTema = btnTema.querySelector("i");
  const raiz = document.documentElement; // <html>

  // Aplica o tema salvo no navegador (se existir)
  const temaSalvo = localStorage.getItem("tema");
  if (temaSalvo === "escuro") {
    raiz.setAttribute("data-tema", "escuro");
    iconeTema.className = "bi bi-sun-fill";
  }

  btnTema.addEventListener("click", function () {
    const estaEscuro = raiz.getAttribute("data-tema") === "escuro";
    if (estaEscuro) {
      raiz.removeAttribute("data-tema");
      iconeTema.className = "bi bi-moon-stars-fill";
      localStorage.setItem("tema", "claro");
    } else {
      raiz.setAttribute("data-tema", "escuro");
      iconeTema.className = "bi bi-sun-fill";
      localStorage.setItem("tema", "escuro");
    }
  });


  /* =====================================================
     2) CALCULADORA DE IMC
     ===================================================== */
  const formImc = document.getElementById("formImc");
  const resultadoImc = document.getElementById("resultadoImc");
  const erroImc = document.getElementById("erroImc");

  formImc.addEventListener("submit", function (evento) {
    evento.preventDefault(); // não recarrega a página

    const peso = parseFloat(document.getElementById("peso").value);
    const alturaCm = parseFloat(document.getElementById("altura").value);

    // Validação simples dos campos
    if (!peso || !alturaCm || peso <= 0 || alturaCm <= 0) {
      erroImc.hidden = false;
      return;
    }
    erroImc.hidden = true;

    // Cálculo: IMC = peso / (altura em metros)²
    const alturaM = alturaCm / 100;
    const imc = peso / (alturaM * alturaM);
    const imcFormatado = imc.toFixed(1);

    // Classificação segundo a OMS
    let categoria, classe, faixa;
    if (imc < 18.5) {
      categoria = "Abaixo do peso";
      classe = "imc-abaixo";
      faixa = "Menor que 18,5";
    } else if (imc < 25) {
      categoria = "Peso normal";
      classe = "imc-normal";
      faixa = "18,5 a 24,9";
    } else if (imc < 30) {
      categoria = "Sobrepeso";
      classe = "imc-sobre";
      faixa = "25,0 a 29,9";
    } else {
      categoria = "Obesidade";
      classe = "imc-obeso";
      faixa = "30,0 ou mais";
    }

    // Monta o resultado no DOM
    resultadoImc.className = "resultado-imc " + classe;
    resultadoImc.innerHTML = `
      <div class="imc-valor ${classe}">${imcFormatado.replace(".", ",")}</div>
      <div class="imc-categoria ${classe}">${categoria}</div>
      <div class="imc-faixa">Faixa: ${faixa}</div>
    `;
  });


  /* =====================================================
     3) FORMULÁRIO DE AGENDAMENTO (validação + sucesso)
     ===================================================== */
  const formAgendar = document.getElementById("formAgendar");
  const sucessoAgendar = document.getElementById("sucessoAgendar");
  const textoSucesso = document.getElementById("textoSucesso");

  formAgendar.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const telefone = document.getElementById("telefone");
    const servico = document.getElementById("servico");

    let valido = true;

    // Nome: pelo menos 3 caracteres
    if (nome.value.trim().length < 3) {
      marcarInvalido(nome);
      valido = false;
    } else {
      marcarValido(nome);
    }

    // E-mail: precisa ter formato de e-mail
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.value.trim())) {
      marcarInvalido(email);
      valido = false;
    } else {
      marcarValido(email);
    }

    // Telefone: pelo menos 10 dígitos numéricos
    const digitos = telefone.value.replace(/\D/g, "");
    if (digitos.length < 10) {
      marcarInvalido(telefone);
      valido = false;
    } else {
      marcarValido(telefone);
    }

    // Serviço: precisa estar selecionado
    if (servico.value === "") {
      marcarInvalido(servico);
      valido = false;
    } else {
      marcarValido(servico);
    }

    // Se tudo certo, mostra mensagem de sucesso e limpa o formulário
    if (valido) {
      textoSucesso.textContent =
        "Obrigado, " + nome.value.trim().split(" ")[0] +
        "! Sua solicitação foi enviada. Entraremos em contato em breve. 💚";
      sucessoAgendar.hidden = false;
      formAgendar.reset();
      // remove as marcações de "válido" após limpar
      formAgendar.querySelectorAll(".is-valid").forEach(function (campo) {
        campo.classList.remove("is-valid");
      });
      sucessoAgendar.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      sucessoAgendar.hidden = true;
    }
  });

  function marcarInvalido(campo) {
    campo.classList.add("is-invalid");
    campo.classList.remove("is-valid");
  }
  function marcarValido(campo) {
    campo.classList.add("is-valid");
    campo.classList.remove("is-invalid");
  }


  /* =====================================================
     4) SORTEADOR DE CURIOSIDADES (dica do dia)
     ===================================================== */
  const curiosidades = [
    "Beber água antes das refeições ajuda no controle do apetite. 💧",
    "A cor dos alimentos indica diferentes nutrientes — coma um arco-íris no prato! 🌈",
    "Mastigar devagar melhora a digestão e a sensação de saciedade. 😋",
    "A banana é rica em potássio e ótima para os músculos. 🍌",
    "Comer frutas é melhor do que tomar suco: mantém as fibras. 🍓",
    "O abacate tem gorduras boas que fazem bem ao coração. 🥑",
    "Dormir bem também faz parte de uma alimentação saudável. 😴",
    "Castanhas são fontes de boas gorduras e dão energia. 🌰",
    "Reduzir o açúcar aos poucos reeduca o paladar. 🍬",
    "Verduras escuras, como couve e espinafre, são ricas em ferro. 🥬",
    "Tomar sol com segurança ajuda o corpo a produzir vitamina D. ☀️",
    "Planejar as refeições da semana evita escolhas por impulso. 📝",
  ];

  const btnDica = document.getElementById("btnDica");
  const textoDica = document.getElementById("textoDica");
  let ultimoIndice = -1;

  btnDica.addEventListener("click", function () {
    let indice;
    // sorteia sem repetir a dica anterior
    do {
      indice = Math.floor(Math.random() * curiosidades.length);
    } while (indice === ultimoIndice && curiosidades.length > 1);
    ultimoIndice = indice;

    // pequeno efeito de fade ao trocar
    textoDica.style.opacity = 0;
    setTimeout(function () {
      textoDica.textContent = curiosidades[indice];
      textoDica.style.opacity = 1;
    }, 180);
  });


  /* =====================================================
     5) CONTADORES ANIMADOS DE ESTATÍSTICAS
     ===================================================== */
  const contadores = document.querySelectorAll(".stat-num");

  function animarContador(elemento) {
    const alvo = parseInt(elemento.getAttribute("data-alvo"), 10);
    const sufixo = elemento.getAttribute("data-sufixo") || "";
    const duracao = 1500; // ms
    const inicio = performance.now();

    function passo(agora) {
      const progresso = Math.min((agora - inicio) / duracao, 1);
      const valor = Math.floor(progresso * alvo);
      elemento.textContent = valor + sufixo;
      if (progresso < 1) {
        requestAnimationFrame(passo);
      } else {
        elemento.textContent = alvo + sufixo;
      }
    }
    requestAnimationFrame(passo);
  }

  // dispara a animação só quando as estatísticas aparecem na tela
  const observadorStats = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        animarContador(entrada.target);
        observadorStats.unobserve(entrada.target); // anima só uma vez
      }
    });
  }, { threshold: 0.5 });

  contadores.forEach(function (contador) {
    observadorStats.observe(contador);
  });


  /* =====================================================
     6) ANIMAÇÃO DE ELEMENTOS AO ROLAR A PÁGINA
     ===================================================== */
  const elementosReveal = document.querySelectorAll(".reveal");

  const observadorReveal = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("ativo");
        observadorReveal.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });

  elementosReveal.forEach(function (el) {
    observadorReveal.observe(el);
  });


  /* =====================================================
     EXTRAS: botão "voltar ao topo" e ano do rodapé
     ===================================================== */
  const btnTopo = document.getElementById("btnTopo");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
      btnTopo.classList.add("visivel");
    } else {
      btnTopo.classList.remove("visivel");
    }
  });

  btnTopo.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // preenche o ano atual no rodapé automaticamente
  document.getElementById("ano").textContent = new Date().getFullYear();

  // fecha o menu mobile ao clicar em um link
  document.querySelectorAll("#menu .nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      const menu = document.getElementById("menu");
      if (menu.classList.contains("show")) {
        new bootstrap.Collapse(menu).hide();
      }
    });
  });
});
