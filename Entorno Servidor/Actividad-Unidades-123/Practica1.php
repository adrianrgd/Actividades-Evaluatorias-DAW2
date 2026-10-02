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

$usuario = $_GET["u"] ?? "Cliente Anonimo";

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

// Funcion Costes e Impuestos
function calcularPresupuestoTotal(float $manoDeObra, float $recambios, float $iva = 0.21): float
{
    $subtotal = $manoDeObra + $recambios;
    $totalConIva = $subtotal * (1 + $iva);

    return round($totalConIva, 2);
}

$totalPresupuesto = calcularPresupuestoTotal(
    recambios: 45.50,
    manoDeObra: 30.00
);



?>

<body style="background: #f8fafc;">
    <div
        style="background: white; padding: 20px; margin-bottom: 10px; border-radius: 8px; max-width: 600px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-family: system-ui, sans-serif;">
        <p><strong>Nombre:</strong> <?php echo mb_strtoupper(htmlspecialchars($usuario)); ?></p>
        <p><strong>Presupuesto:</strong> <?php echo $solicitud; ?>€</p>
        <p><strong>Total:</strong> <?php echo $totalPresupuesto; ?> €</p>
    </div>
</body>