import {bootstrap}    from '@angular/platform-browser-dynamic';
import { provideStore } from '@ngrx/store';
import {AppComponent} from './app.component';
import {operationReducer} from "./operations";

bootstrap(AppComponent, [provideStore({operations: operationReducer})]);
