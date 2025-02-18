import { Component, OnInit } from '@angular/core'
import { AbstractButtonComponent } from '../abstract-button.component'

@Component({
  selector: 'app-button-primary',
  templateUrl: './button-primary.component.html',
})
export class ButtonPrimaryComponent
  extends AbstractButtonComponent
  implements OnInit
{
  constructor() {
    super()
  }

  override get classes(): string[] {
    if (this.disabled)
      return [...super.classes, 'cursor-not-allowed', 'opacity-25']

    return [...super.classes, 'hover:bg-primary-dttl-blue-dark']
  }
}
