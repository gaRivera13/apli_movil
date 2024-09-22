import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

  usuario: Usuario = new Usuario();
  respuestaUsuario: string = '';
  respuestaIncorrecta: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    // Obtén el usuario de la navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.usuario = navigation.extras.state['usuario'] || new Usuario();
    }
  }

  verificarRespuesta() {
    if (this.respuestaUsuario === this.usuario.respuestaSecreta) {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: this.usuario // Enviar todo el objeto usuario
        }
      };
      this.router.navigate(['/correcto'], navigationExtras); // Redirige a la vista correcta
    } else {
      this.router.navigate(['/incorrecto']); // Redirige a la vista incorrecta
    }
  }
}
