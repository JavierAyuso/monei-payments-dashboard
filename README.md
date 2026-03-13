# MONEI Payments Dashboard

Dashboard de gestión de pagos desarrollado como prueba técnica para MONEI.

Desarrollado por **Javier Ayuso**, especialista en desarrollo front-end y UX/UI.

## Herramientas utilizadas

### Editor y entorno

- **VSCode** con los siguientes plugins:
  - **Prettier - Code Formatter** — formateo automático consistente en todo el proyecto
  - **Tailwind CSS IntelliSense** — autocompletado de clases y detección de errores
  - **Apollo GraphQL** — validación de queries contra el esquema y autocompletado
  - **Markdown Preview Enhanced** — previsualización del README durante su redacción
  - **Copy4AI** — utilidad para compartir contexto de código con el asistente de IA
- **Git** — control de versiones con commits atómicos y mensajes en formato convencional

### Exploración de la API

- **Postman** — usado para explorar y probar la API GraphQL antes de integrarse en el proyecto. Permitió entender la estructura de las queries `charges`, `charge` y `chargesDateRangeKPI`, los tipos de filtros disponibles y los campos reales devueltos por el entorno de staging antes de escribir una sola línea de código.

### Asistencia con IA

- **Claude (Anthropic)** — asistente LLM utilizado como par de programación durante el desarrollo. Útil para acelerar la escritura de código, explorar alternativas y contrastar decisiones técnicas.

## Tecnologías

- **React 19** + **TypeScript** + **Vite** (SWC)
- **Apollo Client** — gestión de estado y comunicación con la API GraphQL
- **Tailwind CSS** + **shadcn/ui** — estilos y componentes de UI
- **React Router v7** — navegación y gestión de URL params
- **Recharts** — visualización de datos
- **date-fns** — manipulación de fechas

## Requisitos previos

- Node.js 18+
- npm 9+

## Instalación y ejecución

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd monei

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

> El proxy de Vite gestiona automáticamente el CORS con la API de staging. No es necesaria ninguna configuración adicional.

## Variables de entorno

El proyecto incluye un archivo `.env.example` con la estructura necesaria. Para configurarlo:

1. Copia el archivo de ejemplo:

```bash
   cp .env.example .env
```

2. Abre `.env` y añade tu API key de MONEI:

```
   VITE_API_KEY=tu_api_key_aqui
```

> En un proyecto real las credenciales nunca se incluirían en el repositorio. El archivo `.env` está incluido en `.gitignore`.

## Estructura del proyecto

```
src/
├── components/
│   ├── dashboard/     # Componentes específicos del dashboard (KPIs, gráficos)
│   ├── ui/            # Componentes base de shadcn/ui
│   ├── DateRangePicker.tsx
│   └── Sidebar.tsx
├── graphql/           # Queries de Apollo
├── hooks/             # Lógica de negocio y acceso a datos
├── lib/
│   ├── apollo.ts      # Configuración del cliente Apollo
│   ├── charge.ts      # Helpers de estado de pagos
│   ├── constants.ts   # Constantes globales
│   ├── i18n.ts        # Literales de la interfaz
│   └── utils.ts       # Utilidades generales
├── pages/             # Dashboard, Payments, PaymentDetail
└── types/             # Tipos TypeScript
```

## Decisiones de diseño

### Arquitectura

- **Separación de responsabilidades**: la lógica de acceso a datos vive en hooks (`useCharges`, `useChargesKPI`, `useCharge`), los componentes son puramente presentacionales.
- **URL como fuente de verdad para la paginación**: el número de página se gestiona con `useSearchParams` en lugar de estado local. Esto permite compartir enlaces con paginación y preservar la posición al navegar hacia atrás desde el detalle de un pago.
- **i18n centralizado**: todos los literales de la interfaz están en `src/lib/i18n.ts`. No se utilizó ninguna librería externa de internacionalización porque el proyecto es monoidioma, pero la estructura permite escalarlo fácilmente.

### UI y UX

- **Modo oscuro por defecto**: el sector fintech trabaja frecuentemente en entornos con mucha pantalla. El tema oscuro reduce la fatiga visual y se inicializa antes del primer render para evitar flash.
- **Layout de dos columnas independientes** en Dashboard y PaymentDetail: cada columna crece según su contenido sin afectar a la otra, evitando alturas forzadas o espacios vacíos.
- **Queries GraphQL ajustadas**: cada query solo solicita los campos que realmente se muestran en la interfaz, reduciendo el payload de red.
- **Sin animaciones de transición**: se valoró añadir fade entre rutas con `framer-motion` pero se descartó conscientemente. En un producto fintech la claridad y la velocidad de respuesta tienen más peso que los efectos visuales.
- **Empty states contextuales**: los estados vacíos distinguen entre "no hay datos en este período", "no hay datos con este filtro" y "no hay datos en absoluto", ofreciendo siempre una acción para resolverlo.

### Paginación

La paginación se corrige automáticamente si la URL contiene un número de página inválido o superior al total de páginas disponibles, usando un `useEffect` que redirige con `replace: true` para no contaminar el historial.

## Trade-offs

- **Proxy de Vite para CORS**: la configuración del proxy solo funciona en desarrollo. Para producción sería necesario configurar CORS en el servidor o usar un proxy dedicado. Se documentó como limitación conocida en lugar de implementar una solución provisional.
- **Sin tests**: por restricciones de tiempo no se implementaron tests unitarios ni de integración. Los candidatos más prioritarios serían `useCharges` (lógica de paginación y filtros), `formatCurrency` y los helpers de `charge.ts`.
- **Caché de Apollo sin configuración avanzada**: se usa `InMemoryCache` con su configuración por defecto. En producción sería conveniente configurar políticas de caché por tipo para evitar refetches innecesarios.
- **Algunos charges no devuelven detalle**: varios registros de la lista de pagos devuelven "Charge not found" al consultar su detalle individualmente. Es un problema de consistencia de datos en el entorno de staging, no un bug de la aplicación.
- **Moneda única**: la API devuelve siempre EUR en los datos de staging. El código de divisa se propaga correctamente desde la API pero no se ha podido verificar el comportamiento con múltiples divisas.
