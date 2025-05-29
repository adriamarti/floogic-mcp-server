import { google } from 'googleapis';

declare const GOOGLE_CALENDAR_PRIVATE_KEY: string;
declare const GOOGLE_CALENDAR_CLIENT_EMAIL: string;

const auth = new google.auth.JWT({
  email: GOOGLE_CALENDAR_CLIENT_EMAIL,
  key: GOOGLE_CALENDAR_PRIVATE_KEY.replace(/\\n/g, '\n').replace(/["']/g, ''),
  scopes: ['https://www.googleapis.com/auth/calendar']
});

const calendar = google.calendar({ version: 'v3', auth });

const createGoogleCalendarEvent = async (args: { start: string; end: string; cliente: string; email: string; contexto: string }) => {
  try {
    await calendar.events.insert({
      calendarId: 'floogic@gmail.com',
      requestBody: {
        summary: `📞 Cita con ${args.cliente}`,
        description: `Email del cliente: ${args.email}\n\n${args.contexto || 'Sin detalles adicionales'}`,
        start: { dateTime: args.start, timeZone: 'Europe/Madrid' },
        end: { dateTime: args.end, timeZone: 'Europe/Madrid' }
      },
      conferenceDataVersion: 1
    });

    return {
      content: [{ type: "text" as const, text: `Cita creada con ${args.cliente}` }]
    }
  } catch (error: any) {
    return {
      content: [{ type: "text" as const, text: `Error al crear la cita: ${error.message || error}` }],
      isError: true
    }
  }
}

export { createGoogleCalendarEvent };