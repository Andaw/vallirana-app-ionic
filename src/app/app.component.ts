import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, MenuController/*, Alert */} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';
import { IncidenciasPage } from '../pages/incidencias/incidencias';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { PartidosPage } from '../pages/partidos/partidos';
import { MinutosPage } from '../pages/minutos/minutos';
import { AsistenciaPage } from '../pages/asistencia/asistencia';
import { JugadoresProvider } from '../providers/jugadores/jugadores';
import { EquiposProvider } from '../providers/equipos/equipos';
import { VerDatosPage } from '../pages/ver-datos/ver-datos';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage; // pagina principal
  public categoria:string;
  pages: Array<{icon:string, title: string, component: any}>;

  config: any; // almacena la confifuracion de firebase

  constructor(private alertCtrl: AlertController, 
              public menuCtrl: MenuController, 
              public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen) 
  {
    this.initializeApp();
    
    this.config = {
      apiKey: "AIzaSyD1GKHefLf-X6wZtqF9gnlMsSPWnzMKJ7U",
      authDomain: "pbvallirana-8648d.firebaseapp.com",
      databaseURL: "https://pbvallirana-8648d.firebaseio.com/",
      projectId: "pbvallirana-8648d",
      storageBucket: "pbvallirana-8648d.appspot.com",
      messagingSenderId: "494529543842"
    };
    // used for an example of ngFor and navigation
    this.pages = [
      { icon: "football",title: 'Partidos', component: PartidosPage },
      { icon: "contacts", title: 'Asistencia', component: AsistenciaPage },
      { icon: "timer", title: 'Minutos', component: MinutosPage },
      { icon: "warning", title: 'Incidencias', component: IncidenciasPage },
      { icon: "eye", title: 'Ver datos', component: VerDatosPage }
    ];
    /*console.log('ionViewDidLoad ListajugadoresPage');
    firebase.database().ref('/InfantilA/Jugadores').on('value', (snapshot) => {
      console.log(snapshot.val());
      this.jugadores = snapshot.val();
    });
    this.ComprobacionAlert = this.alertCtrl.create({
      title: 'Comprobando sesion',
      subTitle: 'Estamos comprobando si hay alguna sesion iniciada en este dispositivo. Por favor espere.'
    });
    */
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // inicializamos el firebase con su configuracion
      firebase.initializeApp(this.config);
      // llamamos al listener de la autenticacion
      // para comprobar si el usuario esta logueado o no
      //this.ComprobacionAlert.present();
      AuthProvider.onAuthChanged(() => {
        if (AuthProvider.isLogged) {
          // cortamos en trozos el email a partir de '@'
          let email: Array<string> = AuthProvider.currentUser.email.split('@');
          // pasamos el primer y ultimo caracter a mayuscula
          this.categoria = email[0].substring(0, 1).toUpperCase() + email[0].substring(1, email[0].length - 1) + email[0].substring(email[0].length -1 ).toUpperCase();
          // y lo guardamos en la propiedad estatica categoria de JugadoresProvider
          JugadoresProvider.categoria = this.categoria;
          // cargamos equipos
          EquiposProvider.fetch();
          // cargamos los jugadores de la cuenta que ha iniciado sesion
          JugadoresProvider.fetch();
          // si se ha logueado cambiamos la pagina a la pagina principal
          this.nav.setRoot(PartidosPage);
        }
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  signOut() {
    let alert = this.alertCtrl.create({
      title: 'Cerrar sesion',
      message: '¿Estas seguro de cerrar sesion?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Cerrar sesion',
          role: 'destructive', // color rojo en iOS
          handler: () => {
            AuthProvider.logout();
            this.menuCtrl.close();
            this.nav.setRoot(this.rootPage);
          }
        }
      ]
    });
    alert.present();
  }
}
