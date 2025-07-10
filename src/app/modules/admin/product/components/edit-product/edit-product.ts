import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { ProductService } from '../../services/product-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Product } from '../../types/product.interface';

@Component({
  selector: 'app-edit-product',
  imports: [Dialog, Select, InputTextModule, ButtonModule, ToggleSwitch, ReactiveFormsModule, Toast],
  templateUrl: './edit-product.html',
  styles: ``,
  providers: [MessageService]
})
export class EditProduct {
  @Input() visible: boolean = false;
  @Input({ required: true }) product: Product | null = null;

  @Output() visibleChange = new EventEmitter<boolean>();

  private productService = inject(ProductService);
  private messageService = inject(MessageService);

  public categories: any[] = [];
  public loading: boolean = false;
  public imageFile: File | null = null;
  public imageFileError: boolean = false;

  public formGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    categoryId: new FormControl<number>(0, [Validators.required]),
    quantityPerUnit: new FormControl<number>(1, [Validators.required, Validators.min(1)]),
    unitPrice: new FormControl<number>(0, [Validators.required, Validators.min(0.01)]),
    unitsInStock: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    discontinued: new FormControl<boolean>(false),
    image: new FormControl(),
  });

  public closeModal(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && changes['visible'].currentValue && this.product) {
      this.productService.getCategoryProducts().subscribe({
        next: (response: any) => this.categories = response
      });

      this.formGroup.patchValue({
        name: this.product.name,
        categoryId: this.product.categoryId,
        quantityPerUnit: this.product.quantityPerUnit,
        unitPrice: this.product.unitPrice,
        unitsInStock: this.product.unitsInStock,
        discontinued: this.product.discontinued
      });
    }
  }

  public updateProduct(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.loading = true;

    const formData = new FormData();

    formData.append('name', this.formGroup.value.name || '');
    formData.append('categoryId', String(this.formGroup.value.categoryId) || '0');
    formData.append('quantityPerUnit', String(this.formGroup.value.quantityPerUnit) || '0');
    formData.append('unitPrice', String(this.formGroup.value.unitPrice) || '0');
    formData.append('unitsInStock', String(this.formGroup.value.unitsInStock) || '0');
    formData.append('discontinued', String(this.formGroup.value.discontinued));

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    this.productService.updateProduct(this.product!.id, formData).subscribe({
      next: () => {
        this.loading = false;
        this.closeModal();
        this.formGroup.reset({});
      },
      error: (exception: any) => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: exception.error.message });
      }
    });
  }

  public onFileSelected(event: Event): void {
    const inputEvent = event.target as HTMLInputElement;

    if (inputEvent.files && inputEvent.files.length > 0) {
      const file: File = inputEvent.files[0];

      if (!file.type.includes('image/') || file.size > 2 * 1024 * 1024) {
        this.imageFileError = true;
        this.imageFile = null;
        inputEvent.value = '';
        this.formGroup.patchValue({ image: null });
      } else {
        this.imageFileError = false;
        this.imageFile = file;
      }
    }

    return;
  }
}
