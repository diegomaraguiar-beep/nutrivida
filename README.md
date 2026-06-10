# NutriVida 🥗

Site da nutricionista fictícia **NutriVida**, desenvolvido como projeto acadêmico.

- **1ª etapa:** site em HTML5, CSS e **Bootstrap 5**.
- **2ª etapa:** funcionalidades **interativas em JavaScript** com manipulação do DOM.

## ⚙️ Funcionalidades JavaScript implementadas

1. **Modo claro/escuro** — botão na barra de navegação que alterna o tema do site,
   com a preferência **salva no navegador** (`localStorage`), persistindo entre visitas.
2. **Calculadora de IMC** — o usuário informa peso e altura, e o site calcula o IMC
   e exibe a **classificação** (abaixo do peso, normal, sobrepeso, obesidade) com cores.
3. **Formulário de agendamento com validação** — valida nome, e-mail, telefone e
   serviço; mostra erros em cada campo e uma **mensagem de sucesso dinâmica** ao enviar.
4. **Sorteador de curiosidades (Dica do dia)** — botão que sorteia uma curiosidade de
   nutrição aleatória (sem repetir a anterior), com efeito de transição.
5. **Contadores animados** — os números de estatísticas sobem de 0 até o valor final
   quando entram na tela (`IntersectionObserver`).
6. **Animação ao scroll** — seções e cards surgem suavemente conforme o usuário rola.

> Extras: botão "voltar ao topo" e ano do rodapé preenchido automaticamente.

## 📁 Estrutura

```
site-nutricionista/
├── index.html
├── css/
│   └── style.css
└── js/
    └── app.js
```

## 🚀 Como publicar no GitHub Pages

1. Crie um repositório no GitHub (ex.: `nutrivida`).
2. Envie os arquivos (veja os comandos abaixo).
3. No GitHub: **Settings → Pages → Branch: `main` / `(root)` → Save**.
4. Aguarde 1–2 minutos. O link ficará: `https://SEU-USUARIO.github.io/nutrivida/`

### Comandos (rodar dentro da pasta do projeto)

```bash
git init
git add .
git commit -m "Site NutriVida com funcionalidades JavaScript"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/nutrivida.git
git push -u origin main
```

## 📝 Texto sugerido para o BLOG da disciplina

```
Nome: Diego

Link do projeto: https://SEU-USUARIO.github.io/nutrivida/

Funcionalidades implementadas:
- Modo claro/escuro com preferência salva no navegador.
- Calculadora de IMC com classificação automática.
- Formulário de agendamento com validação e mensagem de sucesso.
- Sorteador de curiosidades sobre nutrição.
- Contadores animados de estatísticas e animação ao rolar a página.
```
