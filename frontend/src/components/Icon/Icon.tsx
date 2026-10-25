import { ICON_SET, IconName } from './IconSet';

interface IconProps {
  name: IconName;
  className?: string;
}

export function Icon({ name, className }: Readonly<IconProps>) {
  const Component = ICON_SET[name];
  return <Component className={className} aria-hidden="true" />;
}