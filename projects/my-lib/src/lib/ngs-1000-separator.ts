import { AfterViewInit, Directive, ElementRef, HostListener, inject, OnInit } from '@angular/core';

@Directive({
  selector: '[Ngs1000Separator]',
})
export class Ngs1000Separator implements OnInit, AfterViewInit {
  #el = inject(ElementRef<HTMLInputElement>);

  #onChange: any = () => {};
  #onTouched: any = () => {};
  #isProgrammaticUpdate = false;

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    if (this.#isProgrammaticUpdate) return;

    const input = event.target as HTMLInputElement;
    const rawValue = this.#removeSeparators(input.value);
    const formatted = this.#formatNumber(rawValue);

    if (input.value !== formatted) {
      input.value = formatted;
    }

    this.#onChange(rawValue ? parseFloat(rawValue) : null);
  }
  @HostListener('blur')
  onBlur() {
    this.#onTouched();
  }
  #writeValue(value: any): void {
    this.#isProgrammaticUpdate = true;
    const strValue = value != null ? value.toString() : '';

    setTimeout(() => {
      this.#applyFormat(strValue);
      this.#isProgrammaticUpdate = false;
    }, 0);
  }

  registerOnChange(fn: any): void {
    this.#onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.#onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.#el.nativeElement.disabled = isDisabled;
  }

  #applyFormat(value: string) {
    this.#el.nativeElement.value = this.#formatNumber(value);
  }
  #formatNumber(value: string): string {
    if (!value) return '';

    const isNegative = value.startsWith('-');
    if (isNegative) value = value.slice(1);

    const parts = value.split('.');
    const integerPart = parts[0];
    const decimalPart = parts.length > 1 ? '.' + parts[1] : '';

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return (isNegative ? '-' : '') + formattedInteger + decimalPart;
  }

  #removeSeparators(value: string): string {
    return value.replace(/,/g, '');
  }
  ngOnInit(): void {
    if (this.#el.nativeElement.value) {
      this.#applyFormat(this.#el.nativeElement.value);
    }
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const currentVal = this.#el.nativeElement.value;
      if (currentVal && !currentVal.includes(',')) {
        this.#applyFormat(currentVal);
      }
    }, 0);
  }
}
