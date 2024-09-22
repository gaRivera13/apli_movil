import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { AlertController, AnimationController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Persona } from 'src/app/model/persona';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements AfterViewInit{
  @ViewChild('titulo',{read: ElementRef}) itemTitulo!: ElementRef;
  @ViewChild('page', { read: ElementRef }) page!: ElementRef;
  @ViewChild('itemCuenta', { read: ElementRef }) itemCuenta!: ElementRef;
  @ViewChild('itemNombre', { read: ElementRef }) itemNombre!: ElementRef;
  @ViewChild('itemApellido', { read: ElementRef }) itemApellido!: ElementRef;
  @ViewChild('itemEducacion', { read: ElementRef }) itemEducacion!: ElementRef;
  @ViewChild('itemFechaNacimiento', { read: ElementRef }) itemFechaNacimiento!: ElementRef;

  public listaNivelesEducacionales = NivelEducacional.getNivelesEducacionales();
  public usuario: Usuario;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController
  ) 
  {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
  }

  public ngAfterViewInit(): void {
    if (this.itemTitulo) {
      const animation = this.animationController
      .create()
      .addElement(this.itemTitulo.nativeElement)
      .iterations(Infinity)
      .duration(6000)
      .fromTo('transform', 'translate(0%)', 'translate(100%)')
      .fromTo('opacity', 5, 0.1);
      animation.play();
    }
  }

  public async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
  public cerrarSesion() {
    // Lógica para cerrar sesión (puedes incluir limpieza de datos si es necesario)
    console.log('Sesión cerrada');
  
    // Redirigir al usuario a la página de login
    this.router.navigate(['/login']);
  }
  
  public cambiarVista(selectedValue: string) {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: this.usuario
        }
      };

    if (selectedValue === 'inicio') {
      this.router.navigate(['/inicio'], navigationExtras); // Navegar a la página Inicio
    } else if (selectedValue === 'miClase') {
      this.router.navigate(['/mi-clase'], navigationExtras); // Navegar a la página Mi Clase
    } else if (selectedValue === 'misDatos') {
      this.router.navigate(['/mis-datos'], navigationExtras); // Navegar a Mis Datos
    }
  }
}

 
