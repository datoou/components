import { Flex, Tooltip, type FlexProps, type TooltipProps } from 'antd';
import { Loader2 } from 'lucide-react';
import { forwardRef, useMemo } from 'react';

import Icon, {
  LucideIconProps,
  type IconProps,
  type IconSizeConfig,
  type IconSizeType,
} from '@/Icon';
import Spotlight from '@/Spotlight';

import { calcSize } from './calcSize';
import { useStyles } from './style';

interface ActionIconSizeConfig extends IconSizeConfig {
  blockSize?: number | string;
  borderRadius?: number | string;
}

type ActionIconSizeType = 'site' | IconSizeType;

export type ActionIconSize = ActionIconSizeType | ActionIconSizeConfig;

export interface ActionIconProps extends LucideIconProps, Omit<FlexProps, 'children'> {
  /**
   * @description Whether the icon is active or not
   * @default false
   */
  active?: boolean;
  /**
   * @description Change arrow's visible state and change whether the arrow is pointed at the center of target.
   * @default false
   */
  arrow?: boolean;
  disable?: boolean;
  /**
   * @description Glass blur style
   * @default 'false'
   */
  glass?: boolean;
  icon?: IconProps['icon'];
  /**
   * @description Set the loading status of ActionIcon
   */
  loading?: boolean;

  /**
   * @description The position of the tooltip relative to the target
   * @enum ["top","left","right","bottom","topLeft","topRight","bottomLeft","bottomRight","leftTop","leftBottom","rightTop","rightBottom"]
   * @default "top"
   */
  placement?: TooltipProps['placement'];
  /**
   * @description Size of the icon
   * @default 'normal'
   */
  size?: ActionIconSize;
  spin?: boolean;
  /**
   * @description Whether add spotlight background
   * @default false
   */
  spotlight?: boolean;
  /**
   * @description The text shown in the tooltip
   */
  title?: string;
  /**
   * @description Mouse enter delay of tooltip
   * @default 0.5
   */
  tooltipDelay?: number;
  children?: React.ReactNode;
}

const ActionIcon = forwardRef<HTMLDivElement, ActionIconProps>(
  (
    {
      color,
      fill,
      className,
      active,
      icon,
      size = 'normal',
      style,
      glass,
      title,
      placement,
      arrow = false,
      spotlight,
      onClick,
      children,
      loading,
      tooltipDelay = 0.5,
      fillOpacity,
      fillRule,
      focusable,
      disable,
      spin: iconSpinning,
      ...rest
    },
    ref,
  ) => {
    const { styles, cx } = useStyles({ active: Boolean(active), glass: Boolean(glass) });
    const { blockSize, borderRadius } = useMemo(() => calcSize(size), [size]);

    const iconProps = {
      color,
      fill,
      fillOpacity,
      fillRule,
      focusable,
      size: size === 'site' ? 'normal' : size,
    };

    const content = icon && (
      <Icon className={styles.icon} icon={icon} {...iconProps} spin={iconSpinning} />
    );

    const spin = <Icon icon={Loader2} {...iconProps} spin />;

    const actionIconBlock = (
      <Flex
        align={'center'}
        className={cx(styles.block, disable ? styles.disabled : styles.normal, className)}
        justify={'center'}
        onClick={loading || disable ? undefined : onClick}
        ref={ref}
        style={{ borderRadius, height: blockSize, width: blockSize, ...style }}
        {...rest}
      >
        {spotlight && <Spotlight />}
        {loading ? spin : content}
        {children}
      </Flex>
    );

    if (!title) return actionIconBlock;

    return (
      <Tooltip
        arrow={arrow}
        mouseEnterDelay={tooltipDelay}
        overlayStyle={{ pointerEvents: 'none' }}
        placement={placement}
        title={title}
      >
        {actionIconBlock}
      </Tooltip>
    );
  },
);

export default ActionIcon;
