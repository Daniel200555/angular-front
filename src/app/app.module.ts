import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VideoComponent } from './video/video.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageComponent } from './image/image.component';
import { AboutComponent } from './about/about.component';
import { CompressComponent } from './compress/compress.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { UploadFolderComponent } from './upload-folder/upload-folder.component';
// import { DocumentComponent } from './document/document.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WellcomeComponent,
    RegisterComponent,
    LoginComponent,
    VideoComponent,
    ImageComponent,
    AboutComponent,
    CompressComponent,
    PageNotFoundComponent,
    UploadFileComponent,
    UploadFolderComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    provideClientHydration(),
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
