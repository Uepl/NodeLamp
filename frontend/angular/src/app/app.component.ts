import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudService } from './crud.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular';
  
  postData: any = {
    name: "eldritch blast",
    range: "120"
  };

  cantripToDelete: string = 'eldritch blast';

  constructor(private crud:CrudService){}  
  getItems(){
    this.crud.getAll().subscribe((data) => {
      console.log(data);
    });
  }
  sendData(){
    this.crud.postData(this.postData).subscribe((response) => {
      console.log(response);
    });
  }
  deleteData(){
    this.crud.deleteData(this.cantripToDelete).subscribe((response) => {
      console.log(response);
    });
  }
}
