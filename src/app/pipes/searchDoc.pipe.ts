/**
* Author: ShepHertz
* Search pipe for doctor search
*/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'selectDoctorFilter'
})
export class SelectFromListFilterPipe implements PipeTransform {
    transform(availableItemsList: any[], filterString: string) {
        const filteredList = availableItemsList.filter(item => {
            if (item.name.toLowerCase().includes(filterString.toLowerCase())) {
                return true;
            } else {
                return false;
            }
        });
        return filteredList;
    }
}
