const $form = document.querySelector("#register-form");
const pass1 = document.querySelector("#password");
const pass2 = document.querySelector("#password2");

$form.addEventListener("submit", (e) => {
    if (pass1.value !== pass2.value) {
        e.preventDefault();
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Las contraseñas no coinciden!",
        });
    }

    const REGEX = /^[0-9]{10}$/;
    const phone = e.target.phone.value;

    if (!REGEX.test(phone)) {
        e.preventDefault();
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El número de teléfono no es válido!, debes ingresar 10 dígitos sin espacios ni guiones",
        });
    }
});
