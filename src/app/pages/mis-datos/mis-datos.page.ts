import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-mis-datos',
  templateUrl: 'mis-datos.page.html',
  styleUrls: ['mis-datos.page.scss'],
})
export class MisDatosPage implements AfterViewInit {
  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('page', { read: ElementRef }) page!: ElementRef;
  @ViewChild('itemCuenta', { read: ElementRef }) itemCuenta!: ElementRef;
  @ViewChild('itemNombre', { read: ElementRef }) itemNombre!: ElementRef;
  @ViewChild('itemApellido', { read: ElementRef }) itemApellido!: ElementRef;
  @ViewChild('itemEducacion', { read: ElementRef }) itemEducacion!: ElementRef;
  @ViewChild('itemCorreo', { read: ElementRef }) itemCorreo!: ElementRef;
  @ViewChild('itemPreguntaSecreta', { read: ElementRef }) itemPreguntaSecreta!: ElementRef;
  @ViewChild('itemRespuestaSecreta', { read: ElementRef }) itemRespuestaSecreta!: ElementRef;
  @ViewChild('itemFechaNacimiento', { read: ElementRef }) itemFechaNacimiento!: ElementRef;
  @ViewChild('itemContraseña', { read: ElementRef }) itemContraseña!: ElementRef;
  @ViewChild('itemRepetirContraseña', { read: ElementRef }) itemRepetirContraseña!: ElementRef;

  public listaNivelesEducacionales = NivelEducacional.getNivelesEducacionales();
  public usuario: Usuario;

  constructor(
    private alertController: AlertController, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private animationController: AnimationController)
    {
      this.usuario = new Usuario();
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
    
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.usuario = navigation.extras.state['usuario'];
    }
  }

  public ngAfterViewInit(): void {
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(6000)
        .fromTo('transform', 'translate(0%)', 'translate(100%)')
        .fromTo('opacity', 0.2, 1);
      animation.play();
    }
  }

  public limpiar1(): void {
    this.usuario.cuenta = '';
    this.usuario.nombre = '';
    this.usuario.apellido = '';
    this.usuario.correo = '';
    this.usuario.preguntaSecreta = '';
    this.usuario.respuestaSecreta = '';
    this.usuario.nivelEducacional = NivelEducacional.buscarNivelEducacional(1)!;
    this.usuario.fechaNacimiento = undefined;
    this.usuario.password = '';
    
    this.animateItem1(this.itemCuenta.nativeElement, 800);
    this.animateItem1(this.itemNombre.nativeElement, 1100);
    this.animateItem1(this.itemApellido.nativeElement, 1400);
    this.animateItem1(this.itemCorreo.nativeElement, 1700);
    this.animateItem1(this.itemEducacion.nativeElement, 2000);
    this.animateItem1(this.itemPreguntaSecreta.nativeElement, 2300);
    this.animateItem1(this.itemRespuestaSecreta.nativeElement, 2600);
    this.animateItem1(this.itemFechaNacimiento.nativeElement, 2900);
    this.animateItem1(this.itemContraseña.nativeElement, 3200);
    this.animateItem1(this.itemRepetirContraseña.nativeElement, 3500);
  }

  public limpiar2(): void {
    this.limpiar1(); // Similar funcionalidad, puedes ajustar si es necesario
  }

  public animateItem1(elementRef: any, duration: number) {
    this.animationController
      .create()
      .addElement(elementRef)
      .iterations(1)
      .duration(duration)
      .fromTo('transform', 'translate(100%)', 'translate(0%)')
      .play();
  }

  public animateItem2(elementRef: any, duration: number) {
    this.animationController
      .create()
      .addElement(elementRef)
      .iterations(1)
      .duration(duration)
      .fromTo('transform', 'rotate(0deg)', 'rotate(360deg)')
      .play();
  }

  createPageTurnAnimation() {
    this.animationController
      .create()
      .addElement(this.page.nativeElement)
      .iterations(1)
      .duration(1000)
      .fromTo('transform', 'rotateY(0deg)', 'rotateY(-180deg)')
      .duration(1000)
      .fromTo('transform', 'rotateY(-180deg)', 'rotateY(0deg)')
      .play();
  }

  public mostrarDatosPersona(): void{
    if (this.usuario.cuenta.trim() === ''){
      this.presentAlert('Datos personales', 'Para mostrar los datos de la persona, '
        + 'al menos debe tener un valor para el nombre o el apellido.');
        return;
    }

    if (this.usuario.nombre.trim() === ''&& this.usuario.apellido === ''){
      this.presentAlert ('Datos personales', 'Para mostrar los datos de la persona, '
        + 'al menos debe tener un valor para el nombre o el apellido.');
        return;
    }

    let mensaje = `
      <small>
        <br><b>Cuenta:</b> ${this.usuario.cuenta}
        <br><b>Usuario:</b> ${this.usuario.correo}
        <br><b>Nombre:</b> ${this.usuario.nombre}
        <br><b>Apellido:</b> ${this.usuario.apellido}
        <br><b>Educación:</b> ${this.usuario.nivelEducacional.getEducacion()}
        <br><b>Nacimiento:</b> ${this.formatDateDDMMYYYY(this.usuario.fechaNacimiento)}
        
      </small>
    `;
    this.presentAlert('Datos personales', mensaje);
  }

  public async presentAlert(titulo: string, mensaje: string){
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  public formatDateDDMMYYYY(date: Date | undefined): string {
    if (!date) return 'No asignada';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  public actualizarDatos() {
    console.log('Datos actualizados:', this.usuario);
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