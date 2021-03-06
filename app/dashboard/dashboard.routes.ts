import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PrintViewComponent } from './invoice.printview/invoice.printview.component';
import { UserComponent } from './user/user.component';
import { IconsComponent } from './icons/icons.component';
import { TableComponent } from './table/table.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TypographyComponent } from './typography/typography.component';
import { MapsComponent } from './maps/maps.component';
import { UpgradeComponent } from './upgrade/upgrade.component';

export const MODULE_ROUTES: Route[] = [
    { path: '', redirectTo: 'invoice', pathMatch: 'full' },
    { path: 'invoice', component: InvoiceComponent },
    { path: 'printpriview', component: PrintViewComponent },
    { path: 'user', component: UserComponent },
    { path: 'table', component: TableComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'upgrade', component: UpgradeComponent }

]

export const MODULE_COMPONENTS = [
    InvoiceComponent,
    PrintViewComponent,
    UserComponent,
    TableComponent,
    IconsComponent,
    NotificationsComponent,
    TypographyComponent,
    MapsComponent,
    UpgradeComponent
]
