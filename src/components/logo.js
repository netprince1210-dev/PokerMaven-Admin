import { useTheme } from '@mui/material/styles';
import Image from 'next/image'
export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <Image src={'/avatar.png'} width={35} height={35} style={{borderRadius: 35}}/>
  );
};
