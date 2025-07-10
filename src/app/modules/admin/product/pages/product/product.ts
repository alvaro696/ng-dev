import { Component, OnInit, inject } from '@angular/core';
import { Header } from "../../../components/header/header";
import { PaginationComponent } from "../../../components/pagination/pagination.component";
import { ProductService } from '../../services/product-service';
import { MenuOption, PaginatedResponse } from '../../../types/pagination.interface';
import { Product } from '../../types/product.interface';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateProduct } from "../../components/create-product/create-product";
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { EditProduct } from "../../components/edit-product/edit-product";
import { Tag } from 'primeng/tag';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [Header, PaginationComponent, FormsModule, CreateProduct, ConfirmDialog, Toast, EditProduct, Tag, CurrencyPipe],
  templateUrl: './product.html',
  styles: ``,
  providers: [ConfirmationService, MessageService]
})
export class ProductComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  public loading: boolean = false;
  public searchTerm: string = '';
  public currentPage: number = 1;
  public pageSize: number = 10;
  public paginatedProducts: PaginatedResponse<Product> | null = null;
  public openDropdown: number | null = null;
  public modalAdd: boolean = false;
  public modalEdit: boolean = false;

  public menuOptions: MenuOption[] = [
    { label: 'Ver', type: 'action', action: () => console.log('ver') },
    { label: 'Editar', type: 'action', action: () => console.log('editar') },
    { label: 'Eliminar', type: 'action', action: () => console.log('eliminar') }
  ];

  ngOnInit(): void {
    this.productService.refresh.subscribe({
      next: () => this.getPaginated()
    });

    this.getPaginated();

    // Cerrar el dropdown siempre que se haga click fuera del mismo
    document.addEventListener('click', this.closeDropdown.bind(this));
  }

  // Asignar el id al dropdown
  public toggleDropdown(id: number): void {
    this.openDropdown = this.openDropdown === id ? null : id;
  }

  // Cerrar el dropdown
  public closeDropdown(event: Event): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.relative')) {
      this.openDropdown = null;
    }
  }

  // Definir que se va a hacer en las opciones (abrir una ruta o ejecutar una acción)
  public handleMenuAction(option: MenuOption, product: Product): void {
    this.openDropdown = null;

    if (option.type === 'route' && option.route) {
      this.router.navigate([option.route]);
    } else if (option.type === 'action' && option.action) {
      this.executeAction(option.label, product);
    }
  }

  // define la acción a ejecutar si es que corresponde
  public executeAction(label: string, product: Product): void {
    switch (label) {
      case 'Ver':
        console.log('ver');
        break;
      case 'Editar':
        this.onModalEdit(product);
        break;
      case 'Eliminar':
        this.deleteProduct(product);
        break;
      default:
        break;
    }
  }

  private getPaginated(): void {
    this.loading = true;

    this.productService.paginatedProducts(this.currentPage, this.pageSize, true, this.searchTerm).subscribe({
      next: (response) => {
        this.paginatedProducts = response;
        this.loading = false;
      }
    });
  }

  // Recibe el evento del componente hijo (pagination) específicamente la nueva pagina a mostrar
  public onPageChange(page: number): void {
    this.currentPage = page;
    this.getPaginated();
  }

  // Recibe el evento del componente hijo (pagination) específicamente la cantidad de items por pagina
  public onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.getPaginated();
  }

  public onSearchTermChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.currentPage = 1;
    this.getPaginated();
  }

  public deleteProduct(product: Product): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Confirm',
      },
      accept: () => {
        this.productService.deleteProduct(product.id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Info', detail: 'Product deleted successfully' });
          },
        });
      }
    });
  }

  public productSelected: Product | null = null;

  public onModalEdit(product: Product) {
    this.productSelected = product;
    this.modalEdit = true;
  }
}
