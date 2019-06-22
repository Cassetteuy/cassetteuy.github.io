// Verificar si hay un hash en la locación
if (window.location.hash.slice(1).length <= 0)
{
	// No hay referencia a una sección. Ponerle
	window.location = '#home';
}