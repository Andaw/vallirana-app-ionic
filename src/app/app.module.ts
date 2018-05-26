import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IncidenciasPage } from '../pages/incidencias/incidencias';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { JugadoresProvider } from '../providers/jugadores/jugadores';
import { ListajugadoresPage } from '../pages/listajugadores/listajugadores';
import { PartidosPage } from '../pages/partidos/partidos';
import { MinutosPage } from '../pages/minutos/minutos';
import { AsistenciaPage } from '../pages/asistencia/asistencia';
import { EquiposProvider } from '../providers/equipos/equipos';
import { VerDatosPage } from '../pages/ver-datos/ver-datos';
@NgModule({
  declarations: [
    MyApp,
    IncidenciasPage,
    LoginPage,
    ListajugadoresPage,
    PartidosPage,
    MinutosPage,
    AsistenciaPage,
    VerDatosPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IncidenciasPage,
    LoginPage,
    ListajugadoresPage,
    PartidosPage,
    MinutosPage,
    AsistenciaPage,
    VerDatosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    JugadoresProvider,
    EquiposProvider
  ]
})
export class AppModule {}