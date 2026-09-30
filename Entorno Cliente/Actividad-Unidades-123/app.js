'use strict';
document.addEventListener('DOMContentLoaded', () => {
const info = document.getElementById('info');

//Parametros de la URL
const urlParams = new URLSearchParams(window.location.search);
const usuario = urlParams.get('usuario') || 'Usuario';
const rol = urlParams.get('rol') || 'Invitado';

//Datos del navegador
const idioma = navigator.language;
const estado = navigator.onLine ? 'Conectado' : 'Desconectado';

//Id Unico
const idSesion = crypto.randomUUID();

//fecha y hora
const fechaHora = new Date().toLocaleDateString('es-ES');

info.innerHTML = `
    <p><strong>Identificador de sesión (UUID):</strong> ${idSesion}</p>
    <p><strong>Fecha:</strong> ${fechaHora}</p>
    <p><strong>Idioma:</strong> ${idioma} | <strong>Conexión:</strong> ${estado}</p>
    <p><strong>Usuario:</strong> <code>${usuario}</code> | <strong>Rol:</strong> <code>${rol}</code></p>
`
//Perfil
const btnEnviarCorreo = document.getElementById('btnEnviarCorreo');
const outPerfil = document.getElementById('out-perfil');

btnEnviarCorreo.addEventListener('click', () => {
    const correo = document.getElementById('CorreoLimpio').value;
    const correoLimpio = correo.trim().toLowerCase();
    const partes = correoLimpio.split('@');
    const nombre = partes[0].charAt(0).toUpperCase() + partes[0].slice(1);
    const dominio = partes[1]
    const codigoSocio = 53;
    const idSocio = String(codigoSocio).padStart(6, "0");

    outPerfil.innerHTML = `
        <p><strong>Correo electrónico:</strong> <code>${correoLimpio}</code></p>
        <p><strong>Nombre:</strong> <code>${nombre}</code></p>
        <p><strong>Dominio:</strong> <code>${dominio}</code></p>
        <p><strong>Codigo de Socio:</strong> <code>${idSocio}</code></p>
    `;    

});

const infoPerfil = document.getElementById('info-perfil');
let apodo = "";
let tipoSuscripcion = null;
let saldoEntradas = 0;

if (apodo === "") {
    apodo = "Espectador VIP";
}
if (tipoSuscripcion === null || tipoSuscripcion === undefined) {
    tipoSuscripcion = "Básica";
}
if (saldoEntradas === null || saldoEntradas === undefined) {
    saldoEntradas = 2;
}

infoPerfil.innerHTML = `
    <p><strong>Apodo:</strong> <code>${apodo}</code></p>
    <p><strong>Tipo de Suscripción:</strong> <code>${tipoSuscripcion}</code></p>
    <p><strong>Saldo de Entradas:</strong> <code>${saldoEntradas}</code></p>
`;


//TAQUILLA
const taquilla = document.getElementById('taquilla');

const taquillaPrecios = {
    EntradaGeneral: "8.50",
    ComboPareja: "12.00",
    Pack2Entradas: "18.00"
}

for (const precio in taquillaPrecios){
    const precioNum = Number(taquillaPrecios[precio]);
    const precioConDescuento = precioNum - 3;
    const precioConIva = precioConDescuento * 1.21;
    taquillaPrecios[precio] = precioConIva.toFixed(2);
}

taquilla.innerHTML = `
    <h2>Taquilla</h2>
    <p><strong>Entrada General:</strong> <code>${taquillaPrecios.EntradaGeneral}€</code></p>
    <p><strong>Combo Pareja:</strong> <code>${taquillaPrecios.ComboPareja}€</code></p>
    <p><strong>Pack 2 Entradas:</strong> <code>${taquillaPrecios.Pack2Entradas}€</code></p>
`;
    




});
