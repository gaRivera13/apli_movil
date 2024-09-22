import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {
  usuario: Usuario = new Usuario(); // Inicializa el usuario con un nuevo objeto

  constructor(private router: Router) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      // Recibe el objeto usuario que fue pasado desde la página de pregunta
      this.usuario = navigation.extras.state['usuario'] || new Usuario();
    }
  }
}
