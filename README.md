# Floogic MCP Server

Este es un servidor MCP (Model Context Protocol) que proporciona herramientas para la integración con Google Calendar.

## Características

- Integración con Google Calendar para crear eventos
- Implementación como servidor MCP estándar
- Soporte completo del protocolo MCP

## Requisitos Previos

- Node.js 18 o superior
- Credenciales de Google Calendar Service Account

## Configuración

1. Instalar dependencias:

```bash
yarn install
```

2. Construir el proyecto:

```bash
yarn build
```

3. Configurar el servidor MCP en tu archivo `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "createGoogleCalendarEvent": {
      "command": "node",
      "args": ["RUTA_AL_PROYECTO/build/index.js"],
      "env": {
        "GOOGLE_CALENDAR_PRIVATE_KEY": "TU_CLAVE_PRIVADA",
        "GOOGLE_CALENDAR_CLIENT_EMAIL": "TU_EMAIL_SERVICE_ACCOUNT"
      }
    }
  }
}
```

## Uso

El servidor MCP expone las siguientes herramientas:

### createGoogleCalendarEvent

Crea un evento en Google Calendar con los siguientes parámetros:

- `start`: Fecha y hora de inicio (ISO 8601)
- `end`: Fecha y hora de fin (ISO 8601)
- `cliente`: Nombre del cliente
- `email`: Email del cliente
- `contexto`: Contexto adicional para la cita

## Estructura del Proyecto

```
├── src/
│   ├── index.ts           # Punto de entrada del servidor MCP
│   └── tools/
│       └── google-calendar.ts  # Implementación de la herramienta de calendario
├── package.json
└── tsconfig.json
```

## Seguridad

Las credenciales se configuran a través de variables de entorno en la configuración del servidor MCP. Esto permite:

- Mantener las credenciales seguras en la configuración local
- Fácil rotación de credenciales
- Separación clara entre código y configuración
