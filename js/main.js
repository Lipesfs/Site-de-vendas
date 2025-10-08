/* ============================================
   NAVEGAÇÃO SUAVE E INTERATIVIDADE
   ============================================ */

// Espera o DOM carregar completamente antes de executar o código
// DOMContentLoaded garante que todos os elementos HTML estejam prontos para uso
document.addEventListener('DOMContentLoaded', function() {

    /* ----------------------------------------
       NAVEGAÇÃO SUAVE ENTRE SEÇÕES
       ---------------------------------------- */

    // Seleciona todos os links que começam com # (links para seções da mesma página)
    const links = document.querySelectorAll('a[href^="#"]');

    // Percorre cada link encontrado
    links.forEach(link => {

        // Adiciona um evento de clique para cada link
        link.addEventListener('click', function(e) {

            // Previne o comportamento padrão do link (pular direto para a seção)
            e.preventDefault();

            // Pega o valor do atributo href (ex: "#products")
            const targetId = this.getAttribute('href');

            // Busca o elemento da seção usando o ID do href
            const targetSection = document.querySelector(targetId);

            // Se a seção existe na página
            if (targetSection) {

                // Pega a altura do header fixo (para compensar o espaço ocupado)
                const headerHeight = document.querySelector('.header').offsetHeight;

                // Calcula a posição final: posição da seção - altura do header
                // Isso garante que a seção não fique escondida atrás do header
                const targetPosition = targetSection.offsetTop - headerHeight;

                // Rola a página até a posição calculada de forma suave
                window.scrollTo({
                    top: targetPosition, // Posição vertical final
                    behavior: 'smooth' // Animação suave de rolagem
                });
            }
        });
    });


    /* ----------------------------------------
       FORMULÁRIO DE CONTATO VIA WHATSAPP
       ---------------------------------------- */

    // Seleciona o formulário de contato pelo seletor de classe
    const contactForm = document.querySelector('.contact-form');

    // Verifica se o formulário existe na página
    if (contactForm) {

        // Adiciona evento de envio do formulário
        contactForm.addEventListener('submit', function(e) {

            // Previne o comportamento padrão (enviar formulário e recarregar página)
            e.preventDefault();

            // Captura os valores dos campos do formulário
            const name = this.querySelector('input[name="name"]').value; // Nome do usuário
            const email = this.querySelector('input[name="email"]').value; // Email do usuário
            const message = this.querySelector('textarea[name="message"]').value; // Mensagem do usuário

            // Cria a mensagem formatada para enviar no WhatsApp
            // Usa template literals (backticks) para criar texto em múltiplas linhas
            const whatsappMessage = `Olá! Meu nome é ${name}.

📧 E-mail: ${email}

💬 Mensagem: ${message}`;

            // Cria a URL do WhatsApp com o número e a mensagem
            // encodeURIComponent codifica a mensagem para URL (substitui espaços, acentos, etc)
            const whatsappUrl = `https://wa.me/5521997197996?text=${encodeURIComponent(whatsappMessage)}`;

            // Abre o WhatsApp em uma nova aba
            window.open(whatsappUrl, '_blank');

            // Limpa todos os campos do formulário após envio
            this.reset();

            // Mostra uma mensagem de confirmação para o usuário
            alert('Sua mensagem será enviada via WhatsApp!');
        });
    }


    /* ----------------------------------------
       ANIMAÇÃO DE ENTRADA DOS ELEMENTOS
       ---------------------------------------- */

    // Configurações do observador de interseção
    const observerOptions = {
        threshold: 0.1, // Elemento será detectado quando 10% dele estiver visível
        rootMargin: '0px 0px -50px 0px' // Margem inferior negativa (detecta antes de chegar no final)
    };

    // Cria um observador de interseção (detecta quando elementos aparecem na tela)
    const observer = new IntersectionObserver(function(entries) {

        // Percorre cada elemento observado
        entries.forEach(entry => {

            // Se o elemento está visível na tela (intersecting = cruzando o viewport)
            if (entry.isIntersecting) {

                // Torna o elemento visível (estava invisível por padrão)
                entry.target.style.opacity = '1';

                // Move o elemento para a posição original (estava 20px abaixo)
                entry.target.style.transform = 'translateY(0)';
            }
        });

    }, observerOptions); // Passa as configurações para o observador


    // Seleciona todos os cards de produtos e características para animar
    const animatedElements = document.querySelectorAll('.product-card, .feature-card');

    // Percorre cada elemento que será animado
    animatedElements.forEach(el => {

        // Define estado inicial: invisível
        el.style.opacity = '0';

        // Define estado inicial: 20px abaixo da posição final
        el.style.transform = 'translateY(20px)';

        // Define a transição suave (animação de 0.6 segundos)
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        // Adiciona o elemento à lista de observados
        // Quando ele aparecer na tela, a animação será ativada
        observer.observe(el);
    });


    /* ----------------------------------------
       EFEITO PARALLAX NO SCROLL (OPCIONAL)
       ---------------------------------------- */

    // Adiciona evento de scroll na janela para efeitos ao rolar a página
    window.addEventListener('scroll', function() {

        // Pega a posição atual do scroll
        const scrolled = window.pageYOffset;

        // Seleciona a seção hero
        const heroSection = document.querySelector('.hero');

        // Se a seção hero existir
        if (heroSection) {

            // Cria efeito parallax: move o fundo mais devagar que o scroll
            // O fundo se move a 50% da velocidade do scroll (cria sensação de profundidade)
            heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });


    /* ----------------------------------------
       DESTAQUE NO MENU ATIVO
       ---------------------------------------- */

    // Seleciona todas as seções principais da página
    const sections = document.querySelectorAll('section[id]');

    // Seleciona todos os links de navegação
    const navLinks = document.querySelectorAll('.navbar a[href^="#"]');

    // Função para destacar o link do menu correspondente à seção visível
    function highlightNavOnScroll() {

        // Pega a posição atual do scroll
        const scrollY = window.pageYOffset;

        // Percorre cada seção
        sections.forEach(section => {

            // Pega a altura da seção
            const sectionHeight = section.offsetHeight;

            // Pega a posição do topo da seção
            const sectionTop = section.offsetTop - 100; // -100 para compensar o header

            // Pega o ID da seção
            const sectionId = section.getAttribute('id');

            // Se o scroll está dentro dos limites da seção
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {

                // Remove a classe 'active' de todos os links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Adiciona classe 'active' no link correspondente à seção visível
                const activeLink = document.querySelector(`.navbar a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Adiciona evento de scroll para atualizar o menu ativo
    window.addEventListener('scroll', highlightNavOnScroll);


    /* ----------------------------------------
       EFEITO DE LOADING NAS IMAGENS
       ---------------------------------------- */

    // Seleciona todas as imagens de produtos
    const productImages = document.querySelectorAll('.product-img img');

    // Percorre cada imagem
    productImages.forEach(img => {

        // Adiciona evento quando a imagem terminar de carregar
        img.addEventListener('load', function() {

            // Adiciona classe que indica que a imagem foi carregada
            this.classList.add('loaded');

            // Adiciona animação de fade in
            this.style.animation = 'fadeInUp 0.6s ease';
        });

        // Se a imagem já estiver em cache (carregada), dispara o evento manualmente
        if (img.complete) {
            img.classList.add('loaded');
        }
    });


    /* ----------------------------------------
       CONTADOR ANIMADO (EXEMPLO ADICIONAL)
       ---------------------------------------- */

    // Função para animar números (pode ser usada para mostrar estatísticas)
    function animateCounter(element, target, duration) {

        // Valor inicial
        let current = 0;

        // Incremento por frame (60 frames por segundo)
        const increment = target / (duration / 16.67);

        // Função de animação
        const timer = setInterval(() => {

            // Incrementa o valor atual
            current += increment;

            // Atualiza o texto do elemento
            element.textContent = Math.floor(current);

            // Se atingiu o valor final, para a animação
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16.67); // 60 FPS
    }

    // Exemplo de uso (descomente se quiser usar):
    // const counterElement = document.querySelector('.counter');
    // if (counterElement) {
    //     animateCounter(counterElement, 1000, 2000); // Anima de 0 a 1000 em 2 segundos
    // }

}); // Fim do DOMContentLoaded


/* ============================================
   FUNÇÕES GLOBAIS AUXILIARES
   ============================================ */

/**
 * Função para abrir WhatsApp com mensagem personalizada
 * @param {string} phone - Número de telefone com código do país (ex: "5521997197996")
 * @param {string} productName - Nome do produto (opcional)
 */
function openWhatsApp(phone, productName = '') {

    // Mensagem padrão
    let message = 'Olá! Tenho interesse em seus produtos.';

    // Se um produto específico foi passado, personaliza a mensagem
    if (productName) {
        message = `Olá! Tenho interesse no ${productName} com LED.`;
    }

    // Cria a URL do WhatsApp
    // encodeURIComponent garante que caracteres especiais sejam codificados corretamente
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    // Abre o WhatsApp em uma nova aba do navegador
    window.open(whatsappUrl, '_blank');
}


/**
 * Função para scroll suave até um elemento específico
 * @param {string} elementId - ID do elemento de destino
 */
function scrollToElement(elementId) {

    // Busca o elemento pelo ID
    const element = document.getElementById(elementId);

    // Se o elemento existir
    if (element) {

        // Pega a altura do header
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;

        // Calcula a posição
        const position = element.offsetTop - headerHeight;

        // Faz o scroll suave
        window.scrollTo({
            top: position,
            behavior: 'smooth'
        });
    }
}


/**
 * Função para validar email
 * @param {string} email - Email a ser validado
 * @returns {boolean} - True se o email for válido
 */
function validateEmail(email) {

    // Expressão regular para validar formato de email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Testa se o email corresponde ao padrão
    return regex.test(email);
}


/**
 * Função para mostrar mensagem de feedback
 * @param {string} message - Mensagem a ser exibida
 * @param {string} type - Tipo da mensagem ('success' ou 'error')
 */
function showMessage(message, type = 'success') {

    // Cria elemento div para a mensagem
    const messageDiv = document.createElement('div');

    // Adiciona classe de acordo com o tipo
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';

    // Define o texto da mensagem
    messageDiv.textContent = message;

    // Adiciona estilos inline para posicionamento fixo
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '100px';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translateX(-50%)';
    messageDiv.style.zIndex = '9999';
    messageDiv.style.minWidth = '300px';
    messageDiv.style.animation = 'fadeInUp 0.5s ease';

    // Adiciona a mensagem ao body
    document.body.appendChild(messageDiv);

    // Remove a mensagem após 3 segundos
    setTimeout(() => {

        // Adiciona animação de saída
        messageDiv.style.animation = 'fadeOut 0.5s ease';

        // Remove o elemento após a animação
        setTimeout(() => {
            messageDiv.remove();
        }, 500);

    }, 3000);
}


/**
 * Função para detectar se é dispositivo móvel
 * @returns {boolean} - True se for mobile
 */
function isMobile() {

    // Verifica largura da tela ou user agent do navegador
    return window.innerWidth <= 768 ||
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}


/* ----------------------------------------
   LOG DE INICIALIZAÇÃO (APENAS DESENVOLVIMENTO)
   ---------------------------------------- */

// Mostra mensagem no console quando o JavaScript carregar
console.log('Shopping das Letras - JavaScript carregado com sucesso!');
console.log('Dispositivo móvel:', isMobile() ? 'Sim' : 'Não');
console.log('Navegador:', navigator.userAgent);
