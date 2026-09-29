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

    outPerfil.innerHTML = `
        <p><strong>Correo electrónico:</strong> <code>${correoLimpio}</code></p>
        <p><strong>Nombre:</strong> <code>${nombre}</code></p>
        <p><strong>Dominio:</strong> <code>${dominio}</code></p>
    `;
});
});