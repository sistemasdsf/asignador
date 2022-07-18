import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HandleAllocationService } from 'src/app/services/handle-allocation.service';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

// Interfaz que define los datos que llegan al modal.
export interface IModalData {
  modelData?: any;
}

// Se crea un formato de fechas
const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MM YYYY',
  },
};

@Component({
  selector: 'app-modal-allocation-manager',
  templateUrl: './modal-allocation-manager.component.html',
  styleUrls: ['./modal-allocation-manager.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ModalAllocationManagerComponent implements OnInit {
  public allocatorForm!: FormGroup;
  public modelData!: any;

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalAllocationManagerComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IModalData,
    private _handleAllocationService: HandleAllocationService,
  ) {
    // Guardamos en modelData los datos enviados al modal.
    this.modelData = this.dialogData.modelData;
  }

  ngOnInit(): void {
    this.allocatorForm = this.allocatorToFormGroup(this.modelData);
  }

  // Función que construye el formgroup para el formulario reactivo
  public allocatorToFormGroup(item: any): FormGroup {
    return this._fb.group({
      date_ini: [item?.FECHA_INI],
      date_end: [item?.FECHA_FIN],
      hour_ini: [item?.HORA_INI, [Validators.required]],
      hour_end: [item?.HORA_FIN, [Validators.required]],
    })
  }

  // Función que se llama cuando se guarda el formulario que recoge los datos modificados
  // y los envía al servicio para actualizar la base de datos a través de la api.
  public submitData() {
    if(this.allocatorForm.invalid) {
      return;
    }
    const modelDataCopy:any = {
      row_id: this.modelData.ROWID,
      fecha_ini: this.allocatorForm.get('date_ini')?.value || null,
      fecha_fin: this.allocatorForm.get('date_end')?.value  || null,
      hora_ini: this.allocatorForm.get('hour_ini')?.value,
      hora_fin: this.allocatorForm.get('hour_end')?.value,
    }
    this._handleAllocationService.updateItem(modelDataCopy).subscribe({
      next: () => {
        this._closeModal(true);
      },
      error: (e) => {
        console.log(e);
        this.dialogRef.close(e);
      }
    })
  }

  private _closeModal(value?: boolean) {
    this.dialogRef.close(value);
  }

}
