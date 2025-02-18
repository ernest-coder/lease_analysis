import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-abstract-button',
  template: '',
})
export abstract class AbstractButtonComponent implements OnInit {
  @Input() type: string = 'button'
  @Input() disabled: boolean = false
  @Input() textSize: string = 'text-sm'

  ngOnInit(): void {}

  get classes(): string[] {
    return [this.textSize, 'w-full', 'text-center', 'justify-center']
  }
}
