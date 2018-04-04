import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { TrainingdayPage } from './trainingday';
import { TrainingdayService } from './trainingday.provider';

@NgModule({
    declarations: [
        TrainingdayPage
    ],
    imports: [
        IonicPageModule.forChild(TrainingdayPage),
        TranslateModule.forChild()
    ],
    exports: [
        TrainingdayPage
    ],
    providers: [TrainingdayService]
})
export class TrainingdayPageModule {
}
