import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client lazily or when handling request
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// AI Agent Assistant endpoint
app.post('/api/ai-agent', async (req, res) => {
  try {
    const { prompt, context, language = 'so', userRole = 'general' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const ai = getGeminiClient();

    const systemInstruction = `
You are the official AI Assistant (Caawiyaha AI) for Global Management School (GMS) OS, a premier international multi-campus academy with campuses in Mogadishu, Hargeisa, and Nairobi.
Your role is to assist students, parents, teachers, accountants, and school leaders with clear, friendly, highly informative, and concise answers.

Primary Guidelines:
1. Respond primarily in Somali (Af-Soomaali) if the user asks in Somali or if language is 'so'. Use clean, polite Somali suitable for educational institutions. If asked in English, Arabic, or French, respond in that language.
2. Provide direct, helpful answers regarding:
   - Student academic records, grades, exam schedules, and report cards.
   - School fee structure, payment methods (EVC Plus, Zaad, Cash, Bank Transfer), and invoice status.
   - Attendance rules, timetable periods, subject requirements, and homework assignments.
   - School events, sports, cultural activities, and media gallery.
   - Admissions requirements for prospective students and parents.
3. Be encouraging, polite, and educational. Format answers clearly with bullet points where helpful.

Context provided from active user session:
${JSON.stringify(context || {})}
`;

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        if (response.text) {
          return res.json({ answer: response.text });
        }
      } catch (geminiErr: any) {
        console.warn('Gemini API call failed, providing context fallback:', geminiErr.message);
      }
    }

    // Contextual intelligent fallback if API key is unconfigured or call fails
    const lowerPrompt = prompt.toLowerCase();
    let fallbackAnswer = "";

    if (lowerPrompt.includes("fee") || lowerPrompt.includes("lacag") || lowerPrompt.includes("fiad") || lowerPrompt.includes("bixin")) {
      fallbackAnswer = "Waxaad lacagaha dugsiga (fees) kaga bixin kartaa iyadoo loo marayo:\n• **Mobile Money**: EVC Plus ama Zaad Service (Tixraac: INV-2026)\n• **Bank Transfer**: Dahabshiil ama Premier Bank\n• **Kaash**: Xafiiska Maaliyadda ee Xarunta Hodan/Hargeisa.\n\nFadlan booqo tab-ka **Fiada & Lacagaha** ama waalidka portal-kiisa si aad u aragto qaansheegtaada rasmiga ah.";
    } else if (lowerPrompt.includes("imtixaan") || lowerPrompt.includes("exam") || lowerPrompt.includes("grade") || lowerPrompt.includes("buundo")) {
      fallbackAnswer = "Imtixaannada Midterm-ka ee Term 2 waxay bilaabanayaan **15-ka Ogosto 2026**. Buundooyinka iyo natiijooyinka waxaa laga helayaa tab-ka **Imtixaannada & Buundooyinka** iyo sidoo kale Portal-ka Ardayda iyo Waalidiinta.";
    } else if (lowerPrompt.includes("jadwal") || lowerPrompt.includes("timetable") || lowerPrompt.includes("xiasad")) {
      fallbackAnswer = "Jadwalka xiisadaha dugsigu wuxuu bilaabmaa **08:00 Subaxnimo** ilaa **01:30 Duhurnimo**. Fasal kasta wuxuu leeyahay jadwal u gaar ah oo aad ka eegi karto tab-ka **Jadwalka Xiisadaha**.";
    } else if (lowerPrompt.includes("login") || lowerPrompt.includes("password") || lowerPrompt.includes("username") || lowerPrompt.includes("passwrofd")) {
      fallbackAnswer = "Mid kasta oo ka mid ah ardayda iyo waalidiinta waxaa la siiyay **Username** iyo **Password** u gaar ah! Waxaad ka soo gali kartaa badhanka **Gal Portal-ka (Arday / Waalid)** ee ku yaala sare ama eeg Tusmada Loginnada.";
    } else {
      fallbackAnswer = `Soo dhawoow! Anigu waxaan ahay AI Assistant ee Dugsiga Global Management School.

Waxaan kugu caawin karaa:
1. **Natiijooyinka & Imtixaannada**: Ogaanshada buundooyinka iyo jadwalka imtixaannada.
2. **Kharashka Waxbarashada (Fees)**: Ogaanshada qaansheegyada iyo hababka bixinta.
3. **Loginnada Ardayda & Waalidiinta**: Sida loo isticmaalo Username-ka iyo Password-ka u gaarka ah.
4. **Warbixinta Fasalka & Xaadirinta**: Ogaanshada imaanshaha iyo maqnaanshaha ardayga.

Fadlan ii sheeg su'aasha aad qabtid ama waxa aad rabtid inaan kugu caawiyo!`;
    }

    return res.json({ answer: fallbackAnswer });

  } catch (err: any) {
    console.error('AI Agent Error:', err);
    return res.status(500).json({ error: 'Failed to generate AI response' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
