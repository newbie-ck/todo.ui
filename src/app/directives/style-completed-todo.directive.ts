import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appStyleCompletedTodo]',
  standalone: true
})
export class StyleCompletedTodoDirective {
  isCompleted = input(false);
  element = inject(ElementRef);

  stylesEffect = effect(() => {
    if (this.isCompleted()) {
      this.element.nativeElement.style.textDecoration = 'line-through';
      this.element.nativeElement.style.color = '#6c757d';
    } else {
      this.element.nativeElement.style.textDecoration = 'none';
      this.element.nativeElement.style.backgroundColor = '#fff';
      this.element.nativeElement.style.color = '#000';
    }
  });

  constructor() { }
}
