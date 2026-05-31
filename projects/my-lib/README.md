# ngs-1000-separator

An Angular directive that automatically formats numeric input fields with thousand separators as the user types — no pipe, no extra component, just add the attribute.

```
1000000  →  1,000,000
9999.99  →  9,999.99
-5000    →  -5,000
```

---

## Installation

```bash
npm install @sinasiri/ngs-1000-separator
```

---

## Requirements

| Package | Version |
|---|---|
| `@angular/core` | >= 17.0.0 |
| `@angular/common` | >= 17.0.0 |

---

## Setup

Import the directive into your standalone component or module:

```typescript
// standalone component
import { Ngs1000Separator } from '@sinasiri/ngs-1000-separator';

@Component({
  imports: [Ngs1000Separator],
  template: `<input Ngs1000Separator type="text" />`
})
export class MyComponent {}
```

```typescript
// NgModule
import { Ngs1000Separator } from '@sinasiri/ngs-1000-separator';

@NgModule({
  imports: [Ngs1000Separator]
})
export class MyModule {}
```

---

## Usage

### Basic input

```html
<input Ngs1000Separator type="text" />
```

The directive formats the value on every keystroke. The user sees `1,000,000` but your model receives the raw number `1000000`.

---

### With Reactive Forms

```typescript
form = new FormGroup({
  amount: new FormControl(null)
});
```

```html
<input Ngs1000Separator type="text" [formControl]="form.controls.amount" />
```

The value stored in the form control is always the **raw numeric value** — the formatted display is only visual.

---

### With Template-Driven Forms

```html
<input Ngs1000Separator type="text" [(ngModel)]="amount" />
```

---

### With an initial value

The directive formats pre-filled values on init:

```typescript
form = new FormGroup({
  salary: new FormControl(75000)  // renders as 75,000
});
```

---

### Negative numbers

Negative values are fully supported:

```
-1500  →  -1,500
```

---

### Decimal values

Decimals are preserved exactly as typed:

```
9999.99  →  9,999.99
```

---

## Behaviour

| Scenario | Behaviour |
|---|---|
| User types `1000000` | Displays `1,000,000` |
| Form control receives `75000` | Displays `75,000` |
| User types `-5000` | Displays `-5,000` |
| User types `9999.99` | Displays `9,999.99` |
| Field is empty | No formatting applied |
| Field is disabled | Respects disabled state |

The model / form control value is always the **raw number** (e.g. `1000000`), never the formatted string.

---

## API

### Selector

```
[Ngs1000Separator]
```

Apply as an attribute on any `<input>` element.

### ControlValueAccessor

The directive implements `ControlValueAccessor`, so it works seamlessly with both Reactive Forms and Template-Driven Forms without any extra configuration.

---

## Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

```bash
# clone the repo
git clone https://github.com/sinasiri/ngs-1000-separator.git
cd ngs-1000-separator

# install dependencies
npm install

# build the library
ng build ngs-1000-separator

# serve the demo app
ng serve ngs-1000-separator-demo
```

---

## License

[MIT](LICENSE)