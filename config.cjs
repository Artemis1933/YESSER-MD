// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUtkOW1LZ1IvaHpBZlZCSy9lYVpLTlB0Y09MQllpN21oNHpSSlJTVWdFUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0FEUHNNazhKRDVsNXVERnFIMGlqeGRjOWttemdtMWhvU0xoczE3SjAwST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXT2pET2p6a1QxdU53UVhKVGorZHhCbVROWEh6QmVhcnUreHpnTFVEcVVvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyUTd2UjVYbVhnUHhoUXlOZFZzbTQwb2ZNaDZYY0s1dlFaQXYxMDBRdEZJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVKUWFSU0lURks4OEpseUIrUzF2TW43QW1VNGMzWHl3ck9oVWFmSEhCR2M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJWT3AySFJ2RUoyR0ZEcGhrTjRrN1FrMjJ5SnYvb0l0eCtzU1dUTmY1eFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0dlNVFoWGNBKzdBdTlVRk40ZzRveXJNSW1Ld3BWZS8zK3hNaEdnZGFVRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVWdnN05qMWk5ZmU3amw4blFicVFCUUh1VEltTVA1R0c0emEra0Y3RTF4dz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlY0NWp5TXBPbWRIU0EzYlhJWUJldHd5MDhXVnVRbFZVSHpHd1BFaDNicFp6aFRWdFNxVDdEdllwYnZ3QXhkOVdJNjF3VUNiQmV2V3FWZHRTQ3MzaWdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDQsImFkdlNlY3JldEtleSI6Ii9RNFdyNXBJZTlkM085Zm9FNmsxWHdCd2R6U2QyY3JOOGNQeVl6bXk4eEE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlBGelZKM0NwU25tX0ZJUDlELTd0SGciLCJwaG9uZUlkIjoiOTkxYjdlNmYtZjkxNS00MDAwLTllNjMtOWIxNTllMjgwZmI4IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNuakJuM21kK3ZYaTBHay94TUtPeFVEa3dwOD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1cVlremc3bzJ6dzFLaC9tYkVkaWJnaElKSXM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiV1FEVzJNWDMiLCJtZSI6eyJpZCI6IjI1NDc1NTQ2ODc0ODo2QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkFydGVtaXMgRm93bCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUGF3bEpBRkVPQzl6Ym9HR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiRVp6ZUJ0bE1waFlZTEtNalRoY1gyMU9kcERaN01UMnJ2cEM2MXdoNTBnRT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiRms3bHpKcUhKTWFmdUxXbG42V2E5QkxSTXZPRm42bUVSaVFFbkF2TG9hQytiRmJFTmVuVGZxRFVsYStoTEhHQ0hpenhyaCtiUmhhRmttNDFCeTBCRGc9PSIsImRldmljZVNpZ25hdHVyZSI6ImRmekEwd2NRbWJFaEFQNjdhd3JkejVROEtYd3lHclpGcGYyUjJSM3ZTa09CejBNZElKZVAzTjRpWGlNdjhzdjh0TUp1R2dOejFoemZqTlJDME9ud2hnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzU1NDY4NzQ4OjZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUkdjM2diWlRLWVdHQ3lqSTA0WEY5dFRuYVEyZXpFOXE3NlF1dGNJZWRJQiJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMzUxNzAzNywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFBcGMifQ==",
  PREFIX: process.env.PREFIX || '.',
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true, 
  AUTO_DL: process.env.AUTO_DL !== undefined ? process.env.AUTO_DL === 'true' : false,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'true' : true,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'true' : true,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : true,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'true' : true,
   /*auto block only for 212 */
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'true' : true,
  
  
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === 'true' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  MODE: process.env.MODE || "private",
  OWNER_NAME: process.env.OWNER_NAME || "Artemis",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "254755468748",
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'true' : false, 
};


module.exports = config;
