<?php
//Configuracion del Entorno
declare(strict_types=1);

date_default_timezone_set('Europe/Madrid');

//Validación de la petición

$presupuesto = $_GET['presupuesto'];
$solicitud = filter_var($presupuesto, FILTER_VALIDATE_INT);
if ($solicitud === false || $solicitud <= 0) {
    http_response_code(400);
    exit("Presupuesto no válido.");
}

echo "Presupuesto: " . $solicitud . "<br>";

//Tratamiento de Usuario

$usuario = $_GET["u"] ?? "Cliente Anonimo";
echo "Usuario: " . mb_strtoupper(htmlspecialchars($usuario)) . "<br>";

//Tipos de servicio mediante enumeraciones

enum TipoReparacion: string
{
    case Pantalla = "Pantalla";
    case Bateria = "Batería";
    case PlacaBase = "Placa base";
    case Camara = "Cámara";
    case PuertoCarga = "Puerto de carga";

    public function DescripcionServicio(): string
    {
        return match ($this) {
            self::Pantalla => "Reemplazo de módulo de pantalla táctil y panel LCD/OLED.",
            self::Bateria => "Sustitución de celda de batería degradada y calibración de ciclos.",
            self::PlacaBase => "Micro-soldadura, diagnóstico de circuitos y reparación de componentes lógicos.",
            self::Camara => "Cambio de sensor óptico y validación de enfoque automático.",
            self::PuertoCarga => "Limpieza o reemplazo del flex/conector de carga USB/Lightning."
        };
    }
}
;


?>