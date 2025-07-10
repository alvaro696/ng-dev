import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styles: ``
})
export class PaginationComponent {
  @Input({ required: true }) currentPage = 1;
  @Input() lastPage = 1;
  @Input() totalCount = 0;
  @Input() pageSize = 10;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  public onPageChange(page: number): void {
    if (page >= 1 && page <= this.lastPage && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  public onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newSize = Number(target.value);
    this.pageSizeChange.emit(newSize);
  }

  public getResultsText(): string {
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.totalCount);
    return `Mostrando ${start} - ${end} de ${this.totalCount} resultados`;
  }
}
