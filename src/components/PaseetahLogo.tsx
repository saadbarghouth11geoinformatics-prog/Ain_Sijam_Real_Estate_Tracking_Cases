import React from 'react';
import { AinSigamLogo, AinSigamLogoProps } from './AinSigamLogo';

export type PaseetahLogoProps = AinSigamLogoProps;
export const PaseetahLogo: React.FC<PaseetahLogoProps> = (props) => {
  return <AinSigamLogo {...props} />;
};

export default PaseetahLogo;
