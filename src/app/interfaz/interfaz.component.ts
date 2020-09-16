import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-interfaz',
  templateUrl: './interfaz.component.html',
  styleUrls: ['./interfaz.component.css']
})

export class InterfazComponent implements OnInit {

  @Input() chartData: any;



 obj;

  //prueba
  jqlOutput: string;

  constructor() { }

  ngOnInit(): void {
  }

  onEjecutar(){
    alert ("hola");
  }

  setEditorContent(event) {
    // console.log(event, typeof event);
    console.log(this.obj);
  }


// koala


jsonInput: string = "";

isFailured: boolean;
autoResize = true;
errorMessage: string;
msgBtnGraph = 'Expandir';
msgBtnEditor = 'Expandir';
showGraph = true;
showEditor = true;
line = 'line';
bar = 'bar';



public graphJson() {
  try {
    /* this.chartrRequest = {
      urlRequest: null,
      jsonRequest: JSON.parse(this.jsonInput),
      type: 'grafica'
    }; */
   // this.dataSource.next(this.chartrRequest);
    this.isFailured = false;
  } catch (error) {
    this.errorMessage = error;
    this.isFailured = true;
  }
}

public expandGraph() {
  if (!this.showEditor) {
    this.showGraph = false;
  }
  this.showEditor = !this.showEditor;
  setTimeout(() => {
    this.msgBtnGraph  = this.msgShowBtn(this.showEditor);
    if (this.showEditor) {
      this.showGraph = true;
    }
  }, 250);
}

public expandEditor() {
  this.showGraph = !this.showGraph;
  setTimeout(() => {
    this.msgBtnEditor  = this.msgShowBtn(this.showGraph);
  }, 250);
}

public msgShowBtn(isShowed: boolean) {
  if (isShowed) { return 'Expandir'; }
  return 'Cerrar';
}

public downloadJsonTemplate() {
  //this.sharedData.downloadJsonTemplate(this.jsonInput);
}
}

