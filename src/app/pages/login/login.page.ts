import { Component } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  public usuario: Usuario;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController) 
    {
      this.usuario = new Usuario();
      this.usuario.recibirUsuario(activatedRoute,router);
      this.usuario.cuenta = 'atorres';
    this.usuario.password = '1234';
  }

  // public ngOnInit(): void {
  //   //if (this.usuario.correo !== '') this.ingresar();
  // }

  ingresar() {
    const error = this.usuario.validarUsuario();
    if (error) {
      this.mostrarMensajeEmergente(error);
      return;
    }
    this.mostrarMensajeEmergente('Bienvenido');
    this.usuario.navegarEnviandoUsuario(this.router, '/inicio');
  }


  // public validarUsuario(usuario: Usuario): boolean {
  //   const mensajeError = usuario.validarUsuario();
  //   if (mensajeError) {
  //     this.mostrarMensaje(mensajeError);
  //     return false
  //   }
  //   return true;
  // }

  async mostrarMensajeEmergente(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }

  public ingresarPaginaValidarCorreo(): void{
    this.router.navigate(['/correo']);
  }

}
