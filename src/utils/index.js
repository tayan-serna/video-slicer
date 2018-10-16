export const secondsToHms = (secs) => {
  const newSecs = Number(secs);
  const h = Math.floor(newSecs / 3600);
  const m = Math.floor((newSecs % 3600) / 60);
  const s = Math.floor((newSecs % 3600) % 60);
  return {
    hours: h,
    minutes: m,
    seconds: s,
  };
};

export const getVideoThumbnail = (videoSrc) => {
  const video = document.createElement('video');
  const source = document.createElement('source');
  source.src = videoSrc;
  source.type = 'video/mp4;codecs="avc1.42E01E, mp4a.40.2"';
  video.height = 60;
  video.width = 80;
  video.appendChild(source);


  const canvas = document.createElement('canvas');
  canvas.width = video.width;
  canvas.height = video.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    video,
    0,
    0,
    video.width,
    video.height,
  );

  return canvas.toDataURL('image/jpeg');
};

export const getVideoDuration = (videoSrc) => {
  const video = document.createElement('video');
  const source = document.createElement('source');
  source.src = videoSrc;
  source.type = 'video/mp4;codecs="avc1.42E01E, mp4a.40.2"';
  video.height = 60;
  video.width = 80;
  video.appendChild(source);
  video.load();
  video.addEventListener('durationchange', () => {
    console.log('Duration change', secondsToHms(video.duration));
    return secondsToHms(video.duration);
  });
};
