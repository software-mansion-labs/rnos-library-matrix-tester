import {AnimateBackgroundColor} from './AnimateBackgroundColor';
import {AnimateSvg} from './AnimateSvg';
import {AnimateText} from './AnimateText';
import {AnimateWidth} from './AnimateWidth';
import {GestureHandlerDragDrop} from './GestureHandlerDragDrop';
import {HelloWorld} from './HelloWorld';
import {Reload} from './Reload';
import {ScrollTo} from './ScrollTo';
import {Worklets} from './Worklets';

export const TESTS = [
  {name: 'HelloWorld', component: HelloWorld},
  {name: 'Worklets', component: Worklets},
  {name: 'AnimateBackgroundColor', component: AnimateBackgroundColor},
  {name: 'AnimateWidth', component: AnimateWidth},
  {name: 'AnimateText', component: AnimateText},
  {name: 'AnimateSvg', component: AnimateSvg},
  {name: 'ScrollTo', component: ScrollTo},
  {name: 'GestureHandlerDragDrop', component: GestureHandlerDragDrop},
  {name: 'Reload', component: Reload},
];
