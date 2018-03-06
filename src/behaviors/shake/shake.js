import Behavior from '../behavior.js';

class ShakeText extends Behavior {
  
  constructor(settings) {
    settings.name = 'shake';
    settings.description = `'cause sometimes Capslock doesn't do it!`;
    super(settings);
    
    this.commands.push({
      tag: 'shake',
      description: `I'll shake your text, cause sometimes Capslock doesn't do it!`
    });
  }
  
  execute(command, message, channel, data) {
    const parsedMessage = this.parseMessage(message, channel, data);
      if( parsedMessage == undefined) {
      return
    }
    
    this.bot.postMessage(channel, `${parsedMessage.join('')}`, {
      icon_emoji: ':shakehoof_beatz:',
      thread_ts: data.thread_ts
    });
  }
  
  parseMessage(message, channel, data) {
    let splitMessage = message.replace(/^!shake/gi, '')
      .replace(/\:\w*\:/gi, '')
      .replace(/[^a-zA-Z ]/g, '')
      .trim()
      .split('');
    if(splitMessage.length > 20) {
      this.bot.postMessage(channel, "Listen, I understand you're upset. But I can't do that! Try to type something smaller okay?~", {
        icon_emoji: ':hoof_beatz:',
        thread_ts: data.thread_ts
      });
      
      return undefined
    }
    
    const parsedMessage=splitMessage.map(alpha=>alpha== ' '?':ws:':`:sh-${alpha}:`);
    return parsedMessage;
  }
}

export default ShakeText;
