Mi Comida Favorita
==================
Aplicación movil que permite a los usuarios registrar su nombre y comida favorita.

# Instalación
Descarga o clona el proyecto, una vez descargado ve a la carpeta MiComidaFavorita ejecuta el siguiente comando:

```
npm install
```

Luego abre el archivo .env y de la consola de Firebase copia los valores para las siguientes variables

```
EXPO_PUBLIC_API_KEY=
EXPO_PUBLIC_AUTH_DOMAIN=
EXPO_PUBLIC_PROJECT_ID=
EXPO_PUBLIC_STORAGE_BUCKET=
EXPO_PUBLIC_MESSAGING_SENDER_ID=
EXPO_PUBLIC_APP_ID=
EXPO_PUBLIC_MEASUREMENT_ID=
```
Una vez asignados los valores ejecuta el proyecto

```
npm start
```

# Validaciones
La aplicación cuenta con validaciones estándar para el email y la contraseña.

<div style="display:inline-flex;">
  <img src="/screenshots/login_validation.png" width="250"/>
  <img src="/screenshots/register_validation_1.png" width="250"/>
  <img src="/screenshots/register_validation_2.png" width="250"/> 
</div>

Las validaciones son disparadas por dos eventos, cuando el usuario trata de subir un formulario vacio o cuando se edita un campo.

# Indicadores de Procesado
Como mejora adicional se agregaron indicadores de procesado los cuales desactivan los botones para evitar peticiones multiples por parte del usuario.

<div style="display:inline-flex;">
  <img src="/screenshots/login_processing.png" width="250"/>
  <img src="/screenshots/home_processing.png" width="250"/>
</div>

Finalmente se mejoraró la importación de librerias respecto a la aplicación inicial ya que React Native Elements fue deprecado hace 2 años
y el proyecto cambio de sitio [React Native Elements](https://reactnativeelements.com/docs)

Tambien se uso un enfoque moderno para el uso del navigation object ya que la forma anterio de paso por propiedades fue deprecado.
