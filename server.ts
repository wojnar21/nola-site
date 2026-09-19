import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

let resendClient: Resend | null = null;
function getResend() {
  if (!resendClient) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      console.warn("RESEND_API_KEY is not set. Email functionality is disabled.");
      return null;
    }
    resendClient = new Resend(key);
  }
  return resendClient;
}


async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API routes FIRST
  app.get("/api/download-zip", (req, res) => {
    const zipPath = path.join(process.cwd(), "public", "nola-torun-app.zip");
    if (fs.existsSync(zipPath)) {
      res.setHeader("Content-Disposition", 'attachment; filename="nola-torun-app.zip"');
      res.setHeader("Content-Type", "application/zip");
      res.sendFile(zipPath);
    } else {
      res.status(404).send("Plik archiwum nie został znaleziony.");
    }
  });

  app.get("/nola-torun-app.zip", (req, res) => {
    const zipPath = path.join(process.cwd(), "public", "nola-torun-app.zip");
    if (fs.existsSync(zipPath)) {
      res.setHeader("Content-Disposition", 'attachment; filename="nola-torun-app.zip"');
      res.setHeader("Content-Type", "application/zip");
      res.sendFile(zipPath);
    } else {
      res.status(404).send("Plik archiwum nie został znaleziony.");
    }
  });

  app.get("/api/menu", (req, res) => {
    try {
      const fullPath = path.join(process.cwd(), "src", "data", "menu.json");
      const data = fs.readFileSync(fullPath, "utf-8");
      res.json(JSON.parse(data));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to read menu" });
    }
  });

  app.post("/api/menu", async (req, res) => {
    try {
      if (process.env.NODE_ENV !== "production") {
        const fullPath = path.join(process.cwd(), "src", "data", "menu.json");
        fs.writeFileSync(fullPath, JSON.stringify(req.body, null, 2), "utf-8");
        res.json({ success: true });
      } else {
        res.status(403).json({ error: "Edycja tylko w środowisku deweloperskim" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to save menu" });
    }
  });

  app.post("/api/reserve", async (req, res) => {
    try {
      const { date, time, people, email, name, origin, lang } = req.body;
      const isEn = lang === 'en';
      const resend = getResend();
      
      if (!resend) {
        // Fallback for demo when no API key is present
        console.log(`[Email Simulation] Would have sent email to wojnar21@gmail.com. Data:`, { date, time, people, email, name, lang });
        return res.json({ success: true, message: "Symulacja wysłania emaila (brak klucza API)." });
      }

      const baseUrl = origin || (req.protocol + '://' + req.get('host'));
      const viewConfirmUrl = `${baseUrl}/api/confirm-view?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}&people=${encodeURIComponent(people)}&lang=${isEn ? 'en' : 'pl'}`;

      // Notification to restaurant (ALWAYS in Polish)
      const ownerSendResult = await resend.emails.send({
        from: 'NOLA Restauracja <onboarding@resend.dev>',
        to: 'wojnar21@gmail.com',
        replyTo: email,
        subject: `Nowa rezerwacja od ${name} - ${date} ${time} - ${people} osób`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #3b0210;">
            <h1 style="color: #571723; border-bottom: 2px solid #571723; padding-bottom: 10px;">Nowa rezerwacja w formularzu na stronie</h1>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Imię i nazwisko:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${name}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Data:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${date}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Godzina:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${time}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Liczba osób:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${people}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>E-mail klienta:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #571723;">${email}</a></td></tr>
            </table>

            <div style="margin-top: 40px; text-align: center; background-color: #e9e0da; padding: 20px; border-radius: 8px;">
              <h2 style="font-size: 18px; margin-top: 0; color: #571723;">Jak skontaktować się z klientem?</h2>
              <p style="margin-bottom: 20px;">
                Aby błyskawicznie potwierdzić przyjęcie rezerwacji, kliknij poniższy przycisk:
              </p>
              
              <div style="margin-top: 15px;">
                <a href="${viewConfirmUrl}" 
                   style="display: inline-block; background-color: #571723; color: #e9e0da; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
                  Wyślij gotowy e-mail z potwierdzeniem
                </a>
              </div>
            </div>
          </div>
        `
      });

      if (ownerSendResult.error) {
        console.error("[Resend API Error]", ownerSendResult.error);
        return res.status(400).json({ success: false, error: ownerSendResult.error.message });
      }

      // To client (in English if requested on English page, in Polish otherwise)
      try {
        if (isEn) {
          await resend.emails.send({
            from: 'NOLA Restauracja <onboarding@resend.dev>',
            to: email,
            subject: 'We have received your reservation request at NOLA',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #3b0210;">
                <h1 style="color: #571723;">Hello, ${name}!</h1>
                <p>We have received your table reservation request at NOLA restaurant.</p>
                
                <div style="background-color: #e9e0da; border-left: 4px solid #571723; padding: 15px; margin: 20px 0; border-radius: 0 4px 4px 0;">
                  <p style="margin: 0; font-weight: bold; color: #571723;">
                    Please note: This message is not yet a booking confirmation.
                  </p>
                  <p style="margin: 10px 0 0 0; color: #571723;">
                    You will receive another message with the final confirmation of your table reservation shortly.
                  </p>
                </div>
                
                <h3 style="color: #571723; margin-top: 30px;">Request details:</h3>
                <ul style="list-style-type: none; padding: 0;">
                  <li style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Reservation name:</strong> ${name}</li>
                  <li style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Date:</strong> ${date}</li>
                  <li style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Time:</strong> ${time}</li>
                  <li style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Number of guests:</strong> ${people}</li>
                </ul>
                <p style="margin-top: 30px; font-size: 14px; color: #666; line-height: 1.6;">See you soon.<br/>NOLA Team<br/>ul. Ducha Św. 3, Toruń<br/>tel. +48 533 985 144</p>
              </div>
            `
          });
        } else {
          await resend.emails.send({
            from: 'NOLA Restauracja <onboarding@resend.dev>',
            to: email,
            subject: 'Otrzymaliśmy Twoją prośbę o rezerwację w NOLA',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #3b0210;">
                <h1 style="color: #571723;">Dzień dobry, ${name}!</h1>
                <p>Otrzymaliśmy Twoje zapytanie o rezerwację stolika w restauracji NOLA.</p>
                
                <div style="background-color: #e9e0da; border-left: 4px solid #571723; padding: 15px; margin: 20px 0; border-radius: 0 4px 4px 0;">
                  <p style="margin: 0; font-weight: bold; color: #571723;">
                    Uwaga: Ta wiadomość nie jest jeszcze potwierdzeniem rezerwacji.
                  </p>
                  <p style="margin: 10px 0 0 0; color: #571723;">
                    Otrzymasz od nas niedługo wiadomość z ostatecznym potwierdzeniem rezerwacji stolika.
                  </p>
                </div>
                
                <h3 style="color: #571723; margin-top: 30px;">Szczegóły zgłoszenia:</h3>
                <ul style="list-style-type: none; padding: 0;">
                  <li style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Rezerwacja na:</strong> ${name}</li>
                  <li style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Data:</strong> ${date}</li>
                  <li style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Godzina:</strong> ${time}</li>
                  <li style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Liczba osób:</strong> ${people}</li>
                </ul>
                <p style="margin-top: 30px; font-size: 14px; color: #666; line-height: 1.6;">Do zobaczenia wkrótce.<br/>Zespół NOLA<br/>ul. Ducha Św. 3, Toruń<br/>tel. +48 533 985 144</p>
              </div>
            `
          });
        }
      } catch (clientEmailErr) {
        console.error("Could not send email directly to the client (domain likely unverified yet):", clientEmailErr);
      }

      res.json({ success: true });
    } catch (error: any) {
      console.error("[Reserve Error]", error);
      res.status(500).json({ error: error?.message || "Failed to send email" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const { subject, message, senderEmail } = req.body;
      const resend = getResend();
      
      if (!resend) {
        console.log(`[Email Simulation] Contact message:`, { subject, message, senderEmail });
        return res.json({ success: true, message: "Symulacja wysłania wiadomości." });
      }

      const sendResult = await resend.emails.send({
        from: 'NOLA Kontakt <onboarding@resend.dev>',
        to: 'wojnar21@gmail.com',
        replyTo: senderEmail || undefined,
        subject: `[Wiadomość z formularza NOLA] ${subject || 'Nowa wiadomość'}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #3b0210;">
            <h1 style="color: #571723; border-bottom: 2px solid #571723; padding-bottom: 10px;">Nowa wiadomość ze strony</h1>
            <p><strong>Temat:</strong> ${subject || 'Brak tematu'}</p>
            ${senderEmail ? `<p><strong>Odpowiedz na adres:</strong> <a href="mailto:${senderEmail}" style="color: #571723;">${senderEmail}</a></p>` : ''}
            <div style="background-color: #e9e0da; padding: 20px; border-radius: 8px; margin-top: 20px; white-space: pre-wrap; font-size: 15px; line-height: 1.6; color: #571723;">
              ${message}
            </div>
          </div>
        `
      });

      if (sendResult.error) {
        console.error("[Resend Contact Error]", sendResult.error);
        return res.status(400).json({ success: false, error: sendResult.error.message });
      }

      res.json({ success: true });
    } catch (error: any) {
      console.error("[Contact Error]", error);
      res.status(500).json({ error: error?.message || "Failed to send message" });
    }
  });

  app.get("/api/confirm-view", (req, res) => {
    const { email, name, date, time, people, lang } = req.query;
    if (!email || !name || !date || !time || !people) {
      return res.status(400).send("Brak wszystkich wymaganych danych.");
    }
    const isEn = lang === 'en';
    
    res.send(`
      <!DOCTYPE html>
      <html lang="pl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Potwierdzenie rezerwacji</title>
        <style>
          body { font-family: sans-serif; background-color: #f9f9f9; padding: 20px; color: #3b0210; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
          .preview { border: 1px solid #eee; padding: 20px; border-radius: 4px; margin-top: 20px; text-align: left; }
          .btn { display: inline-block; background-color: #571723; color: #e9e0da; padding: 15px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 30px; border: none; cursor: pointer; font-size: 16px; transition: opacity 0.3s; }
          .btn:hover { opacity: 0.9; }
          .alert-en { background-color: #e9e0da; color: #571723; padding: 16px 20px; border-radius: 6px; margin: 20px 0; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container" style="text-align: center;">
          <h1 style="color: #571723;">Wysłanie potwierdzenia</h1>
          <p>Potwierdzenie zostanie wysłane do: <strong>${email}</strong></p>
          
          ${isEn ? `
            <div class="alert-en">
              <p style="margin: 0; font-size: 16px; font-weight: bold; color: #571723; line-height: 1.5;">
                Zapytanie zostało wysłane w formie angielskiej, dlatego odpowiedź do klienta zostanie wysłana w języku angielskim.
              </p>
            </div>
          ` : ''}

          <h3 style="margin-top: 30px;">Podgląd wiadomości e-mail:</h3>
          <div class="preview">
            ${isEn ? `
              <div style="font-family: sans-serif; color: #3b0210;">
                <h2 style="color: #571723; border-bottom: 2px solid #571723; padding-bottom: 10px; margin-top: 0;">Table reservation confirmation</h2>
                <p>Hello, <strong>${name}</strong>!</p>
                <p>We are delighted to confirm your table reservation at NOLA restaurant.</p>
                
                <div style="background-color: #e9e0da; border-left: 4px solid #571723; padding: 15px; margin: 20px 0; border-radius: 0 4px 4px 0;">
                  <h3 style="margin-top: 0; color: #571723;">Reservation details:</h3>
                  <ul style="list-style: none; padding: 0; margin: 0; color: #571723;">
                    <li style="padding: 8px 0; border-bottom: 1px solid rgba(87,23,35,0.1);"><strong>Reservation name:</strong> ${name}</li>
                    <li style="padding: 8px 0; border-bottom: 1px solid rgba(87,23,35,0.1);"><strong>Date:</strong> ${date}</li>
                    <li style="padding: 8px 0; border-bottom: 1px solid rgba(87,23,35,0.1);"><strong>Time:</strong> ${time}</li>
                    <li style="padding: 8px 0;"><strong>Number of guests:</strong> ${people}</li>
                  </ul>
                </div>
                
                <p style="margin-top: 30px; font-size: 14px; color: #666; line-height: 1.6;">See you soon.<br/>NOLA Team<br/>ul. Ducha Św. 3, Toruń<br/>tel. +48 533 985 144</p>
              </div>
            ` : `
              <div style="font-family: sans-serif; color: #3b0210;">
                <h2 style="color: #571723; border-bottom: 2px solid #571723; padding-bottom: 10px; margin-top: 0;">Potwierdzenie rezerwacji stolika</h2>
                <p>Dzień dobry, <strong>${name}</strong>!</p>
                <p>Z radością potwierdzamy przyjęcie Twojej rezerwacji w restauracji NOLA.</p>
                
                <div style="background-color: #e9e0da; border-left: 4px solid #571723; padding: 15px; margin: 20px 0; border-radius: 0 4px 4px 0;">
                  <h3 style="margin-top: 0; color: #571723;">Szczegóły rezerwacji:</h3>
                  <ul style="list-style: none; padding: 0; margin: 0; color: #571723;">
                    <li style="padding: 8px 0; border-bottom: 1px solid rgba(87,23,35,0.1);"><strong>Rezerwacja zapisana na:</strong> ${name}</li>
                    <li style="padding: 8px 0; border-bottom: 1px solid rgba(87,23,35,0.1);"><strong>Data:</strong> ${date}</li>
                    <li style="padding: 8px 0; border-bottom: 1px solid rgba(87,23,35,0.1);"><strong>Godzina:</strong> ${time}</li>
                    <li style="padding: 8px 0;"><strong>Liczba osób:</strong> ${people}</li>
                  </ul>
                </div>
                
                <p style="margin-top: 30px; font-size: 14px; color: #666; line-height: 1.6;">Do zobaczenia wkrótce.<br/>Zespół NOLA<br/>ul. Ducha Św. 3, Toruń<br/>tel. +48 533 985 144</p>
              </div>
            `}
          </div>

          <form action="/api/confirm-send" method="POST">
            <input type="hidden" name="email" value="${email}" />
            <input type="hidden" name="name" value="${name}" />
            <input type="hidden" name="date" value="${date}" />
            <input type="hidden" name="time" value="${time}" />
            <input type="hidden" name="people" value="${people}" />
            <input type="hidden" name="lang" value="${isEn ? 'en' : 'pl'}" />
            <button type="submit" class="btn">Wyślij potwierdzenie teraz</button>
          </form>
        </div>
      </body>
      </html>
    `);
  });

  app.post("/api/confirm-send", async (req, res) => {
    const { email, name, date, time, people, lang } = req.body;
    if (!email || !name || !date || !time || !people) {
      return res.status(400).send("Brak wszystkich wymaganych danych.");
    }
    const isEn = lang === 'en';
    
    try {
      const resend = getResend();
      if (!resend) {
        return res.send(`
          <!DOCTYPE html>
          <html lang="pl">
          <head>
            <meta charset="UTF-8">
            <title>Symulacja wysłania</title>
            <style>
              body { font-family: sans-serif; background-color: #f9f9f9; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
              .container { text-align: center; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
              button { background-color: #571723; color: #e9e0da; padding: 12px 24px; border: none; border-radius: 4px; font-weight: bold; font-size: 16px; cursor: pointer; margin-top: 30px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1 style="color: #571723;">Symulacja Wysłania (Brak Klucza API)</h1>
              <p>W produkcyjnym środowisku wiadomość trafiłaby na adres: <strong>${email}</strong>.</p>
              <button onclick="window.location.href='/'">Wróć na stronę główną</button>
            </div>
          </body>
          </html>
        `);
      }

      if (isEn) {
        await resend.emails.send({
          from: 'NOLA Restauracja <onboarding@resend.dev>',
          to: email as string,
          subject: `Table reservation confirmation at NOLA Restaurant - ${date} ${time}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #3b0210; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
              <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #571723; border-bottom: 2px solid #571723; padding-bottom: 10px;">Table reservation confirmation</h1>
                <p>Hello, <strong>${name}</strong>!</p>
                <p>We are delighted to confirm your table reservation at NOLA restaurant.</p>
                
                <div style="background-color: #e9e0da; border-left: 4px solid #571723; padding: 15px; margin: 20px 0; border-radius: 0 4px 4px 0; text-align: left;">
                  <h3 style="margin-top: 0; color: #571723;">Reservation details:</h3>
                  <ul style="list-style: none; padding: 0; margin: 0; color: #571723;">
                    <li style="padding: 8px 0; border-bottom: 1px solid rgba(87,23,35,0.1);"><strong>Reservation name:</strong> ${name}</li>
                    <li style="padding: 8px 0; border-bottom: 1px solid rgba(87,23,35,0.1);"><strong>Date:</strong> ${date}</li>
                    <li style="padding: 8px 0; border-bottom: 1px solid rgba(87,23,35,0.1);"><strong>Time:</strong> ${time}</li>
                    <li style="padding: 8px 0;"><strong>Number of guests:</strong> ${people}</li>
                  </ul>
                </div>
                
                <p style="margin-top: 30px; font-size: 14px; color: #666; line-height: 1.6;">See you soon.<br/>NOLA Team<br/>ul. Ducha Św. 3, Toruń<br/>tel. +48 533 985 144</p>
              </div>
            </div>
          `
        });
      } else {
        await resend.emails.send({
          from: 'NOLA Restauracja <onboarding@resend.dev>',
          to: email as string,
          subject: `Potwierdzenie rezerwacji stolika w restauracji NOLA - ${date} ${time}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #3b0210; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
              <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #571723; border-bottom: 2px solid #571723; padding-bottom: 10px;">Potwierdzenie rezerwacji stolika</h1>
                <p>Dzień dobry, <strong>${name}</strong>!</p>
                <p>Z radością potwierdzamy przyjęcie Twojej rezerwacji w restauracji NOLA.</p>
                
                <div style="background-color: #e9e0da; border-left: 4px solid #571723; padding: 15px; margin: 20px 0; border-radius: 0 4px 4px 0; text-align: left;">
                  <h3 style="margin-top: 0; color: #571723;">Szczegóły rezerwacji:</h3>
                  <ul style="list-style: none; padding: 0; margin: 0; color: #571723;">
                    <li style="padding: 8px 0; border-bottom: 1px solid rgba(87,23,35,0.1);"><strong>Rezerwacja zapisana na:</strong> ${name}</li>
                    <li style="padding: 8px 0; border-bottom: 1px solid rgba(87,23,35,0.1);"><strong>Data:</strong> ${date}</li>
                    <li style="padding: 8px 0; border-bottom: 1px solid rgba(87,23,35,0.1);"><strong>Godzina:</strong> ${time}</li>
                    <li style="padding: 8px 0;"><strong>Liczba osób:</strong> ${people}</li>
                  </ul>
                </div>
                
                <p style="margin-top: 30px; font-size: 14px; color: #666; line-height: 1.6;">Do zobaczenia wkrótce.<br/>Zespół NOLA<br/>ul. Ducha Św. 3, Toruń<br/>tel. +48 533 985 144</p>
              </div>
            </div>
          `
        });
      }

      res.send(`
        <!DOCTYPE html>
        <html lang="pl">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Wysłano potwierdzenie</title>
          <style>
            body { font-family: sans-serif; background-color: #f9f9f9; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .container { text-align: center; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
            button { background-color: #571723; color: #e9e0da; padding: 12px 24px; border: none; border-radius: 4px; font-weight: bold; font-size: 16px; cursor: pointer; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 style="color: #571723;">Sukces!</h1>
            <p>Wiadomość email z potwierdzeniem została wysłana do: <strong>${email}</strong>.</p>
            <button onclick="window.close()">Zamknij tę kartę</button>
          </div>
        </body>
        </html>
      `);
    } catch (error) {
      console.error(error);
      res.status(500).send("Wystąpił błąd podczas wysyłania e-maila.");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
