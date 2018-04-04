import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { TrainingdayDialogPage } from './trainingday-dialog';
import { TrainingdayService } from './trainingday.provider';

@NgModule({
    declarations: [
        TrainingdayDialogPage
    ],
    imports: [
        IonicPageModule.forChild(TrainingdayDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        TrainingdayDialogPage
    ],
    providers: [
        TrainingdayService
    ]
})
export class TrainingdayDialogPageModule {
}
