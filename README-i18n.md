# Система интернационализации (i18n)

Этот проект теперь поддерживает русский и английский языки с возможностью переключения между ними.

## Структура файлов

- `lib/i18n.ts` - Основной файл с переводами и утилитами
- `hooks/use-language.ts` - Хук для управления языком
- `components/language-switcher.tsx` - Компонент переключения языка

## Как использовать

### 1. Добавление новых переводов

Откройте файл `lib/i18n.ts` и добавьте новые ключи в объекты `translations.en` и `translations.ru`:

```typescript
export const translations = {
  en: {
    // ... существующие переводы
    newKey: 'English text',
  },
  ru: {
    // ... существующие переводы
    newKey: 'Русский текст',
  }
}
```

### 2. Использование переводов в компонентах

```typescript
import { useLanguage } from "@/hooks/use-language"
import { useTranslations } from "@/lib/i18n"

export function MyComponent() {
  const { locale } = useLanguage()
  const t = useTranslations(locale)

  return (
    <div>
      <h1>{t('heroTitle')}</h1>
      <p>{t('heroSubtitle')}</p>
    </div>
  )
}
```

### 3. Добавление переключателя языка

```typescript
import { LanguageSwitcher } from "@/components/language-switcher"

export function Header() {
  return (
    <header>
      {/* ... другие элементы */}
      <LanguageSwitcher />
    </header>
  )
}
```

## Функциональность

- **Автоматическое сохранение**: Выбранный язык сохраняется в localStorage
- **Переключение в реальном времени**: Все тексты обновляются мгновенно
- **Флаги стран**: Визуальные индикаторы для каждого языка
- **Адаптивность**: Работает на мобильных и десктопных устройствах

## Поддерживаемые языки

- 🇺🇸 English (en)
- 🇷🇺 Русский (ru)

## Тестирование

Для тестирования функциональности перейдите на страницу `/test-i18n` в браузере.

## Добавление новых языков

1. Добавьте новый код языка в `lib/i18n.ts`:
```typescript
export type Locale = 'en' | 'ru' | 'es' // добавьте новый язык

export const locales: Locale[] = ['en', 'ru', 'es']

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
  es: 'Español' // добавьте название
}

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  ru: '🇷🇺',
  es: '🇪🇸' // добавьте флаг
}
```

2. Добавьте переводы в объект `translations`:
```typescript
export const translations = {
  en: { /* ... */ },
  ru: { /* ... */ },
  es: { /* ... */ } // добавьте переводы
}
``` 