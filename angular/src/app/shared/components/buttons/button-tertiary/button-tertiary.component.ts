import { Component, OnInit } from '@angular/core'
import { AbstractButtonComponent } from '../abstract-button.component'

@Component({
  selector: 'app-button-tertiary',
  templateUrl: './button-tertiary.component.html',
})
export class ButtonTertiaryComponent
  extends AbstractButtonComponent
  implements OnInit
{
  constructor() {
    super()
  }
  override get classes(): string[] {
    if (this.disabled)
      return [...super.classes, 'cursor-not-allowed', 'opacity-25']

    return [...super.classes, 'hover:text-gray-600']
  }
}
