import { Component, DestroyRef, inject, OnInit, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-filter-search',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatIcon,
    MatInput,
    MatPrefix,
    ReactiveFormsModule
  ],
  templateUrl: './filter-search.component.html',
  styleUrl: './filter-search.component.scss'
})
export class FilterSearchComponent implements OnInit {

  form = new FormControl('');

  filterChanged = output<string | null>();

  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.form.valueChanges
      .pipe(
        debounceTime(600),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(value => { this.filterChanged.emit(value); });
  }

}
