import { Component, OnInit } from '@angular/core'
import { AbstractButtonComponent } from '../abstract-button.component'

@Component({
  selector: 'app-button-danger-light',
  templateUrl: './button-danger-light.component.html',
})
export class ButtonDangerLightComponent
  extends AbstractButtonComponent
  implements OnInit
{
  constructor() {
    super()
  }
  override get classes(): string[] {
    if (this.disabled)
      return [...super.classes, 'cursor-not-allowed', 'opacity-25']

    return [...super.classes, 'hover:text-red-400']
  }
}
