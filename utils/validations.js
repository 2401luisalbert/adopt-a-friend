const regexName = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/;
const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+ "))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zAZ\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexPass = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
const regexNumber = /^([0-9])*$/;

export function registerValidate(form) {
    const { name, firstName, lastName, email, password, repeatPassword } = form;
    const errors = {};

    if (!regexName.test(name)) errors.name = `Nombre "${name}" no válido`;

    if (!regexName.test(firstName)) errors.firstName = `Apellido Paterno "${firstName}" no válido`;

    if (!regexName.test(lastName)) errors.lastName = `Apellido Materno "${lastName}" no válido`;

    if (!email || !password || !repeatPassword) errors.emptyFields = 'Llena todos los campos';

    if (!regexEmail.test(email)) errors.email = `Correo "${email}" no válido`;

    if (!regexPass.test(password)) errors.password = `La contraseña debe tener mínimo 6 caracteres, al menos una mayúscula y un número`;

    if (password !== repeatPassword) errors.repeatPassword = 'Las contraseñas no coinciden';

    return errors;
}


export function loginValidate(form) {
    const { email, password } = form;
    const errors = {};

    if (!email || !password) errors.emptyFields = 'No puedes dejar campos vacíos';

    if (!regexEmail.test(email)) errors.email = `Correo "${email}" no válido`;

    if (!regexPass.test(password)) errors.password = `La contraseña debe tener mínimo 6 caracteres, al menos una mayúscula y un número`;

    return errors;
}

export function petValidate(form, selectedImages) {
    const { name, age, breed, size, color } = form;
    const errors = {};

    if (!regexName.test(name)) errors.name = `Nombre "${name}" no válido`;

    if (!regexName.test(breed)) errors.breed = `Raza "${breed}" no válida`;

    if (!regexName.test(size)) errors.size = `Tamaño "${size}" no válido`;

    if (!regexName.test(color)) errors.color = `Color "${color}" no válido`;

    if (!regexNumber.test(age) || age < 0 || age > 20) errors.age = 'La edad no es válida';

    if (selectedImages.length <= 0) errors.image = 'Debes seleccionar una imagen';

    return errors;
}
