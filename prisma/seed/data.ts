export type SeedData = {
  profile: {
    name: string;
    headline?: string;
    description: string;
  };
  links: { name: string; url: string }[];
  skills: string[];
  experiences: {
    company: string;
    position: string;
    location?: string;
    description?: string;
    startDate: string;
    endDate?: string;
    achievements: string[];
  }[];
  projects: {
    name: string;
    url?: string;
    description?: string;
    skills: string[];
  }[];
};

export const seedData = {
  profile: {
    name: 'Долгов Никита',
    headline: 'JavaScript разработчик',
    description: 'Разрабатываю сервисы на TypeScript и NestJs и не только',
  },

  links: [
    { name: 'GitHub', url: 'https://github.com/ninq4' },
    { name: 'Telegram', url: 'https://t.me/ninq4' },
  ],

  skills: [
    'TypeScript',
    'Node.js',
    'NestJS',
    'PostgreSQL',
    'Prisma',
    'TypeORM',
    'GraphQL',
    'RabbitMQ',
    'Kafka',
    'CQRS',
    'Docker',
    'React',
    'Next.js',
    'React Native',
    'Expo',
    'MobX',
    'Zustand',
    'React Query',
    'Reanimated',
    'Vue 3',
    'Nuxt.js',
    'Pinia',
  ],

  experiences: [
    {
      company: 'RPGreal',
      position: 'Мобильный разработчик (React Native)',
      startDate: '2026-06-01',
      endDate: '2026-10-15',
      description:
        'Разработка кроссплатформенного мобильного приложения для iOS и Android на React Native и Expo: авторизация через Google и Apple, подписка через RevenueCat, push- и локальные уведомления, виджеты, анимации и жесты, офлайн-режим. Настройка сборок EAS, OTA-обновлений и публикация релизов в App Store и Google Play.',
      achievements: [
        'Вывел приложение в production в App Store и Google Play',
        'Запустил монетизацию через ежемесячную подписку RPGreal PRO',
        'Настроил OTA-обновления: исправления доходят до пользователей без повторного прохождения ревью в сторах',
        'Автоматизировал релизный цикл: сборка и отправка в App Store выполняются одной командой',
        'Провёл аудит цен подписки по регионам (USD, EUR, KZT) с учётом НДС и комиссий сторов, подтвердил, что текущие цены обеспечивают целевую выручку с каждой продажи',
        'Выстроил контроль качества: автоматический линтинг и форматирование при каждом коммите, мониторинг падений в production через Sentry',
      ],
    },
    {
      company: 'YBRU',
      position: 'Fullstack-разработчик / Тимлид',
      startDate: '2023-04-01',
      endDate: '2026-04-01',
      description:
        'FoodTech-компания: разработка и продажа агрегатора ресторанов, аутстаффинг разработчиков. Запустил продукт с нуля: white-label платформу, позволяющую ресторанам получить собственное мобильное приложение, сайт, Telegram и VK mini app, а также бэкофис для управления ими.',
      achievements: [
        'Стартовал продукт с нуля: спроектировал архитектуру фронтенда и мобильного приложения, участвовал в создании макетов вместе с дизайнером и в подготовке API-спецификации с бэкенд-разработчиком',
        'Выстроил процессы разработки в команде: код-ревью, планирование, декомпозиция и распределение задач, стандарты кода (FSD, линтинг)',
        'Разработал MVP продукта: мобильное приложение на React Native, сайт на Next.js (SSR/SSG), модули для работы в режиме Telegram mini app и VK mini app с динамическими темами из бэкофиса',
        'Разработал бэкофис для управления продуктом: создание и сборка мобильных и веб-приложений, витрины, категории, товары, темы оформления',
        'Разработал backend-сервисы на NestJS: сервис автоматизации сборок мобильных приложений и сервис управления доменами сайтов',
        'Выполнял роль тимлида: онбординг новых сотрудников, код-ревью, планирование спринтов, демонстрации результатов бизнесу. Команда выросла с 5 до 7 человек (3 фронтенда, 2 бэкенда, дизайнер, PM)',
      ],
    },
  ],

  projects: [
    {
      name: 'Цифровая визитка',
      description:
        'GraphQL API с профилем, опытом, навыками и проектами. Загрузка вложенных данных без N+1, автоматическая подготовка и заполнение БД при запуске.',
      skills: [
        'TypeScript',
        'NestJS',
        'GraphQL',
        'Prisma',
        'PostgreSQL',
        'Docker',
      ],
    },
    {
      name: 'Сервис сборки мобильных приложений',
      description:
        'Автоматизация сборок React Native-приложений. Система очередей и асинхронной обработки задач, архитектура с разделением контроллера и раннеров.',
      skills: ['NestJS', 'CQRS', 'RabbitMQ', 'TypeORM', 'Docker'],
    },
    {
      name: 'Сервис управления доменами',
      description:
        'Интеграция с Cloudflare API: автоматическая регистрация и парковка доменов под сайты клиентов, обеспечение стабильной доступности приложений для пользователей.',
      skills: ['NestJS', 'CQRS', 'RabbitMQ', 'TypeORM'],
    },
    {
      name: 'Backend для контентной платформы',
      description:
        'API для работы со статьями. CQRS-архитектура, интеграция с Kafka.',
      skills: ['NestJS', 'Kafka', 'CQRS', 'Prisma'],
      url: 'https://uznay.ru/',
    },
    {
      name: 'RPGreal',
      description:
        'Мобильное приложение для iOS и Android с подпиской, push-уведомлениями, виджетами и OTA-обновлениями.',
      skills: ['TypeScript', 'React Native', 'Expo', 'Zustand', 'Reanimated'],
      url: 'https://rpgreal.org/',
    },
    {
      name: 'Мультиплатформенное приложение для ресторанов',
      description:
        'Кроссплатформенное приложение для iOS, Android и Web с единой кодовой базой. Сложные UI, анимации и жестовые взаимодействия, пользовательские сценарии в реальном времени.',
      skills: ['React Native', 'Expo', 'Reanimated', 'React Query', 'MobX'],
    },
    {
      name: 'Веб-платформа для ресторанов',
      description:
        'SSR/SSG-сайт с упором на SEO и производительность. Оптимизация загрузки и клиентского взаимодействия.',
      skills: ['Next.js', 'React Query', 'MobX'],
      url: 'https://ybru.menu/',
    },
    {
      name: 'Backoffice для сайта и мобильного приложения',
      description:
        'Управление темами оформления для мобильного и веб-приложения. Создание веб-, мобильных, Telegram- и VK-приложений из единого интерфейса. Управление витринами, категориями и товарами.',
      skills: ['React', 'MobX', 'React Query'],
      url: 'https://ybru.menu/',
    },
    {
      name: 'CRM для государственной корпорации',
      description:
        'Масштабируемая CRM-система с большим объёмом бизнес-логики. Работа с серверным состоянием, кешированием и синхронизацией данных, участие в проектировании архитектуры.',
      skills: ['React', 'MobX', 'React Query'],
    },
    {
      name: 'CRM для управления съёмочными процессами',
      description:
        'Управление съёмками, расписаниями и ресурсами в TV production. Сложные интерфейсы для координации команд, работа с динамическими данными и частыми обновлениями.',
      skills: ['React', 'MobX', 'React Query'],
    },
    {
      name: 'QR-меню с чатами',
      description:
        'Мобильное приложение с QR-доступом к меню и встроенными чатами. WebSocket-коммуникация между гостями и персоналом, стабильная работа real-time функциональности при нестабильном соединении.',
      skills: ['React Native', 'Expo', 'Reanimated', 'React Query', 'MobX'],
      url: 'https://stable.omgapp.ru/',
    },
    {
      name: 'CMS и редактор статей',
      description:
        'Система управления контентом для информационного портала с удобным интерфейсом для редакторов.',
      skills: ['Nuxt.js', 'Vue 3', 'Pinia'],
      url: 'https://uznay.ru/admin',
    },
  ],
} satisfies SeedData;
