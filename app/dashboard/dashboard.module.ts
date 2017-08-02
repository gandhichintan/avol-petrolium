import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { MODULE_COMPONENTS, MODULE_ROUTES } from './dashboard.routes';
import { FormsModule } from "@angular/forms";

import { Utils } from "../service/util";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forChild(MODULE_ROUTES)
    ],
    declarations: [MODULE_COMPONENTS],
    providers: [Utils]
})

export class DashboardModule { }
