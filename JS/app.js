// Función que carga la palabra
const cargarPalabras = async () => { 
    try { 

        // Realizamos la conexión a la API
        const respuesta = await fetch('https://random-word-api.herokuapp.com/word?lang=es'); 
        const datos = await respuesta.json(); 
        const palabraAleatoria = datos[0]; 
     
        let palabraSecreta = palabraAleatoria.replace(/./g, "_ "); 
        document.querySelector('.palabraSecreta').innerHTML = palabraSecreta; 

        const vidasTotales = 6; 
        let vidasRestantes = vidasTotales; 
        document.querySelector('.vidas').innerHTML = `Vidas restantes: ${vidasRestantes}`; 

        const reemplazar = (string, character, index) => { 
            return string.substring(0, index) + character + string.substring(index + character.length);
        }

        const verificarPalabra = () => { 
            const letra = document.querySelector('input').value; 
            document.querySelector('input').value = ''; 
            let acierto = false; 

            for (let i = 0; i < palabraAleatoria.length; i++) { 
                if (palabraAleatoria[i] === letra) { 
                    palabraSecreta = reemplazar(palabraSecreta, letra, i * 2); 
                    acierto = true; 
                }
            }

            document.querySelector('.palabraSecreta').innerHTML = palabraSecreta; 

            if (!acierto) { 
                vidasRestantes--; 
                document.querySelector('.vidas').innerHTML = `Vidas restantes: ${vidasRestantes}`; 
            }

            if (vidasRestantes === 0) { 
                document.querySelector('.container').innerHTML = '<h1 id="mensaje-final">Has perdido</h1>'; 
                
            }

            if (!palabraSecreta.includes("_")) { 
                document.querySelector('.container').innerHTML = '<h1 id="mensaje-final">Has ganado</h1>'; 
            }
        }

        document.querySelector('button').addEventListener('click', verificarPalabra);

    } catch (error) { 
        console.log(error); 
    }
}

// Inicia el juego
cargarPalabras();
