import { Specialty, ServicePlan, Article, FAQItem, Testimonial } from './types';

export const NUTRITIONIST_INFO = {
  name: 'María Ignacia Valenzuela',
  title: 'Nutricionista Clínico & Especialista en Salud Integral',
  credentials: [
    'Nutricionista Universitaria (U. de Chile)',
    'MSc. en Nutrición Deportiva y Metabolismo',
    'Diplomada en Salud Hormonal y Ginecológica',
    'Certificación en Alimentación Basada en Plantas (Laniakea)',
    'Registro SIS N° 481029 (Acreditada por la Súper de Salud Chile)'
  ],
  bio: 'Hola, soy María Ignacia. Creo en una nutrición coherente, libre de restricciones extremas y centrada en tu bienestar digestivo, hormonal y metabólico. Mi misión es entregarte herramientas empáticas basadas en evidencia científica para que hagas las paces con la comida y construyas un estilo de vida saludable sostenible en el tiempo.',
  stats: [
    { label: 'Pacientes Satisfechos', value: '3,200+' },
    { label: 'Años de Experiencia', value: '8+' },
    { label: 'Modalidad de Atención', value: 'Online & Presencial' },
    { label: 'Certificaciones Activas', value: '5+' }
  ],
  location: 'Providencia, Santiago (Cercano a Metro Los Leones) & Telemedicina para todo Chile.',
  whatsappUrl: 'https://wa.me/56987654321?text=Hola%20Maria%20Ignacia,%20quiero%20agendar%20una%20consulta%20nutricional.'
};

export const SPECIALTIES: Specialty[] = [
  {
    id: 'resistencia-insulina',
    title: 'Resistencia a la Insulina',
    description: 'Regula tus niveles de glucosa de forma natural sin pasar hambre, mejorando tus niveles de energía y salud metabólica.',
    longDescription: 'Abordaje integral del síndrome metabólico, prediabetes y resistencia a la insulina. Diseñamos un plan de alimentación baje el índice glucémico general de tu dieta, optimizando el uso de energía corporal y previniendo la fatiga crónica típica de la tarde.',
    iconName: 'Activity'
  },
  {
    id: 'salud-digestiva',
    title: 'Salud Digestiva e Inflamación',
    description: 'Tratamiento para Colon Irritable, distensión abdominal y desbalances en la microbiota intestinal con protocolo FODMAP guiado.',
    longDescription: 'Acompañamiento especializado para el Síndrome de Intestino Irritable, reflujo, gastritis y disbiosis. Olvídate de los dolores abdominales crónicos y la hinchazón persistente utilizando pautas de alimentación regenerativa orientadas al microbioma.',
    iconName: 'Sparkles'
  },
  {
    id: 'salud-hormonal',
    title: 'Salud Hormonal y SOP',
    description: 'Pautas nutricionales específicas para equilibrar tus hormonas, regular periodos menstruales y manejar el Síndrome de Ovario Poliquístico.',
    longDescription: 'Diseño clínico adaptado para mujeres con Síndrome de Ovario Poliquístico (SOP), hipotiroidismo, endometriosis o transición a la menopausia. Apoyamos el equilibrio estrogénico y de progesterona mediado por nutrientes esenciales.',
    iconName: 'Heart'
  },
  {
    id: 'nutricion-deportiva',
    title: 'Nutrición Deportiva',
    description: 'Potencia tu rendimiento físico, acelera tu recuperación, aumenta masa muscular o disminuye porcentaje de grasa de forma eficiente.',
    longDescription: 'Planificación personalizada para deportistas amateur y profesionales. Cálculo preciso de macro y micronutrientes, ayudas ergogénicas científicamente respaldadas y sincronización de comidas (nutrient timing) para entrenar con energía máxima.',
    iconName: 'Zap'
  },
  {
    id: 'alimentacion-vegetariana',
    title: 'Alimentación Vegana / Vegetariana',
    description: 'Transición o mantención segura con foco en prevención de carencias (Vitamina B12, hierro, zinc) y balance óptimo de macros.',
    longDescription: 'Asesoría clínica respetuosa y experta en dietas plant-based. Evaluamos analíticas sanguíneas, programamos la suplementación adecuada y armamos pautas deliciosas asegurando el aporte óptimo de proteínas vegetales.',
    iconName: 'Leaf'
  },
  {
    id: 'perdida-peso',
    title: 'Pérdida de Peso Sostenible',
    description: 'Nutrición sin dietas restrictivas ni efecto rebote. Descubre el placer de comer saludable con foco en hábitos eternos.',
    longDescription: 'Evitemos el estrés de contar calorías obsesivamente. Trabajamos en el re-aprendizaje alimentario, identificando el hambre emocional y estructurando comidas reconfortantes y densas en nutrientes.',
    iconName: 'TrendingDown'
  },
  {
    id: 'embarazo-lactancia',
    title: 'Embarazo y Lactancia',
    description: 'Nutrición segura para un desarrollo fetal saludable, control de peso gestacional y suplementación óptima en cada trimestre.',
    longDescription: 'Supervisión experta durante la gestación y el postparto. Aseguramos el aporte crítico de ácido fólico, hierro, DHA, calcio y colina, previniendo diabetes gestacional o alzas excesivas de presión arterial.',
    iconName: 'Baby'
  },
  {
    id: 'habitos-saludables',
    title: 'Alimentación Consciente y Hábitos',
    description: 'Técnicas de Mindful Eating para reconectar con tus señales de hambre y saciedad, mejorando tu relación con los alimentos.',
    longDescription: 'Acompañamiento psicoterapéutico aplicado a la alimentación. Aprenderás a desacelerar tus ritmos de ingesta, decodificar antojos y disfrutar sin culpa ni ansiedad en eventos sociales.',
    iconName: 'Smile'
  }
];

