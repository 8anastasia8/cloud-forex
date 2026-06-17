export type TariffContent = {
  terminals: number;
  bestChoice: boolean;
  features: string[];
  suitableFor: string[];
  highlighted: boolean;
  icon: string;
};

export const TARIFF_CONTENT: TariffContent[] = [
  {
    terminals: 2,
    bestChoice: false,
    features: [
      'Бесперебойный доступ к рынку 24/7',
      'Стабильная ручная торговля',
      'Базовая автоматизация и скрипты',
    ],
    suitableFor: [
      'Личное использование',
      'Микро-счета',
      'Свинг-трейдинг',
      'Начальный уровень',
      'Старт автоматизации',
    ],
    highlighted: false,
    icon: '/terminals/term-2.svg'
  },
  {
    terminals: 3,
    bestChoice: false,
    features: [
      'Диверсификация торговых стратегий',
      'Работа простых роботов и советников',
      'Мониторинг со стандартными индикаторами',
    ],
    suitableFor: [
      'Среднесрочные стратегии',
      'Интрадей-трейдинг',
      'Мультиаккаунтинг',
      'Автоторговля',
      'Контроль рисков',
    ],
    highlighted: false,
    icon: '/terminals/term-3.svg'
  },
  {
    terminals: 4,
    bestChoice: true,
    features: [
      'Мгновенный отклик и исполнение',
      'Комфортный бэктестинг и оптимизация',
      'Работа с продвинутыми индикаторами',
    ],
    suitableFor: [
      'Оптимизация роботов',
      'Тех анализ',
      'Тестирование стратегий',
      'Алгоритмическая торговля',
    ],
    highlighted: false,
    icon: '/terminals/term-4.svg'
  },
  {
    terminals: 6,
    bestChoice: false,
    features: [
      'Профессиональное управление капиталом',
      'Запуск сложных систем и алгоритмов',
      'Обработка больших архивов данных',
    ],
    suitableFor: [
      'Интенсивный трейдинг',
      'Копирование сделок',
      'Увеличенная нагрузка',
    ],
    highlighted: true,
    icon: '/terminals/term-6.svg'
  },
];