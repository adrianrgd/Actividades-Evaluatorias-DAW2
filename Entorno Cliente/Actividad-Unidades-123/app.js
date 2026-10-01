"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const info = document.getElementById("info");
  let nombreSocio = "Anónimo";

  //Parametros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const usuario = urlParams.get("usuario") || "Usuario";
  const rol = urlParams.get("rol") || "Invitado";

  //Datos del navegador
  const idioma = navigator.language;
  const estado = navigator.onLine ? "Conectado" : "Desconectado";

  //Id Unico
  const idSesion = crypto.randomUUID();

  //fecha y hora
  const fechaHora = new Date().toLocaleDateString("es-ES");

  info.innerHTML = `
    <p><strong>Identificador de sesión (UUID):</strong> ${idSesion}</p>
    <p><strong>Fecha:</strong> ${fechaHora}</p>
    <p><strong>Idioma:</strong> ${idioma} | <strong>Conexión:</strong> ${estado}</p>
    <p><strong>Usuario:</strong> <code>${usuario}</code> | <strong>Rol:</strong> <code>${rol}</code></p>
`;
  //Perfil
  const btnEnviarCorreo = document.getElementById("btnEnviarCorreo");
  const outPerfil = document.getElementById("out-perfil");

  btnEnviarCorreo.addEventListener("click", () => {
    const correo = document.getElementById("CorreoLimpio").value;
    const correoLimpio = correo.trim().toLowerCase();
    const partes = correoLimpio.split("@");

    const nombreSocio = partes[0].charAt(0).toUpperCase() + partes[0].slice(1);

    const dominio = partes[1];
    const codigoSocio = 53;
    const idSocio = String(codigoSocio).padStart(6, "0");

    if (!isNaN(correo)) {
      alert("El correo no puede ser un numero");
      return;
    }

    outPerfil.innerHTML = `
        <p><strong>Correo electrónico:</strong> <code>${correoLimpio}</code></p>
        <p><strong>Nombre:</strong> <code>${nombreSocio}</code></p>
        <p><strong>Dominio:</strong> <code>${dominio}</code></p>
        <p><strong>Codigo de Socio:</strong> <code>${idSocio}</code></p>
    `;
  });

  const infoPerfil = document.getElementById("info-perfil");
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
  const taquilla = document.getElementById("taquilla");

  const taquillaPrecios = {
    EntradaGeneral: "8.50",
    ComboPareja: "12.00",
    Pack2Entradas: "18.00",
  };

  taquilla.innerHTML = `
    <h2>Taquilla</h2>
    <p><strong>Entrada General:</strong> <code>${taquillaPrecios.EntradaGeneral}€</code></p>
    <p><strong>Combo Pareja:</strong> <code>${taquillaPrecios.ComboPareja}€</code></p>
    <p><strong>Pack 2 Entradas:</strong> <code>${taquillaPrecios.Pack2Entradas}€</code></p>
`;

  //Calcular precios
  const taquillaDesc = document.getElementById("taquillaDesc");
  const btnDescuento = document.getElementById("btnDescuento");
  const descuento = document.getElementById("descuento");

  btnDescuento.addEventListener("click", () => {
    const descuentoNum = Number(descuento.value);
    if (descuentoNum < 0) {
      alert("El descuento no puede ser negativo");
      return;
    }
    if (descuentoNum > 5) {
      alert("El descuento no puede ser mayor a 5");
      return;
    }

    for (const precio in taquillaPrecios) {
      const precioNum = Number(taquillaPrecios[precio]);
      const precioConDescuento = precioNum - descuentoNum;
      const precioConIva = precioConDescuento * 1.21;
      taquillaPrecios[precio] = precioConIva.toFixed(2);
    }

    taquillaDesc.innerHTML = `
        <h2>Taquilla con descuento e IVA</h2>
        <p><strong>Entrada General:</strong> <code>${taquillaPrecios.EntradaGeneral}€</code></p>
        <p><strong>Combo Pareja:</strong> <code>${taquillaPrecios.ComboPareja}€</code></p>
        <p><strong>Pack 2 Entradas:</strong> <code>${taquillaPrecios.Pack2Entradas}€</code></p>
    `;
  });

  verRecibo.addEventListener("click", () => {
    const recibo = document.getElementById("recibo");
    let subtotal = 0;
    let descuentoTotal = 0;
    let ivaTotal = 0;
    let total = 0;

    for (const precio in taquillaPrecios) {
      subtotal += Number(taquillaPrecios[precio]);
      descuentoTotal += Number(descuento.value);
      ivaTotal += Number(taquillaPrecios[precio]) * 0.21;
      total += Number(taquillaPrecios[precio]) * 1.21;
    }
    recibo.innerHTML = `
        <h2>Recibo</h2>
        <p><strong>Subtotal:</strong> <code>${subtotal.toFixed(2)}€</code></p>
        <p><strong>Descuento:</strong> <code>-${descuentoTotal.toFixed(2)}€</code></p>
        <p><strong>IVA:</strong> <code>+${ivaTotal.toFixed(2)}€</code></p>
        <hr>
        <p><strong>Total:</strong> <code>${total.toFixed(2)}€</code></p>
    `;
  });

  //Temporizador Descuento

  const IniTemp = document.getElementById("IniTemp");
  const OutContador = document.getElementById("OutContador");
  let temporizadorId = null;
  let contador = 20;

  IniTemp.addEventListener("click", () => {
    if (temporizadorId !== null) {
      alert("⚠️ El temporizador ya está en ejecución.");
      return;
    }

    temporizadorId = setInterval(() => {
      contador--;
      OutContador.textContent = contador;
      if (contador <= 0) {
        clearInterval(temporizadorId);
        temporizadorId = null;
        alert("¡Oferta finalizada!");
      }
    }, 1000);
  });

  //RESEÑAS
  const btnEnviarReseña = document.getElementById("btnEnviarReseña");

  btnEnviarReseña.addEventListener("click", function () {
    const pelicula = document.getElementById("Pelicula").value;
    const puntuacion = document.getElementById("Puntuacion").value;
    const opinion = document.getElementById("Opinion").value;

    let horaCreacion = new Date().toLocaleTimeString();
    let localEnvio = new Date().toISOString();

    const reseña = {
      nombreSocio,
      horaCreacion,
      localEnvio,
      pelicula,
      puntuacion,
      opinion,
    };

    let reseñas = [];
    if (localStorage.getItem("reseñas")) {
      reseñas = JSON.parse(localStorage.getItem("reseñas"));
    }
    reseñas.push(reseña);
    localStorage.setItem("reseñas", JSON.stringify(reseñas));
    alert("Reseña enviada correctamente");
  });

  const outReseñas = document.getElementById("outReseñas");
  const reseñas = JSON.parse(localStorage.getItem("reseñas")) || [];

  for (let i = 0; i < reseñas.length; i++) {
    outReseñas.innerHTML += `   
    <div class="item-reseña">
      <div class="reseña-header">
        <span class="reseña-pelicula">🎬 ${reseñas[i].pelicula}</span>
        <span class="reseña-puntuacion">⭐ <code>${reseñas[i].puntuacion}/10</code></span>
      </div>
      <p class="reseña-opinion">"${reseñas[i].opinion}"</p>
      <div class="reseña-footer">
        <span>Socio: <code>${reseñas[i].nombreSocio}</code></span>
        <span>Hora: ${reseñas[i].horaCreacion}</span>
        <span>Origen: <code>${reseñas[i].localEnvio || "Localhost"}</code></span>
      </div>
    </div>
`;
  }
});
