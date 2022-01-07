import {Default, cssTransition} from '../utils';

const Slide = cssTransition({
  enter: `${Default.CSS_NAMESPACE}--animate ${Default.CSS_NAMESPACE}__slide-enter`,
  exit: `${Default.CSS_NAMESPACE}--animate ${Default.CSS_NAMESPACE}__slide-exit`,
  appendPosition: true,
});

const Zoom = cssTransition({
  enter: `${Default.CSS_NAMESPACE}--animate ${Default.CSS_NAMESPACE}__zoom-enter`,
  exit: `${Default.CSS_NAMESPACE}--animate ${Default.CSS_NAMESPACE}__zoom-exit`
});

export {Slide, Zoom};
