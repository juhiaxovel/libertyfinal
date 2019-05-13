/**
* Author: ShepHertz
* Search pipe for diagonosis search
*/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'selectDiagFilter'
})
export class SelectFromDiagFilterPipe implements PipeTransform {
    transform(availableItemsList: any[], filterString: string) {
        const filteredList = availableItemsList.filter(item => {
            if (item.diagnosisDescription.toLowerCase().includes(filterString.toLowerCase())) {
                return true;
            } else {
                return false;
            }
        });
        return filteredList;
    }
}
