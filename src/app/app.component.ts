import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs';
import { IModalData, ModalAllocationManagerComponent } from './modal/modal-allocation-manager/modal-allocation-manager.component';
import { HandleAllocationService } from './services/handle-allocation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'asignador_almacen';
  // Nombre de columnas que angular material usa para ordenarlas y colocar los datos en su lugar correcto.
  public displayedColumns: string[] = [
    'process',
    'date_ini',
    'date_end',
    'route',
    'p_type',
    'hour_ini',
    'hour_end',
    'festive',
    'priority',
    'comment',
    'client',
    'actions'
  ];
  public dataSource!: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private _handleAllocationService: HandleAllocationService
  ){}
  
  ngOnInit() {
    // Llamada a la api a través de servicio para obtener los datos
    this._handleAllocationService.getItems().subscribe(data => {
      this.dataSource = new MatTableDataSource<any>(data);
      // Añadimos paginador a los datos de la tabla
      this.dataSource.paginator = this.paginator;
      // Se cambia el filterPredicate para que se pueda filtrar por columna en lugar de filtrar por todos los campos de la tabla
      this.dataSource.filterPredicate = (data: any, filtersJson: string) => {
        const matchFilter: any[] = [];
        const filters = JSON.parse(filtersJson);

        filters.forEach((filter: any) => {
          const val = data[filter.id] === null ? '' : data[filter.id];
          matchFilter.push(val.toString().toLowerCase().includes(filter.value.toLowerCase()));
        });
        return matchFilter.every(Boolean);
      }
    });
  }

  // Filtro por proceso
  applyProcessFilter(filterValue: Event) {
    const tableFilters = [];
    tableFilters.push({
      id: 'PROCESO',
      value: (filterValue.target as HTMLTextAreaElement).value.trim().toLowerCase()
    })
    this.dataSource.filter = JSON.stringify(tableFilters);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Filtro por prioridad
  applyPriorityFilter(filterValue: Event) {
    const tableFilters = [];
    tableFilters.push({
      id: 'PRIORIDAD',
      value: (filterValue.target as HTMLTextAreaElement).value.toString().trim().toLowerCase()
    })
    this.dataSource.filter = JSON.stringify(tableFilters);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Función para abrir modal de edición y recarga la página cuando se cierra
  openAllocatorManagerModal(allocation: any) {
    const dialogRef = this.dialog.open(ModalAllocationManagerComponent, {
      minWidth: '15vW',
      minHeight: '15vH',
      data: {
        modelData: allocation
      } as unknown as IModalData
    });
    dialogRef.afterClosed().pipe(
      filter(data => !!data)
    ).subscribe(data => {
      this.ngOnInit();
    });
  }
}
