
var ffmpeg = require('fluent-ffmpeg')
var clips = require("./lib/clips")

clips.parseAll({ state: "ready", action: 'Fucking' }, (clip) => {
  clips.addMetadata(clip, null)
});
/*
clips.parseFolder("e:/porno/clips")
clips.convertPending()
*/

/*
var proc = new ffmpeg({ source: 'c:/temp/perrito.gif' })
  .inputFormat('gif')
  .outputOptions([
          '-movflags faststart',
          '-pix_fmt yuv420p',
          '-vf scale=trunc(iw/2)*2:trunc(ih/2)*2'
  ])  
  .toFormat('mp4')    
  .saveToFile('c:/temp/perrito.mp4');*/