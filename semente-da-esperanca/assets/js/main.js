document.addEventListener('DOMContentLoaded', () => {

    // Menu Hamburguer e Dropdown
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.getElementById('menu-list');
    const dropdownToggle = document.querySelector('.nav__dropdown-toggle');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navList.setAttribute('aria-expanded', !isExpanded);
            
            // Fecha o dropdown se o menu principal for fechado
            if (isExpanded && dropdownToggle) {
                 dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
            // Permite que o link principal do dropdown funcione em desktop
            if (window.innerWidth < 768) { 
                e.preventDefault();
                const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
                dropdownToggle.setAttribute('aria-expanded', !isExpanded);
            }
        });
    }

    // Máscaras de Input (CPF, Telefone, CEP)

    // Aplica uma máscara a um input
    function applyMask(input, mask) {
        input.addEventListener('input', (event) => {
            let value = event.target.value.replace(/\D/g, ''); // Remove todos os não-dígitos
            let maskedValue = '';

            switch (mask) {
                case 'cpf':
                    // 000.000.000-00
                    if (value.length > 11) value = value.substring(0, 11);
                    maskedValue = value.replace(/(\d{3})(\d)/, '$1.$2');
                    maskedValue = maskedValue.replace(/(\d{3})(\d)/, '$1.$2');
                    maskedValue = maskedValue.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                    break;
                case 'telefone':
                    // (00) 0000-0000 ou (00) 00000-0000
                    if (value.length > 11) value = value.substring(0, 11);
                    maskedValue = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                    if (value.length > 10) {
                        maskedValue = maskedValue.replace(/(\d{5})(\d)/, '$1-$2');
                    } else {
                        maskedValue = maskedValue.replace(/(\d{4})(\d)/, '$1-$2');
                    }
                    break;
                case 'cep':
                    // 00000-000
                    if (value.length > 8) value = value.substring(0, 8);
                    maskedValue = value.replace(/(\d{5})(\d)/, '$1-$2');
                    break;
            }

            event.target.value = maskedValue;
        });
    }

    document.querySelectorAll('[data-mask]').forEach(input => {
        const maskType = input.getAttribute('data-mask');
        applyMask(input, maskType);
    });

    // Sistema de verificação de dados em formulários
    const form = document.getElementById('cadastro-form');
    const feedbackToast = document.getElementById('feedback-message');

    // Exibe mensagem de feedback
    function showFeedback(message, isError = false) {
        feedbackToast.textContent = message;
        feedbackToast.className = 'toast'; // Reset
        feedbackToast.classList.add('toast--visible');
        feedbackToast.style.backgroundColor = isError ? 'var(--color-error)' : 'var(--color-secondary-dark)';
        feedbackToast.removeAttribute('hidden');

        setTimeout(() => {
            feedbackToast.classList.remove('toast--visible');
            feedbackToast.setAttribute('hidden', '');
        }, 5000); 
    }

    if (form) {
        // Limpa mensagens de erro ao digitar
        form.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('input', () => {
                input.setCustomValidity("");
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            let firstInvalidField = null;

            // Validação Nativa
            if (!form.checkValidity()) {
                isValid = false;
                // Exibe os tooltips nativos
                form.reportValidity(); 
            }

            // Validação de consistência
            const cpfInput = document.getElementById('cpf');
            const telInput = document.getElementById('telefone');

            // CPF
            if (cpfInput && cpfInput.value.length !== 14) {
                isValid = false;
                cpfInput.setCustomValidity("O CPF deve estar completo e no formato 000.000.000-00.");
                cpfInput.classList.add('is-invalid'); // Adiciona classe para estilo
                if (!firstInvalidField) firstInvalidField = cpfInput;
            } 
            
            // Telefone
            if (telInput && (telInput.value.length !== 14 && telInput.value.length !== 15)) {
                 isValid = false;
                 telInput.setCustomValidity("O telefone deve estar completo, incluindo o DDD.");
                 if (!firstInvalidField) firstInvalidField = telInput;
            }


            // Feedback Final e Foco
            if (isValid) {
                console.log('Formulário Válido. Enviando dados...');
                showFeedback('Cadastro realizado com sucesso! Em breve entraremos em contato.', false);
                // form.reset();
            } else {
                showFeedback('Por favor, corrija os erros nos campos marcados.', true);
                
                // Rola e foca no primeiro campo inválido
                if (firstInvalidField) {
                    firstInvalidField.focus();
                } else {
                     // Foca no primeiro campo inválido encontrado
                    const firstInvalid = form.querySelector(':invalid');
                    if (firstInvalid) firstInvalid.focus();
                }
            }
        });
    }
    

});