import { Composition } from 'remotion';
import { FourHundredBoxVideo } from './video/FourHundredBoxVideo';

export const RemotionRoot = () => {
  return (
    <Composition
      id="FourHundredBoxVideo"
      component={FourHundredBoxVideo}
      durationInFrames={1050}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{
        signupUrl: 'https://www.400box.com/',
        wechat: '_400box_',
      }}
    />
  );
};
