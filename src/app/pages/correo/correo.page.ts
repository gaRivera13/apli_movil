import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss']
})
export class CorreoPage {
  correo: string = ''; // Variable para almacenar el correo
  invalidCorreo: boolean = false; // Variable para manejar el correo inválido

  constructor(private router: Router) { }

  public recuperarContrasena(): void {
    const usuario = new Usuario();
    const usuarioEncontrado = usuario.buscarUsuarioPorCorreo(this.correo);
    if (!usuarioEncontrado) {
      this.invalidCorreo = true;
    }else{
      const navigationExtras: NavigationExtras ={
        state:{
          usuario: usuarioEncontrado
        }
      };
      this.router.navigate(['/pregunta'], navigationExtras);
    }
  }
  validarCorreo(correo: string): boolean {
    // Obtener la lista de usuarios y buscar si el correo existe
    const usuarios: Usuario[] = Usuario.getListaUsuarios();
    const foundUser = usuarios.find(user => user.correo === correo);
    return foundUser !== undefined; // Retorna true si el correo existe
  }
}
