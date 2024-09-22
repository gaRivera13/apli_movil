import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, AnimationController, LoadingController } from '@ionic/angular';
import { Asistencia } from 'src/app/interfaces/asistencia';
import jsQR, { QRCode } from 'jsqr';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-mi-clase',
  templateUrl: './mi-clase.page.html',
  styleUrls: ['./mi-clase.page.scss'],
})
export class MiClasePage implements OnInit {
  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;
  @ViewChild('titulo',{read: ElementRef}) itemTitulo!: ElementRef;
  @ViewChild('page', { read: ElementRef }) page!: ElementRef;
  @ViewChild('itemCuenta', { read: ElementRef }) itemCuenta!: ElementRef;
  @ViewChild('itemNombre', { read: ElementRef }) itemNombre!: ElementRef;
  @ViewChild('itemApellido', { read: ElementRef }) itemApellido!: ElementRef;
  @ViewChild('itemEducacion', { read: ElementRef }) itemEducacion!: ElementRef;
  @ViewChild('itemFechaNacimiento', { read: ElementRef }) itemFechaNacimiento!: ElementRef;

  public usuario: Usuario;
  public asistencia: Asistencia | undefined = undefined;
  public escaneando = false;
  public datosQR: string = '';


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController
  ) {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(activatedRoute, router);
   }

  ngOnInit() {
  }

  public obtenerDatosQR(source?: CanvasImageSource): boolean {
    const w: number = this.video.nativeElement.videoWidth;
    const h: number = this.video.nativeElement.videoHeight;
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;

    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d',{willReadFrequently: true});
    context.drawImage(this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    let qrCode: QRCode | null = jsQR(img.data, img.width, img.height, { inversionAttempts: 'dontInvert'});
    if (qrCode) {
      this.escaneando = false;
      this.datosQR = qrCode.data;
      this.mostrarDatosQROrdenados(this.datosQR);
    }
    return this.datosQR !== '';
  }

  public mostrarDatosQROrdenados(datosQR: string): void{
    this.datosQR = datosQR;
    this.asistencia = JSON.parse(datosQR);
  }

  public async comenzarEscaneoQR(){
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'environment'}
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();
    this.escaneando = true;
    requestAnimationFrame(this.verificarVideo.bind(this));
  }

  async verificarVideo(){
    if ( this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA){
      if(this.obtenerDatosQR() || !this.escaneando) return;
      requestAnimationFrame(this.verificarVideo.bind(this));
    }else{
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public detenerEscaneoQR(): void{
    this.escaneando = false;
  }

  public limpiarDatos(){
    this.escaneando = false;
    this.datosQR = '';
    (document.getElementById('input-file') as HTMLInputElement).value ='';
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

