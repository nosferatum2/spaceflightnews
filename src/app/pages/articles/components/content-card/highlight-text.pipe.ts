import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlightText',
  standalone: true,
  pure: false
})
export class HighlightTextPipe implements PipeTransform {

  private sanitizer = inject(DomSanitizer);

  transform(text: string, search: string | null): string | SafeHtml {
    if (!search) {
      return text;
    }

    const re = new RegExp(search, 'gi');
    const match = text.match(re);

    if (!match) {
      return text;
    }

    const replaceValue = text.replace(
      re,
      `<span style="background-color: #FFF619A1">$&</span>`
    );

    return this.sanitizer.bypassSecurityTrustHtml(replaceValue);
  }

}
