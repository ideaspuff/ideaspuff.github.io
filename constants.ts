export type Language = 'en' | 'es';
export type ViewMode = 'business' | 'tech';

export const content = {
  en: {
    tech: {
      nav: { toggle: 'ES' },
      intro: {
        lines: ['> booting neural_core', '> linking cloud regions', '> deploying agents', '> system online'],
        skip: 'click to skip'
      },
      sections: { manifesto: 'Focus', expertise: 'Expertise', ecosystem: 'Ecosystem', stack: 'Stack', contact: 'Contact' },
      manifesto: 'I design and build *AI and cloud systems* that are ready for production — from the database to the interface.',
      hud: { scroll: 'Scroll', localTime: 'Local time' },
      hero: {
        badge: 'AI & CLOUD ARCHITECT',
        phrases: [
          'Cloud architectures that scale on their own.',
          'Voice and chat agents powered by LLMs.',
          'Full stack with React, Next.js and Node.',
          'Distributed systems built for production.'
        ],
        chips: ['🧠 AI Agents', '☁️ Multi-cloud', '💻 Full stack', '🌐 Edge'],
        ctaPrimary: 'Message me',
        ctaSecondary: 'LinkedIn'
      },
      expertise: {
        title: 'Core',
        titleHighlight: 'expertise',
        description: 'End-to-end architecture: performance, security and scale.',
        cards: {
          ai: {
            title: 'Conversational AI',
            items: ['ElevenLabs & voice cloning', 'LLMs: Gemini, GPT-4o', 'Autonomous phone agents'],
            focus: 'Focus: automation'
          },
          cloud: {
            title: 'Cloud architecture',
            items: ['GCP, Azure & Cloudflare', 'Serverless & edge', 'Cloud-agnostic design'],
            focus: 'Focus: scale'
          },
          dev: {
            title: 'Full stack',
            items: ['React, Next.js & TypeScript', 'High-performance Node.js', 'MariaDB & distributed data'],
            focus: 'Focus: performance'
          }
        }
      },
      ecosystem: {
        title: 'Technical',
        titleHighlight: 'ecosystem',
        description: 'The whole stack, from the data layer to the user experience.',
        cards: {
          database: {
            title: 'Databases',
            description: 'Hybrid persistence: SQL, NoSQL and serverless at the edge.',
            items: ['PostgreSQL & SQL', 'Supabase & Firebase', 'NoSQL document stores']
          },
          web: {
            badge: 'Web',
            title: 'Web platforms at scale',
            description: 'Next.js with SSR/ISR, tuned Core Web Vitals and a global CDN.'
          },
          mobile: {
            title: 'Mobile',
            description: 'React Native and Expo for iOS and Android with native performance.',
            tags: ['iOS', 'Android']
          },
          security: {
            title: 'Security by design',
            description: 'Modern auth and encryption without hurting the UX.',
            tag: 'DATA PROTECTION'
          },
          devops: {
            title: 'DevOps & CI/CD',
            description: 'Infrastructure as code and continuous delivery.',
            tags: ['Docker', 'K8s', 'Terraform']
          },
          aiEng: {
            title: 'AI engineering',
            description: 'LLM fine-tuning, LangChain and model deployment.',
            tags: ['Python', 'TensorFlow']
          },
          api: {
            title: 'APIs',
            description: 'REST, GraphQL, webhooks and microservice communication.',
            tags: ['REST', 'GraphQL', 'Webhooks']
          }
        }
      },
      stack: { title: 'Stack' },
      contact: {
        title: "Let's talk",
        titleHighlight: 'Business',
        description: 'Got a technical challenge? Let’s talk it through.',
        emailBtn: 'manuelceomx@gmail.com',
        telegramBtn: '@manuelceomx',
        big: "LET'S TALK"
      },
      footer: {
        role: 'AI & cloud architecture',
        rights: 'All rights reserved.',
        extra: 'I also give talks and corporate training.'
      }
    },
    business: {
      nav: { toggle: 'ES' },
      intro: {
        lines: ['> booting neural_core', '> linking cloud regions', '> deploying agents', '> system online'],
        skip: 'click to skip'
      },
      sections: { manifesto: 'What I do', expertise: 'Services', ecosystem: 'Solutions', stack: 'Tools', contact: 'Contact' },
      manifesto: 'I help companies *sell more and run better* with artificial intelligence and custom software.',
      hud: { scroll: 'Scroll', localTime: 'Local time' },
      hero: {
        badge: 'AI & DIGITAL TRANSFORMATION',
        phrases: [
          'AI agents that serve your customers 24/7.',
          'Automation that saves you hours every week.',
          'Platforms that grow with your business.',
          'Less manual work, more time to sell.'
        ],
        chips: ['📈 Growth', '🤖 Automation', '💰 Savings', '🚀 Scale'],
        ctaPrimary: 'Message me',
        ctaSecondary: 'LinkedIn'
      },
      expertise: {
        title: 'How I',
        titleHighlight: 'help',
        description: 'Technology focused on results: more sales, lower costs, faster processes.',
        cards: {
          ai: {
            title: 'AI customer service',
            items: ['Agents that answer calls 24/7', 'Chatbots that sell like your best rep', 'Automatic follow-up with every lead'],
            focus: 'Result: more sales'
          },
          cloud: {
            title: 'Infrastructure that scales',
            items: ['Grows when your demand grows', 'Pay only for what you use', 'Always available'],
            focus: 'Result: lower costs'
          },
          dev: {
            title: 'Custom software',
            items: ['Web platforms your customers enjoy', 'Fast, clear dashboards', 'Data for better decisions'],
            focus: 'Result: efficiency'
          }
        }
      },
      ecosystem: {
        title: 'What I',
        titleHighlight: 'build',
        description: "From the database to the app on your customer's phone.",
        cards: {
          database: {
            title: 'Business data',
            description: 'Reliable databases with real-time reporting.',
            items: ['Reports & BI', 'Live dashboards', 'Storage that scales']
          },
          web: {
            badge: 'Online presence',
            title: 'Websites that convert',
            description: 'Fast, easy to find on Google, and built to turn visitors into customers.'
          },
          mobile: {
            title: 'Mobile apps',
            description: 'iOS and Android from one codebase: faster and cheaper.',
            tags: ['iOS', 'Android']
          },
          security: {
            title: 'Security',
            description: "Your customers' data, protected and compliant.",
            tag: 'COMPLIANCE'
          },
          devops: {
            title: 'Continuous improvement',
            description: 'Updates with no downtime or interruptions.',
            tags: ['Automatic', 'Reliable', 'Fast']
          },
          aiEng: {
            title: 'Custom AI',
            description: 'Models trained on your own data to predict and recommend.',
            tags: ['Predictions', 'Insights']
          },
          api: {
            title: 'Integrations',
            description: 'I connect your ERP, CRM and payments so everything works together.',
            tags: ['ERP', 'CRM', 'Payments']
          }
        }
      },
      stack: { title: 'Tools I use' },
      contact: {
        title: "Let's talk",
        titleHighlight: 'Business',
        description: 'Have a project in mind? Let’s talk.',
        emailBtn: 'manuelceomx@gmail.com',
        telegramBtn: '@manuelceomx',
        big: "LET'S TALK"
      },
      footer: {
        role: 'AI & digital transformation',
        rights: 'All rights reserved.',
        extra: 'I also give talks and corporate training.'
      }
    }
  },
  es: {
    tech: {
      nav: { toggle: 'EN' },
      intro: {
        lines: ['> iniciando neural_core', '> enlazando regiones cloud', '> desplegando agentes', '> sistema en línea'],
        skip: 'clic para saltar'
      },
      sections: { manifesto: 'Enfoque', expertise: 'Expertise', ecosystem: 'Ecosistema', stack: 'Stack', contact: 'Contacto' },
      manifesto: 'Diseño y construyo *sistemas de IA y cloud* listos para producción, de la base de datos a la interfaz.',
      hud: { scroll: 'Desliza', localTime: 'Hora local' },
      hero: {
        badge: 'ARQUITECTO DE IA Y CLOUD',
        phrases: [
          'Arquitecturas cloud que escalan solas.',
          'Agentes de voz y chat con LLMs.',
          'Full stack con React, Next.js y Node.',
          'Sistemas distribuidos listos para producción.'
        ],
        chips: ['🧠 Agentes IA', '☁️ Multi-cloud', '💻 Full stack', '🌐 Edge'],
        ctaPrimary: 'Escríbeme',
        ctaSecondary: 'LinkedIn'
      },
      expertise: {
        title: 'Core',
        titleHighlight: 'expertise',
        description: 'Arquitectura de punta a punta: rendimiento, seguridad y escala.',
        cards: {
          ai: {
            title: 'IA conversacional',
            items: ['ElevenLabs y clonación de voz', 'LLMs: Gemini, GPT-4o', 'Agentes telefónicos autónomos'],
            focus: 'Foco: automatización'
          },
          cloud: {
            title: 'Arquitectura cloud',
            items: ['GCP, Azure y Cloudflare', 'Serverless y edge', 'Sin amarrarte a un proveedor'],
            focus: 'Foco: escala'
          },
          dev: {
            title: 'Full stack',
            items: ['React, Next.js y TypeScript', 'Node.js de alto rendimiento', 'MariaDB y datos distribuidos'],
            focus: 'Foco: rendimiento'
          }
        }
      },
      ecosystem: {
        title: 'Ecosistema',
        titleHighlight: 'técnico',
        description: 'Todo el stack, desde la capa de datos hasta la experiencia de usuario.',
        cards: {
          database: {
            title: 'Bases de datos',
            description: 'Persistencia híbrida: SQL, NoSQL y serverless en el edge.',
            items: ['PostgreSQL y SQL', 'Supabase y Firebase', 'Bases NoSQL de documentos']
          },
          web: {
            badge: 'Web',
            title: 'Plataformas web a escala',
            description: 'Next.js con SSR/ISR, Core Web Vitals optimizados y CDN global.'
          },
          mobile: {
            title: 'Móvil',
            description: 'React Native y Expo para iOS y Android con rendimiento nativo.',
            tags: ['iOS', 'Android']
          },
          security: {
            title: 'Seguridad por diseño',
            description: 'Autenticación y cifrado modernos sin sacrificar la experiencia.',
            tag: 'PROTECCIÓN DE DATOS'
          },
          devops: {
            title: 'DevOps y CI/CD',
            description: 'Infraestructura como código y despliegue continuo.',
            tags: ['Docker', 'K8s', 'Terraform']
          },
          aiEng: {
            title: 'Ingeniería de IA',
            description: 'Fine-tuning de LLMs, LangChain y despliegue de modelos.',
            tags: ['Python', 'TensorFlow']
          },
          api: {
            title: 'APIs',
            description: 'REST, GraphQL, webhooks y comunicación entre microservicios.',
            tags: ['REST', 'GraphQL', 'Webhooks']
          }
        }
      },
      stack: { title: 'Stack' },
      contact: {
        title: 'Hablemos de',
        titleHighlight: 'Negocios',
        description: '¿Tienes un reto técnico? Platiquemos.',
        emailBtn: 'manuelceomx@gmail.com',
        telegramBtn: '@manuelceomx',
        big: 'HABLEMOS'
      },
      footer: {
        role: 'Arquitectura de IA y cloud',
        rights: 'Todos los derechos reservados.',
        extra: 'También doy conferencias y capacitaciones.'
      }
    },
    business: {
      nav: { toggle: 'EN' },
      intro: {
        lines: ['> iniciando neural_core', '> enlazando regiones cloud', '> desplegando agentes', '> sistema en línea'],
        skip: 'clic para saltar'
      },
      sections: { manifesto: 'Qué hago', expertise: 'Servicios', ecosystem: 'Soluciones', stack: 'Herramientas', contact: 'Contacto' },
      manifesto: 'Ayudo a empresas a *vender más y operar mejor* con inteligencia artificial y software a la medida.',
      hud: { scroll: 'Desliza', localTime: 'Hora local' },
      hero: {
        badge: 'IA Y TRANSFORMACIÓN DIGITAL',
        phrases: [
          'Agentes de IA que atienden a tus clientes 24/7.',
          'Automatización que te ahorra horas cada semana.',
          'Plataformas que crecen al ritmo de tu negocio.',
          'Menos trabajo manual, más tiempo para vender.'
        ],
        chips: ['📈 Crecimiento', '🤖 Automatización', '💰 Ahorro', '🚀 Escala'],
        ctaPrimary: 'Escríbeme',
        ctaSecondary: 'LinkedIn'
      },
      expertise: {
        title: 'Cómo te',
        titleHighlight: 'ayudo',
        description: 'Tecnología enfocada en resultados: más ventas, menos costos y procesos más rápidos.',
        cards: {
          ai: {
            title: 'Atención con IA',
            items: ['Agentes que contestan llamadas 24/7', 'Chatbots que venden como tu mejor vendedor', 'Seguimiento automático a cada cliente'],
            focus: 'Resultado: más ventas'
          },
          cloud: {
            title: 'Infraestructura que escala',
            items: ['Crece cuando crece tu demanda', 'Pagas solo lo que usas', 'Siempre disponible'],
            focus: 'Resultado: menos costos'
          },
          dev: {
            title: 'Software a la medida',
            items: ['Plataformas que tus clientes disfrutan', 'Dashboards rápidos y claros', 'Datos para decidir mejor'],
            focus: 'Resultado: eficiencia'
          }
        }
      },
      ecosystem: {
        title: 'Lo que',
        titleHighlight: 'construyo',
        description: 'Desde la base de datos hasta la app en el celular de tu cliente.',
        cards: {
          database: {
            title: 'Datos de tu empresa',
            description: 'Bases de datos confiables, con reportes en tiempo real.',
            items: ['Reportes y BI', 'Dashboards en vivo', 'Almacenamiento que escala']
          },
          web: {
            badge: 'Presencia digital',
            title: 'Sitios que venden',
            description: 'Cargan rápido, aparecen en Google y convierten visitas en clientes.'
          },
          mobile: {
            title: 'Apps móviles',
            description: 'iOS y Android con un solo desarrollo: más rápido y más barato.',
            tags: ['iOS', 'Android']
          },
          security: {
            title: 'Seguridad',
            description: 'Los datos de tus clientes, protegidos y en regla.',
            tag: 'CUMPLIMIENTO'
          },
          devops: {
            title: 'Mejora continua',
            description: 'Actualizaciones sin caídas ni interrupciones.',
            tags: ['Automático', 'Confiable', 'Rápido']
          },
          aiEng: {
            title: 'IA a tu medida',
            description: 'Modelos entrenados con tus propios datos para predecir y recomendar.',
            tags: ['Predicciones', 'Insights']
          },
          api: {
            title: 'Integraciones',
            description: 'Conecto tu ERP, CRM y pagos para que todo funcione junto.',
            tags: ['ERP', 'CRM', 'Pagos']
          }
        }
      },
      stack: { title: 'Con qué trabajo' },
      contact: {
        title: 'Hablemos de',
        titleHighlight: 'Negocios',
        description: '¿Tienes un proyecto en mente? Platiquemos.',
        emailBtn: 'manuelceomx@gmail.com',
        telegramBtn: '@manuelceomx',
        big: 'HABLEMOS'
      },
      footer: {
        role: 'Estrategia de IA y transformación digital',
        rights: 'Todos los derechos reservados.',
        extra: 'También doy conferencias y capacitaciones.'
      }
    }
  }
};
