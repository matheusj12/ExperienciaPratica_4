// validation.js - Validação simples de formulários

const Validation = {
    validateForm(form) {
        let valid = true;

        form.querySelectorAll("input[required], textarea[required]").forEach((field) => {
            field.classList.remove("invalid");

            if (field.value.trim() === "") {
                field.classList.add("invalid");
                valid = false;
            }

            if (field.type === "email" && !this.validateEmail(field.value)) {
                field.classList.add("invalid");
                valid = false;
            }
        });

        return valid;
    },

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
};

window.Validation = Validation;
