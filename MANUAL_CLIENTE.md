# Manual de Usuario - Javiera Valdivieso Nutrición

## 📋 Acceso al Sitio Web

**URL pública:** https://javieravaldivieso.cl

---

## 🔐 Panel de Administración

### Cómo acceder

1. Ve a: **https://javieravaldivieso.cl/admin**
2. Ingresa la contraseña: `javiera2026`
3. Click en **Ingresar**

### Qué puedes hacer en el Admin

| Sección | Qué editar |
|---------|-----------|
| **Dashboard** | Ver resumen de contenido |
| **Servicios** | Crear, editar, eliminar planes de precios |
| **Artículos** | Crear, editar, eliminar posts del blog |
| **Testimonios** | Crear, editar, eliminar testimonios de pacientes |
| **Configuración** | Editar datos de contacto, redes sociales, links de pago/reservas |

---

## ✏️ Cómo editar un servicio

1. Ve a **Servicios** en el menú lateral
2. Click en el ícono de lápiz ✏️ del servicio que quieres editar
3. Modifica los campos:
   - **Nombre**: Título del plan
   - **Precio**: Valor actual
   - **Precio original**: Valor tachado (opcional)
   - **Duración**: Ej: "60 minutos", "1 Mes"
   - **Categoría**: Consulta / Pack / Programa
   - **Descripción corta**: Resumen del servicio
   - **Beneficios**: Separados por `|` (pipe)
   - **Link de pago**: URL de MercadoPago/Flow/WebPay
   - **Link de calendario**: URL de Calendly
   - **Más recomendado**: Check para destacar el plan
4. Click en **Guardar**

---

## 📝 Cómo crear un artículo de blog

1. Ve a **Artículos**
2. Click en **Nuevo Artículo**
3. Completa:
   - **Slug**: URL amigable (ej: `nutricion-hormonal`)
   - **Título**: Título del post
   - **Categoría**: Ej: "Nutrición", "Hábitos"
   - **Tiempo de lectura**: Ej: "5 min"
   - **URL de imagen**: Link de la imagen destacada
   - **Extracto**: Resumen corto
   - **Contenido**: Texto completo (acepta HTML básico)
4. Click en **Guardar**

---

## ⚙️ Configuración General

En **Configuración** puedes editar:

| Campo | Para qué sirve |
|-------|---------------|
| Nombre del sitio | Título que aparece en Google |
| Descripción | Meta descripción SEO |
| Email | Correo de contacto público |
| Teléfono | Teléfono fijo |
| WhatsApp | Número para el botón flotante |
| Instagram Handle | @usuario |
| URL Instagram | Link al perfil |
| Seguidores Instagram | Cantidad mostrada |
| **Link de reservas (Calendly)** | URL para agendar citas |
| **Link de pagos** | URL general de pagos |

---

## 💳 Cómo crear cuenta en MercadoPago (para recibir pagos)

### Paso 1: Registro

1. Ve a https://www.mercadopago.cl
2. Click en **Crear cuenta**
3. Selecciona **Vendedor** / **Empresa**
4. Completa tus datos personales y de tu negocio
5. Verifica tu identidad con RUT y documento

### Paso 2: Configurar medio de pago

1. Ingresa a tu cuenta
2. Ve a **Tu negocio** → **Configuración**
3. En **Medios de pago**, activa:
   - WebPay (tarjetas de crédito/débito)
   - Transferencia bancaria
   - MercadoPago Wallet

### Paso 3: Crear link de pago

1. Ve a **Tu negocio** → **Herramientas de venta** → **Links de pago**
2. Click en **Crear link**
3. Completa:
   - Nombre del producto: Ej: "Consulta Nutricional"
   - Precio: Ej: $45.000
   - Descripción: Detalle del servicio
4. Click en **Crear**
5. Copia el link generado

### Paso 4: Agregar link al sitio

1. Ve al **Admin** → **Servicios**
2. Edita el servicio correspondiente
3. Pega el link en el campo **Link de pago**
4. Guarda

---

## 📅 Cómo crear cuenta en Calendly (para reservas)

### Paso 1: Registro

1. Ve a https://calendly.com
2. Click en **Sign Up Free**
3. Regístrate con tu email o cuenta de Google
4. Completa tu perfil (nombre, zona horaria)

### Paso 2: Configurar disponibilidad

1. Ve a **Availability** → **Set your availability**
2. Selecciona tus días y horarios de atención
3. Configura duración de las reuniones (ej: 60 min)
4. Guarda

### Paso 3: Crear evento de tipo "Consulta"

1. Ve a **Event Types** → **New Event Type**
2. Selecciona **One-on-One**
3. Configura:
   - Nombre: "Consulta Nutricional"
   - Duración: 60 minutos
   - Descripción: Detalles para el paciente
   - Ubicación: "Videollamada por Zoom/Google Meet"
4. En **Scheduling Settings**:
   - Buffer time: 15 min entre consultas
   - Advance notice: 24 horas
   - Daily limit: 5 consultas
5. Guarda

### Paso 4: Obtener el link

1. En tu dashboard de Calendly, encuentra el evento creado
2. Click en **Copy link**
3. El link se ve así: `https://calendly.com/tu-usuario/consulta-nutricional`

### Paso 5: Agregar link al sitio

1. Ve al **Admin** → **Servicios**
2. Edita el servicio correspondiente
3. Pega el link en el campo **Link de calendario**
4. Guarda

---

## 🔄 Deploy automático

Cada vez que hagas cambios:

1. Los cambios se guardan automáticamente en la base de datos
2. El sitio se actualiza **instantáneamente**
3. **No necesitas hacer nada más**

---

## ❓ Soporte

Si tienes problemas o dudas:

- **Desarrollador**: Emmagination (https://www.emmagination.cl)
- **Email**: contacto@emmagination.cl

---

*Última actualización: Mayo 2026*
