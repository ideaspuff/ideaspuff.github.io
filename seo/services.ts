/**
 * Service landing pages (Spanish). Single source of truth for:
 *  - the static HTML pages under /servicios/
 *  - llms.txt / llms-full.txt
 *  - sitemap.xml entries
 * Keep copy short, plain and factual: no invented numbers, clients or prices.
 */

export interface FAQ {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  name: string; // H1 + breadcrumb
  short: string; // one-liner for cards, llms.txt
  title: string; // <title>
  description: string; // meta description (~155 chars)
  intro: string;
  forWho: string[];
  includes: string[];
  stack: string[];
  faqs: FAQ[];
}

export const services: Service[] = [
  {
    slug: 'agentes-de-ia',
    name: 'Agentes de IA de voz y chat',
    short: 'Agentes que contestan llamadas, responden por WhatsApp y dan seguimiento a tus clientes 24/7.',
    title: 'Agentes de IA de voz y chat para empresas | Manuel Castellanos',
    description:
      'Agentes de IA que contestan llamadas, responden por WhatsApp y dan seguimiento a tus clientes 24/7. Diseño, integración con tu CRM y puesta en producción.',
    intro:
      'Un agente de IA atiende a tus clientes por teléfono, WhatsApp o chat como lo haría tu mejor ejecutivo: responde dudas, agenda citas, califica prospectos y pasa el caso a una persona cuando hace falta.',
    forWho: [
      'Empresas que reciben muchas llamadas o mensajes con las mismas preguntas.',
      'Equipos de ventas que pierden prospectos por no contestar a tiempo.',
      'Negocios que quieren atender fuera de horario sin contratar otro turno.',
    ],
    includes: [
      'Agentes telefónicos con voz natural',
      'Chatbots para WhatsApp y para tu sitio web',
      'Conexión con tu CRM, agenda o ERP',
      'Guion y tono adaptados a tu marca',
      'Transferencia a una persona cuando el caso lo pide',
      'Registro de conversaciones y resultados',
    ],
    stack: ['ElevenLabs', 'Gemini', 'GPT-4o', 'LangChain', 'Node.js'],
    faqs: [
      {
        q: '¿Qué puede hacer un agente de IA de voz?',
        a: 'Contestar llamadas, hacer llamadas de seguimiento, resolver preguntas frecuentes, agendar citas y guardar la información en tus sistemas. Si la conversación se complica, la transfiere a una persona.',
      },
      {
        q: '¿Suena como robot?',
        a: 'No necesariamente. Uso voces neuronales que suenan naturales y se ajustan al tono de tu marca. Con autorización, también se puede clonar una voz.',
      },
      {
        q: '¿Funciona en WhatsApp?',
        a: 'Sí. El mismo agente puede atender por teléfono, por WhatsApp y en el chat de tu sitio, con la misma información.',
      },
      {
        q: '¿Se conecta con lo que ya uso?',
        a: 'Sí. Se integra por API con CRMs, agendas, ERPs y plataformas de pago para consultar y registrar datos en tiempo real.',
      },
    ],
  },
  {
    slug: 'automatizacion-con-ia',
    name: 'Automatización de procesos con IA',
    short: 'Flujos que hacen solos el trabajo repetitivo: captura de datos, seguimiento, reportes e integraciones.',
    title: 'Automatización de procesos con IA | Manuel Castellanos',
    description:
      'Automatizo tareas repetitivas con IA: captura de datos, seguimiento a clientes, reportes e integraciones entre tus sistemas. Menos trabajo manual, menos errores.',
    intro:
      'Si tu equipo copia datos de un sistema a otro, arma reportes a mano o persigue clientes por correo, eso se puede automatizar. Diseño flujos con IA que hacen ese trabajo solos y te avisan cuando algo necesita atención.',
    forWho: [
      'Equipos que pierden horas en captura de datos y tareas repetitivas.',
      'Empresas con información repartida entre varios sistemas que no se hablan.',
      'Áreas que dependen de reportes manuales para tomar decisiones.',
    ],
    includes: [
      'Seguimiento automático a prospectos y clientes',
      'Extracción de datos de correos, documentos y PDFs',
      'Reportes y dashboards que se actualizan solos',
      'Integraciones entre ERP, CRM, pagos y hojas de cálculo',
      'APIs y webhooks a la medida',
      'Alertas cuando algo sale de lo normal',
    ],
    stack: ['Python', 'Node.js', 'LangChain', 'Gemini', 'GPT-4o', 'REST', 'Webhooks'],
    faqs: [
      {
        q: '¿Qué procesos se pueden automatizar?',
        a: 'Casi cualquier tarea repetitiva con reglas claras: capturar datos, mover información entre sistemas, enviar recordatorios, generar reportes o clasificar correos y documentos.',
      },
      {
        q: '¿Tengo que cambiar mis sistemas actuales?',
        a: 'Normalmente no. La automatización se conecta a lo que ya usas (ERP, CRM, correo, hojas de cálculo) por medio de APIs.',
      },
      {
        q: '¿Qué aporta la IA frente a una automatización normal?',
        a: 'La IA entiende texto libre: puede leer un correo, un PDF o un mensaje de WhatsApp, sacar los datos importantes y decidir qué hacer con ellos.',
      },
      {
        q: '¿Por dónde conviene empezar?',
        a: 'Por el proceso que más horas consume a tu equipo. Suele ser el que da resultados más rápido.',
      },
    ],
  },
  {
    slug: 'arquitectura-cloud',
    name: 'Arquitectura cloud y DevOps',
    short: 'Infraestructura en Google Cloud, Azure y Cloudflare que escala con tu demanda.',
    title: 'Arquitectura cloud: GCP, Azure y Cloudflare | Manuel Castellanos',
    description:
      'Diseño infraestructura en Google Cloud, Azure y Cloudflare que crece con tu demanda: serverless, edge, bases de datos, CI/CD e infraestructura como código.',
    intro:
      'Una buena arquitectura cloud hace que tu sistema aguante picos de uso, cueste solo lo que usas y se actualice sin caídas. Diseño la infraestructura pensando en eso desde el inicio.',
    forWho: [
      'Productos digitales que empiezan a crecer y necesitan escalar.',
      'Empresas que pagan de más por servidores que casi no usan.',
      'Equipos que quieren despliegues automáticos y sin sustos.',
    ],
    includes: [
      'Diseño de arquitectura en GCP, Azure y Cloudflare',
      'Serverless y edge computing',
      'Arquitecturas que no te amarran a un solo proveedor',
      'Bases de datos: PostgreSQL, Supabase y Firebase',
      'CI/CD e infraestructura como código',
      'Autenticación y cifrado desde el diseño',
    ],
    stack: ['Google Cloud', 'Azure', 'Cloudflare', 'Docker', 'Kubernetes', 'Terraform', 'PostgreSQL'],
    faqs: [
      {
        q: '¿Qué nube me conviene: Google Cloud, Azure o Cloudflare?',
        a: 'Depende de lo que ya usas y de tu tipo de producto. A veces lo mejor es combinarlas: por ejemplo, Cloudflare en el edge y Google Cloud o Azure para el procesamiento.',
      },
      {
        q: '¿Qué significa serverless?',
        a: 'Que no administras servidores: tu código corre cuando se necesita y pagas por uso. Escala solo cuando sube la demanda.',
      },
      {
        q: '¿Puedo cambiar de proveedor después?',
        a: 'Sí, si la arquitectura se diseña para no depender de servicios exclusivos de una sola nube. Es uno de los puntos que cuido desde el inicio.',
      },
    ],
  },
  {
    slug: 'software-a-la-medida',
    name: 'Desarrollo de software a la medida',
    short: 'Plataformas web, apps móviles y dashboards con React, Next.js, Node.js y React Native.',
    title: 'Desarrollo de software a la medida: web y apps | Manuel Castellanos',
    description:
      'Plataformas web, apps móviles y dashboards a la medida con React, Next.js, Node.js y React Native. Rápidos, seguros y fáciles de mantener.',
    intro:
      'Cuando una herramienta genérica ya no alcanza, conviene tener software hecho para tu forma de trabajar. Construyo plataformas web, apps y paneles internos que cargan rápido y se integran con lo que ya tienes.',
    forWho: [
      'Empresas que necesitan una plataforma propia para sus clientes.',
      'Equipos que trabajan con hojas de cálculo que ya no escalan.',
      'Negocios que quieren su app en iOS y Android sin pagar dos desarrollos.',
    ],
    includes: [
      'Sitios y plataformas web con Next.js',
      'Apps para iOS y Android con React Native',
      'Dashboards y paneles internos',
      'APIs REST y GraphQL',
      'Integración con ERP, CRM y pagos',
      'SEO técnico y rendimiento (Core Web Vitals)',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'React Native', 'PostgreSQL', 'Supabase'],
    faqs: [
      {
        q: '¿Me conviene una web o una app?',
        a: 'Si tus clientes te buscan en Google, empieza por la web. Si la usan a diario o necesitan notificaciones, una app tiene sentido. También se pueden hacer las dos sobre la misma base.',
      },
      {
        q: '¿Se puede hacer una sola app para iOS y Android?',
        a: 'Sí. Con React Native se construye una sola vez y se publica en las dos tiendas con rendimiento nativo.',
      },
      {
        q: '¿Puedo empezar con algo pequeño?',
        a: 'Sí, y es lo recomendable: lanzar una primera versión con lo esencial y crecer a partir de lo que usan tus clientes.',
      },
    ],
  },
];
