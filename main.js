document.getElementById('convertir').addEventListener('click', () => {
    const expresionUsuario = document.getElementById('expresion').value.trim();

    if (!expresionUsuario) {
        Swal.fire("Error", "El campo de entrada está vacío", "error");
        return;
    }

    // Convertir la expresión de notación polaca a notación normal
    const resultadoConversión = convertirDePolaca(expresionUsuario);

    // Si la conversión es válida, mostrar el resultado
    if (resultadoConversión) {
        const resultadoFinal = evaluaExpresion(resultadoConversión); // Evaluar la expresión normal
        document.getElementById('resultado').textContent = resultadoConversión;
        document.getElementById('resultadoFinal').textContent = `Resultado: ${resultadoFinal}`;
        Swal.fire("Éxito", "Conversión exitosa", "success");
    } else {
        Swal.fire("Error", "La expresión es inválida o contiene números negativos", "error");
    }
});

// Función para limpiar los campos y resultados
document.getElementById('limpiar').addEventListener('click', () => {
    document.getElementById('expresion').value = ''; // Limpiar el campo de entrada
    document.getElementById('resultado').textContent = ''; // Limpiar el resultado
    document.getElementById('resultadoFinal').textContent = ''; // Limpiar el resultado final
});

// Función para convertir
const convertirDePolaca = (expresion) => {
    const pila = []; // Pila para almacenar números y operaciones
    const partesExpresion = expresion.split(' '); // Separar la expresión en partes

    for (let i = partesExpresion.length - 1; i >= 0; i--) { // Recorrer desde el final
        const elemento = partesExpresion[i];

        if (esNumerico(elemento)) { // Verificar si el elemento es un número
            if (parseFloat(elemento) < 0) { // Comprobar que no sea negativo
                return null; // Retornar null si hay un número negativo
            }
            pila.push(elemento); // Agregar el número a la pila
        } else if (['+', '-', '*', '/'].includes(elemento)) { // Si el elemento es un operador
            if (pila.length < 2) {
                return null; // Retornar null si hay menos de 2 números en la pila
            }
            const izquierda = pila.pop(); // Sacar el primer número
            const derecha = pila.pop(); // Sacar el segundo número
            const nuevaExpresion = `(${izquierda} ${elemento} ${derecha})`; // Crear la expresión normal
            pila.push(nuevaExpresion); // Agregar la nueva expresión a la pila
        } else {
            return null; // Retornar null si hay un elemento inválido
        }
    }

    return pila.length === 1 ? pila[0] : null; // Retornar la expresión normal si es válida
};

// Función para evaluar la expresión normal
const evaluaExpresion = (expresion) => {
    try {
        return eval(expresion); // Evaluar la expresión y retornar el resultado
    } catch (e) {
        return 'Error en la evaluación'; // Manejo de errores
    }
};

// Función para verificar si un valor es numérico
const esNumerico = (valor) => !isNaN(valor) && !isNaN(parseFloat(valor));
