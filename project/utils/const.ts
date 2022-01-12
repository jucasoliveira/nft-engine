import { AvatarBackgroundConfig, ShapeStyle } from '../types/types';

export const CompatibleAgents = ['quark', 'micromessenger', 'weibo', 'douban'];

export const DefaultBackgroundConfig: AvatarBackgroundConfig = {
  color: '#e666e6',
  shape: 'square',
};

export const ShapeStyleMapping: ShapeStyle = {
  circle: 'rounded-full',
  square: 'rounded-lg',
  none: '',
};
