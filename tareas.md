# Tareas del Proyecto

## Pendientes
1. **Agregar URLs de imágenes a cada producto**
   - Incluir las URLs en los datos extraídos para completar la información del producto.

2. **Corregir problema con productos de Imperial**
   - **Resolver el problema de los valores incorrectos en el scraping de productos de Imperial.**
    - **!!Solucionado!!**

3. **Explorar otro método de scraping para Sodimac**
   - Investigar y probar enfoques alternativos para realizar scraping a Sodimac.

4. **Agregar columna "vendedor"**
   - En la tabla de productos:
     - Si el producto proviene de una tienda, mostrar el nombre de la tienda.
     - Si el producto proviene de un vendedor independiente, mostrar el nombre del vendedor.

5. **Cargar productos mediante `INSERT`**
   - Implementar la carga masiva de productos utilizando sentencias `INSERT` en la base de datos.

6. **Crear tabla para historial de precios**
   - Diseñar una tabla que registre los cambios en los precios de los productos para realizar un seguimiento histórico.

7. **API para actualizar productos**
   - Desarrollar una API para actualizar la información de un producto en la base de datos.
   - Implementar un trigger en la base de datos que:
     - Registre los cambios en la tabla de historial cuando se actualice un producto.

---


## Próximos Pasos
1. Finalizar la corrección de scraping de Imperial.
2. Implementar el registro de historial de precios.
3. Probar la API y validar que los triggers funcionen correctamente.