export const SERVICE_PLANS: ServicePlan[] = [
  {
    id: 'consulta-inicial',
    name: 'Consulta de Evaluación Inicial',
    price: 45000,
    originalPrice: 55000,
    duration: '60 minutos',
    shortDesc: 'Evaluación integral de salud, análisis de hábitos y plan de acción 100% personalizado. Con boleta reembolsable.',
    benefits: [
      'Análisis de composición corporal (Antropometría presencial o anamnesis telemática)',
      'Revisión completa de exámenes de laboratorio recientes',
      'Pauta alimentaria inicial personalizada en PDF',
      'Guía de porciones y marcas recomendadas en supermercados chilenos',
      'Boleta de honorarios para emitir reembolso en Isapres/Seguros'
    ],
    category: 'consulta'
  },
  {
    id: 'consulta-seguimiento',
    name: 'Sesión de Control y Seguimiento',
    price: 30000,
    duration: '35 minutos',
    shortDesc: 'Monitoreo de avances, ajustes de pauta alimentaria y resolución de dudas para asegurar tus metas de salud.',
    benefits: [
      'Evaluación de adherencia, dificultades y logros obtenidos',
      'Actualización completa de tu pauta y recetas recomendadas',
      'Análisis de evolución corporal o bioquímica',
      'Estrategias conductuales para mantener la motivación',
      'Boleta reembolsable para Isapre y seguros complementarios'
    ],
    category: 'consulta'
  },
  {
    id: 'pack-bienestar',
    name: 'Pack Bienestar Integral (1 Mes)',
    price: 68000,
    originalPrice: 75000,
    duration: '1 Mes de Acompañamiento',
    isPopular: true,
    shortDesc: 'La opción ideal para arrancar un cambio real con contención diaria y respuestas a la velocidad de tu celular.',
    benefits: [
      '1 Consulta Inicial (60 minutos) presencial o remota',
      '1 Sesión de Control (35 minutos) a las dos semanas',
      'Resolución de dudas por WhatsApp de Lunes a Viernes',
      'Acceso exclusivo a Recetario Premium Prime de Temporada',
      'Boletas de honorarios emitidas por sesión (reembolsables)'
    ],
    category: 'pack'
  },
  {
    id: 'programa-transformacion',
    name: 'Programa Hábitos Sostenibles (3 Meses)',
    price: 155000,
    originalPrice: 180000,
    duration: '3 Meses de Mentoría',
    shortDesc: 'Acompañamiento intensivo para rediseñar tu salud metabólica, hormonal o deportiva con cambios que duran para siempre.',
    benefits: [
      '1 Consulta Inicial + 4 Controles periódicos (quincenales)',
      'Soporte diario prioritario vía WhatsApp directamente conmigo',
      'Ebook exclusivo "Alimentación Consciente sin Dietas" (120 páginas)',
      'Plantilla interactiva de Tracker de Hábitos y Planificador de menú',
      'Descuento del 15% en exámenes de laboratorio en clínicas en convenio',
      'Reembolsable por Isapre/Seguros (se entregan 5 boletas de honorarios)'
    ],
    category: 'programa'
  },
  {
    id: 'nutricion-deportiva-plan',
    name: 'Plan Atleta de Rendimiento',
    price: 85000,
    duration: '2 Meses de Planificación',
    shortDesc: 'Optimizado para ciclistas, corredores, crossfiteros o fitness recreativo que exigen el máximo a su físico.',
    benefits: [
      '1 Sesión de Evaluación de Gasto Energético y Antropometría ISAK',
      'Planificación de macro y micronutrientes según fases de entrenamiento',
      'Estrategia de Hidratación y Nutrición pre, durante y post carrera',
      'Protocolo de Suplementación basada en evidencia (Creatina, Beta-Alanina, etc.)',
      '1 Control de ajuste a las 4 semanas'
    ],
    category: 'programa'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'como-desinflamar-abdomen',
    slug: 'como-bajar-inflamacion-intestinal',
    title: '¿Abdomen hinchado? Cómo bajar la inflamación intestinal de forma natural',
    summary: 'La distensión abdominal no es normal. Descubre cuáles son las principales causas tras la inflamación digestiva y los cambios prácticos en tu alimentación para solucionarlo.',
    content: `La inflamación abdominal persistente no solo produce molestias estéticas, sino que es un llamado de atención de tu salud gastrointestinal. Muchos pacientes acuden a la consulta nutricional señalando sentir que "todo les cae mal", sintiéndose ligeros por la mañana pero con una inflamación equivalente a varios meses de embarazo al final del día.

### ¿Por qué nos inflamamos?
La hinchazón o distensión abdominal suele estar vinculada a:
1. **Disbiosis Intestinal:** Un desequilibrio entre las bacterias benéficas y nocivas de nuestra microbiota.
2. **Ingesta acelerada:** Tragar aire al comer rápido o ansioso, lo que sobrecarga el estómago.
3. **Consumo excesivo de ultraprocesados:** Emulsionantes, edulcorantes artificiales y conservantes dañan la mucosa de tu colon.
4. **Intolerancias no diagnosticadas:** Sensibilidad al gluten no celíaca o mala absorción de carbohidratos fermentables (FODMAPs).

---

### Estrategias clave para recuperar tu bienestar digestivo

#### 1. Mastica de forma consciente
El proceso de digestión inicia en la boca. Si no masticas cada bocado al menos 20 a 30 veces, tu estómago e intestinos deberán realizar un trabajo mecánico extra, favoreciendo la fermentación bacteriana ruidosa y la producción de gas.

#### 2. Incorpora infusiones carminativas
Hierbas como la menta piperita, el jengibre, el hinojo y la manzanilla contienen aceites esenciales que relajan los músculos lisos de tu tracto gastrointestinal, facilitando la expulsión de gases y aliviando espasmos.

#### 3. Evalúa junto a tu nutricionista el protocolo Low FODMAP
Si sufres de Colon Irritable agudo, guiar una dieta baja en FODMAP (carbohidratos fermentables de cadena corta) durante 2 a 4 semanas puede reducir los síntomas de distensión en un 75%. Esto debe realizarse bajo estricta supervisión para no empobrecer la microbiota a largo plazo.

#### 4. Cuida tu hidratación
Beber agua filtrada fuera de las comidas principales mejora el tránsito digestivo. Evita beber líquidos helados o carbonatados (bebidas con gas) durante el almuerzo o cena, ya que diluyen los jugos gástricos encargados de descomponer los complejos alimentarios.

### Nutrición integradora en Chile
Si vives en Santiago o regiones de Chile y sufres dolores gástricos que impiden tu normal desarrollo profesional o social, recuerda que puedes agendar una consulta nutricional online o presencial. Elaboraremos una estrategia digestiva y pauta antiinflamatoria adaptada a tus ritmos de vida.`,
    category: 'salud-integral',
    author: 'María Ignacia Valenzuela',
    date: '24 Mayo 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=700&h=450',
    tags: ['Colon Irritable', 'Salud digestiva', 'Fodmap', 'Inflamación'],
    seoKeywords: ['cómo bajar la inflamación', 'colon irritable chile', 'distensión abdominal', 'nutricionista digestiva']
  },
  {
    id: 'desayunos-saludables-ideas',
    slug: 'ideas-desayunos-saludables-nutritivos',
    title: '5 Ideas de desayunos saludables y rápidos para chilenos ocupados',
    summary: '¿Sin tiempo para cocinar en las mañanas? Olvídate del clásico pan blanco con té azucarado. Aquí tienes opciones ricas en proteínas, grasas de calidad y carbohidratos complejos.',
    content: `El desayuno representa la primera oportunidad del día para nutrir tus células con vitaminas, grasas saludables y proteínas. Desafortunadamente, el desayuno tradicional chileno suele concentrase en carbohidratos refinados de rápida absorción (el clásico pan de molde, hallulla con margarina o cereales azucarados de caja), lo que gatilla montañas rusas hormonales e incrementa el hambre a media mañana.

Un desayuno balanceado te mantendrá enfocado, controlará tus niveles de insulina y evitará la típica ansiedad de media tarde.

---

### Las 5 recetas que cambiarán tus mañanas

#### 1. El Clásico "Porridge de Avena y Semillas"
* **Ingredientes:** 4 cucharadas de avena entera, 1 taza de bebida vegetal sin azúcar o agua, 1 cucharadita de semillas de chía, 1 puñado de arándanos frescos, 1 chorrito de esencia de vainilla y stevia.
* **Preparación (Rápida):** Calienta la avena en una olla pequeña con el líquido por 3-5 minutos hasta espesar. Apaga el fuego, incorpora la chía, revuelve bien y sirve con los arándanos y una pizca de canela.
* **Beneficio:** Fibra soluble beta-glucano que estabiliza el colesterol, protege tu estómago y da saciedad duradera.

#### 2. Tostadas Integrales Premium de Palta con Huevo Poché
* **Ingredientes:** 1 rebanada de pan integral de masa madre de panadería local, media palta Hass mediana molida, 1 o 2 huevos de gallina libre de campo.
* **Preparación:** Tuesta el pan de masa madre. Unta la palta sazonada con un toque de sal marina y limón. Prepara el huevo poché en agua hirviendo con vinagre por 3 minutos colocándolo suavemente arriba de tu tostada.
* **Beneficio:** Combina grasas monoinsaturadas saludables para tu cerebro con la proteína de alto valor biológico del huevo.

#### 3. Chía Pudding Express de Cacao (Pre-elaborado la noche anterior)
* **Ingredientes:** 3 cucharadas de semillas de chía, 3/4 taza de leche de almendras sin azúcar, 1 cucharadita de cacao puro en polvo, gotas de edulcorante, trozos de frutilla fresca.
* **Preparación:** En un frasco de vidrio mezcla vigorosamente la chía, leche, cacao y edulcorante. Déjalo reposar en el refrigerador toda la noche. Por la mañana, decora con frutillas y consume frío.
* **Beneficio:** Cero tiempo de cocina temprano, repleto de Omega-3 y antioxidantes potentes.

#### 4. "Scrambled Tofu" (Revoltijo de Tofu) para Veganos
* **Ingredientes:** 150g de tofu firme desmenuzado, pizca de cúrcuma en polvo, sal negra (Kala Namak) para saborizar, espinaca picada fresca.
* **Preparación:** Saltea el tofu desmenuzado en un sartén con aceite de oliva por 4 minutos. Añade la cúrcuma y sal para emular el color y sabor del huevo. Revuelve junto a las hojas de espinaca hasta marchitar. Sírvelo sobre galletas de arroz o pan pita integral.
* **Beneficio:** Ideal para deportistas por su altísimo contenido proteico vegetal y nulo colesterol.

#### 5. Batido Verde Energético Funcional (Para días ultra ocupados)
* **Ingredientes:** 1 taza de hojas de espinaca baby crudas, 1/2 pera verde chilena, 1 scoop de proteína de suero de leche (o arveja) sabor vainilla, 1 cucharadita de linaza molida, agua y hielo.
* **Preparación:** Licúa todos los ingredientes a velocidad máxima durante 1 minuto hasta obtener textura sedosa.
* **Beneficio:** Nutrientes antioxidantes de rápida absorción con un aporte balanceado de proteína que mantiene a raya el cortisol matutino.`,
    category: 'recetas',
    author: 'María Ignacia Valenzuela',
    date: '18 Mayo 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&q=80&w=700&h=450',
    tags: ['Desayuno rápido', 'Recetas saludables', 'Proteínas', 'Palta Hass'],
    seoKeywords: ['ideas de desayunos saludables', 'desayunos fitness rápidos', 'recetas de desayunos chile']
  },
  {
    id: 'resistencia-insulina-claves',
    slug: 'resistencia-a-la-insulina-alimentacion-consciente',
    title: 'Resistencia a la Insulina en Chile: Claves para entenderla y revertirla',
    summary: 'La resistencia a la insulina es el diagnóstico principal de miles de chilenos. Te enseño cómo optimizar tus células para que vuelvan a usar correctamente la energía.',
    content: `La resistencia a la insulina (RI) se ha convertido en una de las mayores preocupaciones sanitarias en el Chile contemporáneo. Estimulado por el sedentarismo y dietas ricas en azúcares refinados combinados con grasas de mala calidad, esta condición metabólica silenciosa afecta el metabolismo energético celular de casi el 40% de la población adulta en alguna medida.

### ¿Qué ocurre realmente en tu cuerpo?
Cuando comes, tus alimentos se transforman en glucosa (azúcar), la cual circula en tu torrente sanguíneo. El páncreas libera una hormona llamada **insulina**, que actúa como la llave de acceso para que tus células abran sus puertas y utilicen esa glucosa como combustible.

En una persona con **resistencia a la insulina**, la cerradura celular está bloqueada u oxidada por acumulación de grasa ectópica e inflamación celular. El páncreas, al notar que la glucosa sigue alta en la sangre, se ve obligado a bombear dosis masivas de insulina para poder "abrir las puertas" forzosamente. Esto provoca hiperinsulinemia.

#### Síntomas comunes de la Resistencia a la Insulina:
* **Fatiga extrema postprandial:** Un sueño inexplicable después de almorzar.
* **Acantosis Nigricans:** Manchas oscuras o aspecto "sucio" en pliegues del cuello, axilas o nudillos.
* **Ansiedad insaciable por dulce:** Deseos urgentes de comer chocolates o masas cerca de las 5 o 6 de la tarde.
* **Aumento acelerado de grasa abdominal:** Dificultad extrema para reducir el contorno de cintura a pesar de hacer dieta.

---

### 3 Pilares nutricionales para revertir la RI (Sin medicamentos eternos)

#### 1. Distribuye inteligentemente tus carbohidratos
No le temas a los carbohidratos crudos: la solución no es eliminarlos al 100% (lo cual genera adherencia pésima y rebote), sino aprender a seleccionarlos. Reemplaza el arroz blanco y fideos por quínoa, legumbres, arroz integral, zapallo camote y avena entera.

#### 2. Aplica el "Orden del Plato" para aplanar la glucosa
Científicos metabólicos sugieren que el orden en que ingieres las partes de tu comida cambia radicalmente tu glucemia:
* **Primero:** Come las verduras y ensaladas (la fibra actúa como una malla protectora en la primera porción del intestino delgado).
* **Segundo:** Consume proteínas puras y grasas (carnes magras, pescado, tofu, huevos, frutos secos).
* **Tercero:** Ingiere los carbohidratos complejos o frutas.
Al retrasar la absorción de glucosa con fibra y proteínas previas, evitas picos de azúcar y ahorras trabajo a tu páncreas.

#### 3. Sincroniza con entrenamiento de fuerza muscular
Tus músculos son los principales consumidores de glucosa de tu organismo. Cuando levantas peso, haces entrenamientos de fuerza o HIIT, tus contracciones musculares absorben azúcar transportándola directamente al músculo **sin mediación de la insulina**. Ejercitar tus músculos actúa literalmente como un fármaco natural sensibilizador.

### Reembolsos y exámenes de sangre en Chile
Tener un diagnóstico médico de resistencia a la insulina puede sonar alarmante, pero con un plan alimentario coherente de 3 meses enfocado en hábitos sostenibles, es una condición metabólica altamente reversible. En nuestra consulta emitimos boletas que puedes reembolsar en Isapres (como Banmédica, CruzBlanca, Colmena) o solicitar reembolsos vía seguros complementarios de salud. Un cambio real es perfectamente posible.`,
    category: 'nutricion',
    author: 'María Ignacia Valenzuela',
    date: '10 Mayo 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=700&h=450',
    tags: ['Resistencia Insulina', 'Glicemia', 'Metabolismo', 'Isapre'],
    seoKeywords: ['resistencia a la insulina', 'prediabetes alimentacion', 'nutricionista metabolismo chile']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Carolina Henríquez',
    age: 34,
    city: 'Concepción',
    text: 'Llegué donde María Ignacia desesperada por mi colon irritable e hinchazón diaria. Después de solo un mes con el protocolo FODMAP y sus consejos cariñosos, mi abdomen volvió a estar plano y sin dolores gástricos. ¡Aprendí a comer sin miedo!',
    rating: 5,
    condition: 'Colon Irritable & Inflamación',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120'
  },
  {
    id: 'test-2',
    name: 'Sebastián Oyarzún',
    age: 29,
    city: 'Santiago',
    text: 'Entrenaba crossfit y comía harto, pero siempre con bajas energías en la tarde. María Ignacia me calculó los carbohidratos según mis bloques de ejercicio. Resultados increíbles: aumenté 3 kilos de músculo y bajé mi porcentaje de grasa exponencialmente.',
    rating: 5,
    condition: 'Nutrición Deportiva & Rendimiento',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120'
  },
  {
    id: 'test-3',
    name: 'Natalia Castro',
    age: 38,
    city: 'Viña del Mar',
    text: 'Tenía resistencia a la insulina diagnosticada y siempre me habían dado pautas de 1000 calorías impagables. Con el Programa de 3 Meses aprendí pautas inteligentes, aprendí a comprar y mis exámenes gástricos y de sangre salieron perfectos. Mi páncreas se lo agradece infinitamente.',
    rating: 5,
    condition: 'Resistencia a la Insulina',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=120&h=120'
  },
  {
    id: 'test-4',
    name: 'Fernanda Solís',
    age: 41,
    city: 'Antofagasta',
    text: 'La consulta online es fantástica. Soy del norte y gracias a la videollamada y al soporte continuo de WhatsApp logré regular mis ciclos hormonales del SOP. Es sumamente empática, una profesional gigante, se siente verdaderamente cercana.',
    rating: 5,
    condition: 'Salud Hormonal y SOP',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: '¿Cómo funciona la modalidad de consulta online?',
    answer: 'La consulta online o de telemedicina se realiza vía videollamada segura (por Google Meet o Zoom). Tiene exactamente la misma rigurosidad clínica que una sesión presencial. Antes de la sesión, completas un formulario gástrico e historial clínico, y me compartes tus exámenes recientes. Tras la videollamada, te envío tu pauta 100% personalizada en menos de 24 horas hábiles a tu correo y cuenta de WhatsApp.',
    category: 'consulta'
  },
  {
    question: '¿Pueden reembolsarse las consultas en Isapres o seguros complementarios?',
    answer: 'Sí, absolutamente. Yo emito una Boleta de Honorarios profesional de salud autorizada por el Servicio de Impuestos Internos (SII), detallando mi registro nacional de prestadores del Ministerio de Salud (SIS). Con este documento, lo adjuntas en la sucursal virtual de tu Isapre (Colmena, Banmédica, Consalud, Colmena, Nueva Masvida, CruzBlanca, etc.) para que te reembolsen según tu plan. También es válida para seguros colectivos como Bicevida, Metlife, Consorcio, Chilena, etc.',
    category: 'isapre-fonasa'
  },
  {
    question: '¿Atiende pacientes por Fonasa?',
    answer: 'Por Fonasa, puedes atenderte de forma particular por telemedicina o presencial. Al finalizar la consulta te emito la boleta correspondiente, y si cuentas con un seguro complementario individual o laboral, puedes reembolsar un porcentaje del valor total.',
    category: 'isapre-fonasa'
  },
  {
    question: '¿Cuáles son las formas de pago de la web?',
    answer: 'Ofrecemos pasarela de pago 100% segura integrada que soporta tarjetas de débito y crédito a través de Webpay Plus (Transbank), Mercado Pago y Flow. Puedes pagar directamente deslizando tu tarjeta Redcompra chilena y tienes la opción de financiamiento en cuotas sin interés si tu banco emisor lo permite.',
    category: 'pagos'
  },
  {
    question: '¿Qué ocurre si necesito reprogramar o cancelar mi hora?',
    answer: 'Comprendemos que imprevistos ocurren. Puedes reprogramar o cancelar tu sesión con un mínimo de 24 horas de anticipación a través de tu link de reserva o avisándonos al WhatsApp de soporte. Esto nos ayuda a reasignar el bloque a otros pacientes en lista de espera.',
    category: 'consulta'
  },
  {
    question: '¿Qué incluye exactamente el programa de acompañamiento de 3 meses?',
    answer: 'Es nuestro servicio más premium. Incluye: (1) Consulta Inicial de 60 minutos con evaluación clínica, (2) Cuatro sesiones de control y monitoreo quincenales, (3) Acceso a mi chat de WhatsApp directo y prioritario para resolver dudas diarias o evaluar etiquetas en tiempo real de supermercados, (4) Ebook "Alimentación Consciente sin Dietas", (5) Recetarios exclusivos adaptados y (6) Certificado de avance. Es la mejor alternativa para consolidar hábitos duraderos.',
    category: 'programas'
  }
];
