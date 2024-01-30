import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperComponent } from './swiper.component';
import { SwiperDirective } from './swiper.directive';
export class SwiperModule {
}
SwiperModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [SwiperComponent, SwiperDirective],
                exports: [CommonModule, SwiperComponent, SwiperDirective]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpcGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvY3NhYmkvZGV2ZWxvcC9hcHBzL25neC1zd2lwZXItd3JhcHBlci9wcm9qZWN0cy9saWIvc3JjLyIsInNvdXJjZXMiOlsibGliL3N3aXBlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQU9yRCxNQUFNLE9BQU8sWUFBWTs7O1lBTHhCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBRSxZQUFZLENBQUU7Z0JBQ3pCLFlBQVksRUFBRSxDQUFFLGVBQWUsRUFBRSxlQUFlLENBQUU7Z0JBQ2xELE9BQU8sRUFBRSxDQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsZUFBZSxDQUFFO2FBQzVEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgU3dpcGVyQ29tcG9uZW50IH0gZnJvbSAnLi9zd2lwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFN3aXBlckRpcmVjdGl2ZSB9IGZyb20gJy4vc3dpcGVyLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFsgQ29tbW9uTW9kdWxlIF0sXG4gIGRlY2xhcmF0aW9uczogWyBTd2lwZXJDb21wb25lbnQsIFN3aXBlckRpcmVjdGl2ZSBdLFxuICBleHBvcnRzOiBbIENvbW1vbk1vZHVsZSwgU3dpcGVyQ29tcG9uZW50LCBTd2lwZXJEaXJlY3RpdmUgXVxufSlcbmV4cG9ydCBjbGFzcyBTd2lwZXJNb2R1bGUge1xufVxuIl19