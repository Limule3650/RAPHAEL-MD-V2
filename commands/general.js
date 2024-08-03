const { tlang, botpic, cmd, prefix, runtime, Config , sleep } = require('../lib')
const axios = require('axios')
const speed = require('performance-now')
const fetch = require('node-fetch');
//---------------------------------------------------------------------------
cmd({
    pattern: "chat",
    alias :['gpt'],
    desc: "chat with an AI(GPT)",
    category: "AI",
    use: '<Hii,sasaki>',
    filename: __filename,
},
async(Void, citel,text) => {
    let zx = text.length;
    if (zx < 8) {
        let {data} = await axios.get(`http://api.brainshop.ai/get?bid=167991&key=aozpOoNOy3dfLgmB&uid=[${citel.sender.split("@")[0]}]&msg=[${text}]`);
        return citel.reply(data.cnt);  
    }
    if (!text) return citel.reply(`Hey there! ${citel.pushName}. How are you doing these days?`);
    // const { Configuration, OpenAIApi } = require("openai");
    // const configuration = new Configuration({
    //     apiKey: Config.OPENAI_API_KEY || "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",
    // });
    // const openai = new OpenAIApi(configuration);
    // const completion = await openai.createCompletion({
    //     model: "text-davinci-002",
    //     prompt: text,
    //     temperature: 0.5,
    //     max_tokens: 80,
    //     top_p: 1.0,
    //     frequency_penalty: 0.5,
    //     presence_penalty: 0.0,
    //     stop: ['"""'],
    // });
    // citel.reply(completion.data.choices[0].text);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Config.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", 
      messages: [{ role: "system", content: "You" }, { role: "user", content: text }],
    }),
  });

  const data = await response.json();
  console.log("GPT REPONCE : ",data); 
  if (!data.choices || data.choices.length === 0) {citel.reply("*Invalid ChatGPT API Key, Please Put New Key*"); }
  return await  citel.reply(data.choices[0].message.content)
	
}
)

cmd({
    pattern: "dalle",
    alias : ['dall','dall-e'],
    desc: "Create Image by AI",
    category: "AI",
    use: '<an astronaut in mud.>',
    filename: __filename,
},
async(Void, citel,text,{isCreator}) => 
{
//if (!isCreator) return citel.reply(tlang().owner)
if (Config.OPENAI_API_KEY=='') return citel.reply('You Dont Have OPENAI_API_KEY \nPlease Create OPEN API KEY from Given Link \nhttps://platform.openai.com/account/api-keys');
if (!text) return citel.reply(`*Give Me A Query To Get Dall-E Reponce ?*`); 
const imageSize = '256x256'
const apiUrl = 'https://api.openai.com/v1/images/generations';
const response = await fetch(apiUrl, {
method: 'POST',
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${Config.OPENAI_API_KEY}`
},
body: JSON.stringify({
  model: 'image-alpha-001',
  prompt: text,
  size: imageSize ,
  response_format: 'url'
})
});

const data = await response.json();
let buttonMessage = {
    image:{url:data.data[0].url},
    caption : '*---Your DALL-E Result---*'

}

Void.sendMessage(citel.chat,{image:{url:data.data[0].url}})
}
)

//---------------------------------------------------------------------------
const token = 'ghp_Hs8bEx69bG2WPSOJyUK3bY57-JO3Eb41bA26P'; 

async function getRepoStarsAndForks(owner, repo) {
  const endpoint = `https://api.github.com/repos/${owner}/${repo}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.get(endpoint, { headers });
    const data = response.data;
    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des informations du dépôt :', error.message);
    return { stars: 0, forks: 0 }; // Valeurs par défaut en cas d'erreur
  }
}

cmd({
  pattern: "repo",
  alias: ["git", "sc", "script"],
  desc: "Sends info about repo.",
  category: "general",
  filename: __filename,
}, async (Void, citel) => {
  const owner = 'Alp24ni'; 
  const repo = 'SASAKI-MD'; 
  const { stars, forks } = await getRepoStarsAndForks('https://api.github.com/repos/Alp24ni/SASAKI-MD');
  let cap = `Hey ${citel.pushName}\n
*❲❒❳ Total Stars:* ${stars} stars
*❲❒❳ Forks:* ${forks} forks
*❲❒❳ Repo:* https://github.com/Alp24ni/SASAKI-MD
*❲❒❳ Group:* https://chat.whatsapp.com/IdB2EfQiNlKBekQrigN9m9
*❲❒❳ Deploy Your Own:*
https://dashboard.render.com/login`;
  let capp = `𝗧𝗘𝗔𝗠 𝗦𝗔𝗦𝗔𝗞𝗜`;
  let buttonMessaged = {
    image: { url: await botpic() },
    caption: cap,
    footer: capp,
    headerType: 4,
    contextInfo: {
      externalAdReply: {
        title: "𝗧𝗘𝗔𝗠 𝗦𝗔𝗦𝗔𝗞𝗜",
        body: "(ᴄʟɪᴄᴋ ʜᴇʀᴇ)",
        thumbnail: log0,
        mediaType: 4,
        mediaUrl: '',
        sourceUrl: `https://whatsapp.com/channel/0029VaahaCWDzgTKeG9S7u1W`,
      },
    },
  };
  return await Void.sendMessage(citel.chat, buttonMessaged, {
    quoted: citel,
  });
});
//---------------------------------------------------------------------------
cmd({
        pattern: "status",
        alias: ["about"],
        desc: "To check bot status",
        category: "general",
        filename: __filename,
    },
    async(Void, citel) => {
        const uptime = process.uptime();
        timestampe = speed();
        latensie = speed() - timestampe;
        let ter = `
🔰 *${tlang().title}* 🔰
*🌟Description:* A WhatsApp bot with rich features, build in NodeJs to make your WhatsApp enjoyable.
*⚡Speed:* ${latensie.toFixed(4)} ms
*🚦Uptime:* ${runtime(process.uptime())}
*🕸Version:* 0.0.1
*👤Owner:*  ${Config.ownername}
*Powered by ${tlang().title}*
`;
        let buttonMessaged = {
            image: {
                url: await botpic(),
            },
            caption: ter,
            footer: tlang().footer,
            headerType: 4,
            contextInfo: {
                externalAdReply: {
                    title: tlang().title,
                    body: `Bot-Status`,
                    thumbnail: log0,
                    mediaType: 2,
                    mediaUrl: ``,
                    sourceUrl: ``,
                },
            },
        };
        return await Void.sendMessage(citel.chat, buttonMessaged, {
            quoted: citel,
        });

    }
)

//---------------------------------------------------------------------------
cmd({
    pattern: "theme",
    desc: "To find all themes",
    category: "general",
    filename: __filename,
},
async(Void, citel,text,{isCreator}) => {

if(!isCreator) return citel.reply(tlang().owner);
let str="𝗧𝗛𝗘𝗠𝗘 𝗢𝗙 𝗦𝗔𝗦𝗔𝗞𝗜-𝗠𝗗"
str+=`1. SASAKI-MD. \n\n 𝖉𝖔𝖓'𝖙 𝖈𝖍𝖆𝖓𝖌𝖊 𝖙𝖍𝖊 𝖙𝖍𝖊𝖒𝖊.\_𝓡𝓮𝓹𝓵𝔂 ${prefix}setvar THEME:SASAKI-MD`
return citel.reply(str)
    
}
)
