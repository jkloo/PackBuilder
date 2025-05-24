import { rem } from '@mantine/core';
import { LogoProps, useAppLogoColors } from './use-app-logo-colors';


export function AppLogo({
  size,
  color,
  variant,
  inverted,
  style,
  ...others
}: LogoProps) {
  const colors = useAppLogoColors({ color, inverted });

  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"     
        width="96px"
        height="96px"
        fill="none"
        viewBox="0 0 96 96"
        style={{ width: rem(size), height: rem(size), ...style }}
        {...others}
    >
        <g id="Artboard" stroke="none" fill="none">
            <path d="M33.8888889,6 C44.3655164,6 53.5396038,11.576837 58.604475,19.9238349 C54.2014311,17.6300645 49.1965939,16.3333333 43.8888889,16.3333333 C26.2771419,16.3333333 12,30.6104752 12,48.2222222 C12,50.3419976 12.2068312,52.4134649 12.6014135,54.4175441 C7.88073607,49.275512 5,42.4186164 5,34.8888889 C5,18.9339961 17.9339961,6 33.8888889,6 Z" id="Oval-2" fill={colors.background}></path>
            <path d="M43.8888889,19.3333333 C50.4961182,19.3333333 56.5852794,21.5514465 61.452351,25.2836514 C60.787653,25.2431352 60.118491,25.2222222 59.4444444,25.2222222 C41.8326974,25.2222222 27.5555556,39.4993641 27.5555556,57.1111111 C27.5555556,63.7447249 29.5810766,69.9052529 33.0473809,75.0079572 C22.4645338,70.7202522 15,60.3429548 15,48.2222222 C15,32.2673295 27.9339961,19.3333333 43.8888889,19.3333333 Z" id="Oval-Copy-3" fill={colors.background}></path>
            <circle id="Oval-Copy-2" fill={colors.background} cx="59.4444444" cy="57.1111111" r="28.8888889"></circle>
        </g>
    </svg>
  );
}