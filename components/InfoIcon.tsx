import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';

export function InfoIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Defs>
        <LinearGradient id="iconStroke" x1="21" y1="0.5" x2="3" y2="24" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#87F3E1" />
          <Stop offset="1" stopColor="#529AF7" />
        </LinearGradient>
        <LinearGradient id="iconFill" x1="13" y1="6" x2="7" y2="8" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#87F3E1" />
          <Stop offset="1" stopColor="#529AF7" />
        </LinearGradient>
      </Defs>
      <Circle cx={12} cy={12} r={10} stroke="url(#iconStroke)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M12 11a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1ZM12.01 7a1 1 0 0 1 1 1 1 1 0 0 1-1 1H12a1 1 0 0 1-1-1 1 1 0 0 1 1-1h.01Z"
        fill="url(#iconFill)"
      />
    </Svg>
  );
}
