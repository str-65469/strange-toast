import * as React from 'react';
import cx from 'clsx';

import {IconError, IconSuccess, IconWarning, Spinner} from './Icons';
import {ToastProps} from '../types';
import {Default, isFn, isStr} from '../utils';
import {useToast} from '../hooks';

export const Toast: React.FC<ToastProps> = props => {
  const {
    preventExitTransition,
    toastRef,
    eventHandlers
  } = useToast(props);
  const {
    children,
    onClick,
    type,
    transition: Transition,
    position,
    className,
    style,
    bodyClassName,
    bodyStyle,
    role,
    rtl,
    toastId,
    deleteToast,
    isIn,
    isLoading,
    icon,
    theme
  } = props;
  const defaultClassName = cx(
    `${Default.CSS_NAMESPACE}__toast`,
    `${Default.CSS_NAMESPACE}__toast-theme--${theme}`,
    `${Default.CSS_NAMESPACE}__toast--${type}`,
    {
      [`${Default.CSS_NAMESPACE}__toast--rtl`]: rtl
    }
  );
  const cssClasses = isFn(className)
    ? className({
      rtl,
      position,
      type,
      defaultClassName
    })
    : cx(defaultClassName, className);
  const iconProps = {theme, type};
  let Icon: React.ReactNode;
  switch (type) {
    case "default":
    case "info":
      break;
    case "success":
      Icon = <IconSuccess />;
      break;
    case "warning":
      Icon = <IconWarning />;
      break;
    case "error":
      Icon = <IconError />;
      break;
  }

  if (icon === false) {
    Icon = void 0;
  } else if (isFn(icon)) {
    Icon = icon(iconProps);
  } else if (React.isValidElement(icon)) {
    Icon = React.cloneElement(icon, iconProps);
  } else if (isStr(icon)) {
    Icon = icon;
  } else if (isLoading) {
    Icon = Spinner;
  }

  return (
    <Transition
      isIn={isIn}
      done={deleteToast}
      position={position}
      preventExitTransition={preventExitTransition}
      nodeRef={toastRef}
    >
      <div
        id={toastId as string}
        onClick={onClick}
        className={cssClasses}
        {...eventHandlers}
        style={style}
        ref={toastRef}
      >
        <div className={cx(
          `toast-gradient-overlay`,
          `${Default.CSS_NAMESPACE}__toast-theme--${theme}__gradient-overlay-${type}`
        )}/>
        <div
          {...(isIn && {role: role})}
          className={
            isFn(bodyClassName)
              ? bodyClassName({type})
              : cx(`${Default.CSS_NAMESPACE}__toast-body`, bodyClassName)
          }
          style={bodyStyle}
        >
          {Icon && (
            <div
              className={cx(`${Default.CSS_NAMESPACE}__toast-icon`, {
                [`${Default.CSS_NAMESPACE}--animate-icon ${Default.CSS_NAMESPACE}__zoom-enter`]: !isLoading
              })}
            >
              {Icon}
            </div>
          )}
          <div>{children}</div>
        </div>
      </div>
    </Transition>
  );
};
