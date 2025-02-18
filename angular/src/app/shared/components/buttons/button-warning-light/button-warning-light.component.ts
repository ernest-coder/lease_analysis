import { Component, OnInit } from '@angular/core'
import { AbstractButtonComponent } from '../abstract-button.component'

@Component({
  selector: 'app-button-warning-light',
  templateUrl: './button-warning-light.component.html',
})
export class ButtonWarningLightComponent
  extends AbstractButtonComponent
  implements OnInit
{
  constructor() {
    super()
  }
  override get classes(): string[] {
    if (this.disabled)
      return [...super.classes, 'cursor-not-allowed', 'opacity-25']

    return [...super.classes, 'hover:text-orange-400']
  }
}
