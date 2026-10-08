# Chroma Nine

Un tono, cinco atmósferas. Selector de color inspirado en un plano HSV/HSB dividido en nueve cuadrantes y cinco zonas: **Pastel, Fresh, Neon, Darken y Somber**.

## Uso local

Requiere Node.js 18 o superior. Sin dependencias ni instalación:

```sh
npm start
```

Abre http://localhost:4173. Para verificar las conversiones y zonas: `npm test`.

Elige el tono, haz clic o arrastra en el campo, o introduce un código HEX (3 o 6 dígitos). Los controles de saturación y brillo permiten usar teclado. Selecciona una tarjeta para ajustar su muestra dentro de la zona, y copia un color o la paleta completa. El tono seleccionado se recuerda localmente; la paleta vuelve a sus muestras centrales al recargar.

El botón de la cabecera alterna entre tema claro y oscuro para comparar el mismo color sobre ambos fondos. La preferencia se guarda en este navegador.

## Modelo

HSV y HSB son nombres para el mismo modelo aquí: H = tono, S = saturación, V/B = brillo. Saturación aumenta hacia la derecha; brillo hacia arriba. Las zonas aproximan las proporciones de la referencia visual, no una teoría universal de armonía ni un estándar colorimétrico.

| Zona | Saturación | Brillo |
|---|---|---|
| Pastel | 34–100% | 67–100% |
| Fresh | 56–100% | 56–67% |
| Neon | 67–100% | 44–56% |
| Darken | 56–100% | 33–44% |
| Somber | 34–100% | 0–33% |

En los límites compartidos se muestra la primera zona. Las etiquetas describen regiones de la referencia: no todos sus puntos tendrán el aspecto comúnmente asociado a su nombre. Neon no significa fluorescencia física. La conversión usa RGB sRGB, sin gestión de perfiles de impresión.

## Publicar

Es un sitio estático: publica `index.html`, `style.css`, `app.js` y `color.js` en GitHub Pages o cualquier hosting estático. No necesita backend. Las tipografías se cargan desde Google Fonts; sin conexión se usan fuentes locales de respaldo. No incluye analytics ni cuentas.

## Licencia

MIT. Implementación original a partir de una referencia conceptual; no redistribuye las capturas originales.
