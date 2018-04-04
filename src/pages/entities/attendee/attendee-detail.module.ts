import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendeeDetailPage } from './attendee-detail';
import { AttendeeService } from './attendee.provider';

@NgModule({
    declarations: [
        AttendeeDetailPage
    ],
    imports: [
        IonicPageModule.forChild(AttendeeDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        AttendeeDetailPage
    ],
    providers: [AttendeeService]
})
export class AttendeeDetailPageModule {
}
