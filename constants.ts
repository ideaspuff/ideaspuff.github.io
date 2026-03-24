export type Language = 'en' | 'es';
export type ViewMode = 'business' | 'tech';

export const content = {
  en: {
    tech: {
      nav: {
        toggle: 'ES'
      },
      hero: {
        badge: 'ENTERPRISE AI & CLOUD ARCHITECT',
        phrases: [
          "Transforming corporates with scalable Cloud architectures.",
          "Revolutionizing business with advanced Conversational AI.",
          "Building high-performance digital ecosystems.",
          "Optimizing operations with intelligent Autonomous Agents.",
          "Designing Enterprise solutions for the future."
        ],
        chips: ['🧠 AI Agents', '☁️ Multi-Cloud', '💻 Full Stack', '🌐 Scalability'],
        ctaPrimary: 'Contact Now',
        ctaSecondary: 'LinkedIn',
      },
      expertise: {
        title: 'Core',
        titleHighlight: 'Expertise',
        description: 'End-to-end solution architecture designed for performance, security, and enterprise scale.',
        cards: {
          ai: {
            title: 'IA & Conversational',
            items: [
              'ElevenLabs & Voice Cloning',
              'LLMs Integration (Gemini, GPT-4o)',
              'Autonomous Phone Agents'
            ],
            focus: 'Focus: Automation'
          },
          cloud: {
            title: 'Cloud Architecture',
            items: [
              'GCP, Azure & Cloudflare',
              'Serverless & Edge Computing',
              'Agnostic Architectures'
            ],
            focus: 'Focus: Scalability'
          },
          dev: {
            title: 'Full Stack Enterprise',
            items: [
              'React, Next.js, TypeScript',
              'Node.js High Performance',
              'MariaDB & Distributed Data'
            ],
            focus: 'Focus: Performance'
          }
        }
      },
      ecosystem: {
        title: 'Technical',
        titleHighlight: 'Ecosystem',
        description: 'An arsenal of integrated technical capabilities to solve complex engineering challenges, from the data layer to the end-user experience.',
        cards: {
          database: {
            title: 'Database Architecture',
            description: 'Hybrid persistence strategy. Relational Integrity (SQL), NoSQL flexibility, and Serverless speed at the Edge.',
            items: [
              'Relational: PostgreSQL & SQL',
              'Serverless: Supabase & Firebase',
              'NoSQL: Flexible Document Stores'
            ]
          },
          web: {
            badge: 'Enterprise Web',
            title: 'High-Scale Web Platforms',
            description: 'Web experiences rendered at the Edge. Next.js for hybrid rendering (SSR/ISR), Core Web Vitals optimization, and global distribution via CDN.'
          },
          mobile: {
            title: 'Mobile Native',
            description: 'React Native and Expo for unified deployments on iOS and Android with native performance.',
            tags: ['iOS', 'Android']
          },
          security: {
            title: 'Security by Design',
            description: 'Comprehensive data and user protection. Implementation of modern authentication and encryption standards without compromising UX.',
            tag: 'DATA PROTECTION'
          },
          devops: {
            title: 'DevOps & CI/CD',
            description: 'Total automation. Infrastructure as Code (IaC) and continuous deployment pipelines.',
            tags: ['Docker', 'K8s', 'Terraform']
          },
          aiEng: {
            title: 'AI Engineering',
            description: 'Deep ML integration. LLM fine-tuning, LangChain chains, and model deployment.',
            tags: ['Python', 'TensorFlow']
          },
          api: {
            title: 'API Engineering',
            description: 'RESTful & GraphQL APIs, webhook orchestration, and microservices communication layers.',
            tags: ['REST', 'GraphQL', 'Webhooks']
          }
        }
      },
      stack: {
        title: 'Technological Arsenal'
      },
      contact: {
        title: 'Let\'s talk',
        titleHighlight: 'Business',
        description: 'Ready to implement AI solutions that truly scale? Let\'s take your infrastructure to the next level.',
        emailBtn: 'manuelceomx@gmail.com',
        telegramBtn: '@manuelceomx'
      },
      footer: {
        role: 'Enterprise AI & Cloud Architecture',
        rights: 'All rights reserved.',
        extra: 'Also available for talks & corporate training.'
      }
    },
    business: {
      nav: {
        toggle: 'ES'
      },
      hero: {
        badge: 'AI & DIGITAL TRANSFORMATION STRATEGIST',
        phrases: [
          "Helping companies grow faster with intelligent automation.",
          "Turning customer interactions into revenue with Conversational AI.",
          "Building digital platforms that scale with your business.",
          "Reducing operational costs with AI-powered workflows.",
          "Designing the technology your business needs to lead."
        ],
        chips: ['📈 Growth', '🤖 Automation', '💰 Cost Reduction', '🚀 Scalability'],
        ctaPrimary: 'Contact Now',
        ctaSecondary: 'LinkedIn',
      },
      expertise: {
        title: 'How I Help',
        titleHighlight: 'Your Business',
        description: 'Strategic technology solutions that drive measurable business results: more revenue, lower costs, and faster operations.',
        cards: {
          ai: {
            title: 'AI-Powered Customer Experience',
            items: [
              'Virtual agents that answer calls 24/7',
              'Chatbots that speak like your best salesperson',
              'Automated follow-ups that close more deals'
            ],
            focus: 'Result: +Revenue'
          },
          cloud: {
            title: 'Infrastructure That Scales',
            items: [
              'Systems that grow with your demand',
              'Pay only for what you use',
              'Global availability, zero downtime'
            ],
            focus: 'Result: -Costs'
          },
          dev: {
            title: 'Custom Digital Products',
            items: [
              'Web platforms your clients love to use',
              'Fast, reliable internal dashboards',
              'Data systems that inform better decisions'
            ],
            focus: 'Result: Efficiency'
          }
        }
      },
      ecosystem: {
        title: 'Solutions',
        titleHighlight: 'Portfolio',
        description: 'A comprehensive set of capabilities designed to solve real business challenges, from data management to customer-facing experiences.',
        cards: {
          database: {
            title: 'Enterprise Data Systems',
            description: 'Mission-critical databases designed for high availability, real-time analytics, and the reliability your business demands.',
            items: [
              'Structured data for executive reports and BI',
              'Real-time databases powering live dashboards',
              'Scalable storage that grows with your business'
            ]
          },
          web: {
            badge: 'Digital Presence',
            title: 'Web Platforms That Convert',
            description: 'Fast-loading websites and apps that rank higher on Google, load instantly worldwide, and turn visitors into customers.'
          },
          mobile: {
            title: 'Mobile Apps',
            description: 'Native iOS and Android apps from a single codebase, reducing time-to-market and development costs.',
            tags: ['iOS', 'Android']
          },
          security: {
            title: 'Enterprise Security',
            description: 'Your customers\' data is safe. Industry-standard protection that builds trust and meets compliance requirements.',
            tag: 'COMPLIANCE READY'
          },
          devops: {
            title: 'Continuous Delivery',
            description: 'Automatic deployments and zero-downtime updates. Your product improves every day without disrupting users.',
            tags: ['Automation', 'Reliability', 'Speed']
          },
          aiEng: {
            title: 'AI Integration',
            description: 'Custom AI models trained on your business data. Smarter recommendations, predictions, and automated decisions.',
            tags: ['Predictions', 'Insights']
          },
          api: {
            title: 'Connect Your Systems',
            description: 'Seamlessly integrate your existing tools — ERPs, CRMs, payment platforms — through custom APIs that make everything work together.',
            tags: ['Integrations', 'Automation', 'Sync']
          }
        }
      },
      stack: {
        title: 'Powered By'
      },
      contact: {
        title: 'Let\'s talk',
        titleHighlight: 'Business',
        description: 'Ready to implement AI solutions that truly scale? Let\'s take your business to the next level.',
        emailBtn: 'manuelceomx@gmail.com',
        telegramBtn: '@manuelceomx'
      },
      footer: {
        role: 'AI & Digital Transformation Strategy',
        rights: 'All rights reserved.',
        extra: 'Also available for talks & corporate training.'
      }
    }
  },
  es: {
    tech: {
      nav: {
        toggle: 'EN'
      },
      hero: {
        badge: 'ARQUITECTO ENTERPRISE AI & CLOUD',
        phrases: [
          "Transformando corporativos con arquitecturas Cloud escalables.",
          "Revolucionando negocios con IA Conversacional avanzada.",
          "Construyendo ecosistemas digitales de alto rendimiento.",
          "Optimizando operaciones con Agentes Autónomos inteligentes.",
          "Diseñando soluciones Enterprise para el futuro."
        ],
        chips: ['🧠 Agentes IA', '☁️ Multi-Cloud', '💻 Full Stack', '🌐 Escalabilidad'],
        ctaPrimary: 'Contactar Ahora',
        ctaSecondary: 'LinkedIn',
      },
      expertise: {
        title: 'Core',
        titleHighlight: 'Expertise',
        description: 'Arquitectura de soluciones end-to-end diseñadas para el rendimiento, seguridad y escala empresarial.',
        cards: {
          ai: {
            title: 'IA & Conversacional',
            items: [
              'ElevenLabs y Clonación de Voz',
              'Integración LLMs (Gemini, GPT-4o)',
              'Agentes Telefónicos Autónomos'
            ],
            focus: 'Focus: Automatización'
          },
          cloud: {
            title: 'Arquitectura Cloud',
            items: [
              'GCP, Azure y Cloudflare',
              'Serverless y Edge Computing',
              'Arquitecturas Agnósticas'
            ],
            focus: 'Focus: Escalabilidad'
          },
          dev: {
            title: 'Full Stack Enterprise',
            items: [
              'React, Next.js, TypeScript',
              'Node.js Alto Rendimiento',
              'MariaDB y Datos Distribuidos'
            ],
            focus: 'Focus: Performance'
          }
        }
      },
      ecosystem: {
        title: 'Ecosistema',
        titleHighlight: 'Técnico',
        description: 'Un arsenal de capacidades técnicas integradas para resolver desafíos complejos de ingeniería, desde la capa de datos hasta la experiencia de usuario final.',
        cards: {
          database: {
            title: 'Arquitectura de Base de Datos',
            description: 'Estrategia de persistencia híbrida. Integridad Relacional (SQL), flexibilidad NoSQL y velocidad Serverless en el Edge.',
            items: [
              'Relacional: PostgreSQL y SQL',
              'Serverless: Supabase y Firebase',
              'NoSQL: Flexible Document Stores'
            ]
          },
          web: {
            badge: 'Web Enterprise',
            title: 'Plataformas Web de Alta Escala',
            description: 'Experiencias web renderizadas en el Edge. Next.js para renderizado híbrido (SSR/ISR), optimización de Core Web Vitals y distribución global vía CDN.'
          },
          mobile: {
            title: 'Móvil Nativo',
            description: 'React Native y Expo para despliegues unificados en iOS y Android con rendimiento nativo.',
            tags: ['iOS', 'Android']
          },
          security: {
            title: 'Seguridad por Diseño',
            description: 'Protección integral de datos y usuarios. Implementación de estándares modernos de autenticación y cifrado sin comprometer la UX.',
            tag: 'PROTECCIÓN DE DATOS'
          },
          devops: {
            title: 'DevOps y CI/CD',
            description: 'Automatización total. Infraestructura como código (IaC) y pipelines de despliegue continuo.',
            tags: ['Docker', 'K8s', 'Terraform']
          },
          aiEng: {
            title: 'Ingeniería de IA',
            description: 'Integración profunda de ML. Fine-tuning de LLMs, cadenas LangChain y despliegue de modelos.',
            tags: ['Python', 'TensorFlow']
          },
          api: {
            title: 'Ingeniería de APIs',
            description: 'APIs RESTful y GraphQL, orquestación de webhooks y capas de comunicación entre microservicios.',
            tags: ['REST', 'GraphQL', 'Webhooks']
          }
        }
      },
      stack: {
        title: 'Arsenal Tecnológico'
      },
      contact: {
        title: 'Hablemos de',
        titleHighlight: 'Negocios',
        description: '¿Listo para implementar soluciones de IA que realmente escalen? Llevemos su infraestructura al siguiente nivel.',
        emailBtn: 'manuelceomx@gmail.com',
        telegramBtn: '@manuelceomx'
      },
      footer: {
        role: 'Enterprise AI & Cloud Architecture',
        rights: 'Todos los derechos reservados.',
        extra: 'También disponible para conferencias y capacitación corporativa.'
      }
    },
    business: {
      nav: {
        toggle: 'EN'
      },
      hero: {
        badge: 'ESTRATEGA DE IA Y TRANSFORMACIÓN DIGITAL',
        phrases: [
          "Ayudando a empresas a crecer más rápido con automatización inteligente.",
          "Convirtiendo interacciones con clientes en ingresos con IA Conversacional.",
          "Construyendo plataformas digitales que escalan con tu negocio.",
          "Reduciendo costos operativos con flujos de trabajo impulsados por IA.",
          "Diseñando la tecnología que tu negocio necesita para liderar."
        ],
        chips: ['📈 Crecimiento', '🤖 Automatización', '💰 Reducción de Costos', '🚀 Escalabilidad'],
        ctaPrimary: 'Contactar Ahora',
        ctaSecondary: 'LinkedIn',
      },
      expertise: {
        title: 'Cómo Ayudo a',
        titleHighlight: 'Tu Negocio',
        description: 'Soluciones tecnológicas estratégicas que generan resultados medibles: más ingresos, menores costos y operaciones más rápidas.',
        cards: {
          ai: {
            title: 'Experiencia del Cliente con IA',
            items: [
              'Agentes virtuales que atienden llamadas 24/7',
              'Chatbots que hablan como tu mejor vendedor',
              'Seguimientos automatizados que cierran más ventas'
            ],
            focus: 'Resultado: +Ingresos'
          },
          cloud: {
            title: 'Infraestructura que Escala',
            items: [
              'Sistemas que crecen con tu demanda',
              'Paga solo por lo que usas',
              'Disponibilidad global, cero caídas'
            ],
            focus: 'Resultado: -Costos'
          },
          dev: {
            title: 'Productos Digitales a la Medida',
            items: [
              'Plataformas web que tus clientes aman usar',
              'Dashboards internos rápidos y confiables',
              'Sistemas de datos para mejores decisiones'
            ],
            focus: 'Resultado: Eficiencia'
          }
        }
      },
      ecosystem: {
        title: 'Portafolio de',
        titleHighlight: 'Soluciones',
        description: 'Un conjunto integral de capacidades diseñadas para resolver desafíos reales de negocio, desde la gestión de datos hasta la experiencia del cliente.',
        cards: {
          database: {
            title: 'Bases de Datos Empresariales',
            description: 'Bases de datos de misión crítica con alta disponibilidad, analítica en tiempo real y la confiabilidad que tu negocio exige.',
            items: [
              'Datos estructurados para reportes ejecutivos y BI',
              'Bases de datos en tiempo real para dashboards',
              'Almacenamiento escalable que crece con tu negocio'
            ]
          },
          web: {
            badge: 'Presencia Digital',
            title: 'Plataformas Web que Convierten',
            description: 'Sitios y apps que cargan al instante, posicionan mejor en Google y convierten visitantes en clientes.'
          },
          mobile: {
            title: 'Apps Móviles',
            description: 'Apps nativas para iOS y Android desde un solo desarrollo, reduciendo tiempo de lanzamiento y costos.',
            tags: ['iOS', 'Android']
          },
          security: {
            title: 'Seguridad Empresarial',
            description: 'Los datos de tus clientes están seguros. Protección de estándar industrial que genera confianza y cumple regulaciones.',
            tag: 'CUMPLIMIENTO NORMATIVO'
          },
          devops: {
            title: 'Entrega Continua',
            description: 'Despliegues automáticos y actualizaciones sin interrupciones. Tu producto mejora cada día sin afectar a los usuarios.',
            tags: ['Automatización', 'Confiabilidad', 'Velocidad']
          },
          aiEng: {
            title: 'Integración de IA',
            description: 'Modelos de IA entrenados con los datos de tu negocio. Recomendaciones más inteligentes, predicciones y decisiones automatizadas.',
            tags: ['Predicciones', 'Insights']
          },
          api: {
            title: 'Conecta Tus Sistemas',
            description: 'Integra tus herramientas existentes — ERPs, CRMs, plataformas de pago — con APIs a la medida que hacen que todo funcione en armonía.',
            tags: ['Integraciones', 'Automatización', 'Sync']
          }
        }
      },
      stack: {
        title: 'Impulsado Por'
      },
      contact: {
        title: 'Hablemos de',
        titleHighlight: 'Negocios',
        description: '¿Listo para implementar soluciones de IA que realmente escalen? Llevemos tu negocio al siguiente nivel.',
        emailBtn: 'manuelceomx@gmail.com',
        telegramBtn: '@manuelceomx'
      },
      footer: {
        role: 'Estrategia de IA y Transformación Digital',
        rights: 'Todos los derechos reservados.',
        extra: 'También disponible para conferencias y capacitación corporativa.'
      }
    }
  }
};
