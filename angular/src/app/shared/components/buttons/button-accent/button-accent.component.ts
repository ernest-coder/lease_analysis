import { Component, OnInit } from '@angular/core'
import {AbstractButtonComponent} from "../abstract-button.component";

@Component({
  selector: 'app-button-accent',
  templateUrl: './button-accent.component.html',
})
export class ButtonAccentComponent
  extends AbstractButtonComponent
  implements OnInit
{
  constructor() {
    super()
  }

  override get classes(): string[] {
    if (this.disabled)
      return [...super.classes, 'cursor-not-allowed', 'opacity-25']

    return [...super.classes, 'hover:bg-gray-100']
  }
}
