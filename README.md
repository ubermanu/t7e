# t7e

A simple translation utility.

## Installation

```bash
npm install t7e
```

## Usage

```javascript
import { t } from 't7e';

t`Hello, world!`; // Hello, world!
```

## API

### t

Translates a string in the defined locale, using a template literal.

```text
msgid "Hello!"
msgstr "Salut!"
```

```javascript
import { t } from 't7e';

t`Hello!`; // Salut!
```

Supports placeholders, if defined in the translation:

```text
msgid "Hello, %s!"
msgstr "Salut, %s!"
```

```javascript
import { t } from 't7e';

const name = 'John';
t`Hello, ${name}!`; // Salut, John!
```

Supports pluralization:

```text
msgid "You have %d new message."
msgid_plural "You have %d new messages."
msgstr[0] "Vous avez %d nouveau message."
msgstr[1] "Vous avez %d nouveaux messages."
```

```javascript
import { t } from 't7e';

t`You have ${1} new message.`; // Vous avez 1 nouveau message.
t`You have ${877} new message.`; // Vous avez 877 nouveaux messages.
```

### getLocale

Returns the current locale. Defaults to `en`.

```javascript
import { getLocale } from 't7e';

getLocale(); // en
```

### setLocale

Sets the current locale in the ISO 639-1 format.

```javascript
import { setLocale } from 't7e';

setLocale('fr');
```
