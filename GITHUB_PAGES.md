# Configuración de GitHub Pages

## 📝 Pasos para activar GitHub Pages

1. **Ir a la configuración del repositorio**
   - Abre https://github.com/ycozco/malla_interactiva
   - Haz click en "Settings" (Configuración)

2. **Activar GitHub Pages**
   - En el menú lateral izquierdo, busca "Pages"
   - En "Source" (Fuente), selecciona:
     - Branch: `main`
     - Folder: `/ (root)`
   - Haz click en "Save" (Guardar)

3. **Esperar el despliegue**
   - GitHub Pages tardará unos minutos en compilar
   - Verás un mensaje verde cuando esté listo
   - La URL será: **https://ycozco.github.io/malla_interactiva/**

## 🚀 URL de la Aplicación

Una vez configurado, tu malla curricular interactiva estará disponible en:

**https://ycozco.github.io/malla_interactiva/**

## ✅ Verificación

Para verificar que todo funciona:
1. Espera 2-3 minutos después de activar GitHub Pages
2. Visita la URL: https://ycozco.github.io/malla_interactiva/
3. Deberías ver la aplicación funcionando completamente

## 🔄 Actualizaciones Futuras

Para actualizar la aplicación en el futuro:

```bash
# 1. Hacer cambios en los archivos
# 2. Agregar los cambios
git add .

# 3. Hacer commit
git commit -m "Descripción de los cambios"

# 4. Subir a GitHub
git push origin main
```

GitHub Pages se actualizará automáticamente en 1-2 minutos.

## 📂 Estructura del Proyecto

```
malla_interactiva/
├── index.html          # Página principal (punto de entrada)
├── style.css           # Estilos de la aplicación
├── app.js              # Lógica de la aplicación
├── data.js             # Datos de la malla curricular
├── README.md           # Documentación del proyecto
├── .gitignore          # Archivos ignorados por Git
└── GITHUB_PAGES.md     # Este archivo
```

## 🎯 Características de GitHub Pages

- ✅ Hosting gratuito
- ✅ HTTPS automático
- ✅ Actualización automática con cada push
- ✅ Compatible con HTML, CSS y JavaScript
- ✅ Sin necesidad de servidor backend

## 🔧 Solución de Problemas

### La página no carga
- Verifica que GitHub Pages esté activado en Settings > Pages
- Asegúrate de que el archivo `index.html` esté en la raíz del repositorio
- Espera 2-3 minutos después de hacer push

### Los estilos no se aplican
- Verifica que `style.css` esté en la misma carpeta que `index.html`
- Revisa la consola del navegador (F12) para ver errores

### El JavaScript no funciona
- Verifica que `app.js` y `data.js` estén en la raíz
- Revisa la consola del navegador para ver errores

## 📱 Compartir la Aplicación

Una vez desplegada, puedes compartir la URL con cualquier persona:
- No necesitan tener GitHub
- No necesitan descargar nada
- Funciona en cualquier navegador moderno
- Compatible con móviles y tablets

---

**¡Tu malla curricular interactiva estará disponible públicamente en minutos!** 🎉
