# ⚡ Design Spec & Meta Prompt: Manuel Castellanos Portfolio

> **Concepto**: Enterprise AI & Cloud Architect Portfolio
> **Estilo**: Futurista, Luxury, Tec de Monterrey Tech (Navy/Cyan)
> **Stack Objetivo**: React + TypeScript + Tailwind + Framer Motion

---

## 🎨 Identidad Visual

### **Color Palette (Tec Futurista)**
- **Background**: Deep Navy (`#001a33` to `#002855`) - *Base sólida y elegante.*
- **Primary Accent**: Cyan Electric (`#0DD6E8`) - *Para "glowing effects" y énfasis en IA.*
- **Secondary Accent**: Tec Blue (`#004E89` -> `#0066CC`) - *Institucional y confiable.*
- **Text**: White & Grey-400 (`#9CA3AF`) - *Legibilidad sobre fondo oscuro.*

### **Efectos Clave**
1.  **Glassmorphism Premium**: `backdrop-blur-xl`, bordes sutiles (`border-white/5`), y fondos translúcidos (`bg-white/5`).
2.  **Glow Animations**: Sombras de color cian que pulsan detrás de objetos clave.
3.  **Floating Elements**: Elementos de fondo (orbes, grids) con animación `float` suave.
4.  **Grid Background**: Patrón de cuadrícula técnica que se desvanece (`mask-image: radial-gradient`).

---

## 📝 Arquitectura de Contenido (Content Map)

### **1. Hero Section**
- **Badge**: "✨ Enterprise AI & Cloud Architect"
- **Headline**: "Manuel **Castellanos**" (Apellido con gradiente Cyan->Blue)
- **Subheadline**: "Transformando corporativos con arquitecturas cloud escalables, **IA conversacional** y soluciones enterprise de última generación."
- **CTAs**:
  - Primary: "Contactar Ahora" (mailto)
  - Secondary: LinkedIn / GitHub icons
- **Tech Chips**:
  - 🧠 AI Agents
  - ☁️ Multi-Cloud
  - 💻 Full Stack
  - 🌐 Scalability

### **2. Expertise Section (Cards)**
- **IA & Conversational**:
  - *Keywords*: ElevenLabs, Voice Cloning, LLMs (Gemini, GPT-4o).
  - *Focus*: Automatización empresarial, Agentes telefónicos.
- **Cloud Architecture**:
  - *Keywords*: GCP, Azure, Cloudflare.
  - *Focus*: Serverless, Edge Computing, Arquitecturas agnósticas.
- **Full Stack Enterprise**:
  - *Keywords*: React, Next.js, TypeScript, Node.js, MariaDB.
  - *Focus*: Alto rendimiento, SEO, UX Premium.

### **3. Tech Stack (Visual)**
- **Principales**: Next.js, React, TypeScript, Node.js, MariaDB, Azure, GCP.
- *Nota*: Presentados con iconos limpios (Lucide o React Icons) y efecto hover monocromático -> color.

### **4. Contact Section**
- **Headline**: "Hablemos de negocios"
- **Copy**: "¿Listo para implementar soluciones de IA que realmente escalen?"
- **Channels**:
  - 📧 Email: `manuelceomx@gmail.com`
  - ✈️ Telegram: `@manuelceo`
- **Social**: LinkedIn, GitHub.

---

## 🤖 Meta Prompt para React (Copy & Paste)

Este prompt está optimizado para generar el sitio en React con el nivel de calidad actual:

```markdown
# ACT AS: Senior Frontend Architect & UI/UX Designer specialized in High-End Enterprise Portfolios.

# TASK:
Create a Premium Single-Page Portfolio using React, TypeScript, Tailwind CSS, and Framer Motion.

# AESTHETIC GUIDELINES ("Tecno-Luxury"):
- **Theme**: Dark Mode only. "Deep Navy" background (#001a33) inspired by Tec de Monterrey, with "Electric Cyan" (#0DD6E8) glowing accents.
- **Visual Style**: Glassmorphism (frosted glass cards), subtle animated gradients, and strict whitespace hierarchy.
- **Animations**:
  - Hero: Floating orbs with blur-3xl behind the text.
  - Scroll: Elements should fade-in and slide-up (staggered) as the user scrolls.
  - Hover: Cards should have a "glow border" effect and slight scale-up.

# CONTENT SPECIFICATIONS:

1. **HERO**: Center aligned. Large typography (text-7xl). Animate the surname "Castellanos" with a gradient text clip. Include "Enterprise AI & Cloud Architect" badge.
   
2. **EXPERTISE GRID**: 3 Glass Cards.
   - Card 1 (AI): Icon Bot. Mention "ElevenLabs, Voice Cloning, Gemini/GPT-4o".
   - Card 2 (Cloud): Icon Cloud. Mention "GCP, Azure, Cloudflare, Serverless".
   - Card 3 (Dev): Icon Code. Mention "React, Next.js, TypeScript, MariaDB".

3. **TECH STACK**: Minimalist row of items (Next.js, Node, Azure, etc.). Use Lucide-react icons.

4. **CONTACT**: A luxury card at the bottom. "Hablemos de negocios". Large call-to-action buttons for Email (manuelceomx@gmail.com) and Telegram (@manuelceo).

# TECHNICAL CONSTRAINTS:
- Use `lucide-react` for icons.
- Use `framer-motion` for all entrances and hover states.
- Ensure strict type safety (TypeScript).
- Use Tailwind's arbitrary values for specific colors (e.g., `bg-[#001a33]`) if not extending config.
- Fully responsive (Mobile First).

# OUTPUT:
Provide the full code for `App.tsx` and `tailwind.config.js`. CODE MUST BE PRODUCTION READY.
```
