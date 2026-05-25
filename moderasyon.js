const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = [

/* ================= BAN ================= */
{
data: new SlashCommandBuilder()
.setName("777ban")
.setDescription("Kullanıcıyı banlar")
.addUserOption(o =>
o.setName("kullanici").setDescription("Banlanacak kişi").setRequired(true))
.addStringOption(o =>
o.setName("sebep").setDescription("Sebep")),

async execute(interaction, config, client){

if(!interaction.member.roles.cache.has(config.BOSS_ROLE) &&
!interaction.member.roles.cache.has(config.OG_ROLE)){
return interaction.reply({content:"Yetkin yok",ephemeral:true});
}

const user = interaction.options.getUser("kullanici");
const sebep = interaction.options.getString("sebep") || "Sebep yok";

await interaction.guild.members.ban(user.id,{reason:sebep});
await interaction.reply(`${user.tag} banlandı`);

const log = await client.channels.fetch(config.MOD_LOG_CHANNEL);
if(log){
log.send(`🔨 ${interaction.user.tag} → ${user.tag} banladı\nSebep: ${sebep}`);
}
}
},

/* ================= KICK ================= */
{
data: new SlashCommandBuilder()
.setName("777kick")
.setDescription("Kullanıcıyı kickler")
.addUserOption(o =>
o.setName("kullanici").setDescription("Kicklenecek kişi").setRequired(true))
.addStringOption(o =>
o.setName("sebep").setDescription("Sebep")),

async execute(interaction, config, client){

if(!interaction.member.roles.cache.has(config.BOSS_ROLE) &&
!interaction.member.roles.cache.has(config.OG_ROLE)){
return interaction.reply({content:"Yetkin yok",ephemeral:true});
}

const user = interaction.options.getUser("kullanici");
const sebep = interaction.options.getString("sebep") || "Sebep yok";

await interaction.guild.members.kick(user.id, sebep);
await interaction.reply(`${user.tag} kicklendi`);

const log = await client.channels.fetch(config.MOD_LOG_CHANNEL);
if(log){
log.send(`👢 ${interaction.user.tag} → ${user.tag} kickledi\nSebep: ${sebep}`);
}
}
},

/* ================= TIMEOUT ================= */
{
data: new SlashCommandBuilder()
.setName("777timeout")
.setDescription("Timeout atar")
.addUserOption(o =>
o.setName("kullanici").setDescription("Kullanıcı").setRequired(true))
.addStringOption(o =>
o.setName("sure")
.setDescription("Süre")
.setRequired(true)
.addChoices(
{name:"10 saniye", value:"10000"},
{name:"30 saniye", value:"30000"},
{name:"1 dakika", value:"60000"},
{name:"5 dakika", value:"300000"},
{name:"10 dakika", value:"600000"},
{name:"30 dakika", value:"1800000"},
{name:"1 saat", value:"3600000"},
{name:"1 gün", value:"86400000"}
))
.addStringOption(o =>
o.setName("sebep").setDescription("Sebep")),

async execute(interaction, config, client){

if(!interaction.member.roles.cache.has(config.BOSS_ROLE) &&
!interaction.member.roles.cache.has(config.OG_ROLE)){
return interaction.reply({content:"Yetkin yok",ephemeral:true});
}

const user = interaction.options.getMember("kullanici");
const sure = interaction.options.getString("sure");
const sebep = interaction.options.getString("sebep") || "Sebep yok";

if(!user){
return interaction.reply({
content:"Kullanıcı bulunamadı",
ephemeral:true
});
}

await user.timeout(parseInt(sure), sebep);

await interaction.reply(
`${user.user.tag} timeout yedi`
);

const log = await client.channels.fetch(config.MOD_LOG_CHANNEL);

if(log){
log.send(
`⏳ ${interaction.user.tag} → ${user.user.tag} timeout attı
Süre: ${sure}ms
Sebep: ${sebep}`
);
}
}
},

/* ================= TIMEOUT KALDIR ================= */
{
data: new SlashCommandBuilder()
.setName("777timeoutkaldir")
.setDescription("Timeout kaldırır")
.addUserOption(o =>
o.setName("kullanici").setDescription("Kullanıcı").setRequired(true)),

async execute(interaction, config, client){

if(!interaction.member.roles.cache.has(config.BOSS_ROLE) &&
!interaction.member.roles.cache.has(config.OG_ROLE)){
return interaction.reply({
content:"Yetkin yok",
ephemeral:true
});
}

const user = interaction.options.getMember("kullanici");

if(!user){
return interaction.reply({
content:"Kullanıcı bulunamadı",
ephemeral:true
});
}

await user.timeout(null);

await interaction.reply(
`${user.user.tag} timeout kaldırıldı`
);

const log = await client.channels.fetch(config.MOD_LOG_CHANNEL);

if(log){
log.send(
`✅ ${interaction.user.tag} → ${user.user.tag} timeout kaldırdı`
);
}
}
},

/* ================= UNBAN ================= */
{
data: new SlashCommandBuilder()
.setName("777unban")
.setDescription("Ban kaldırır")
.addStringOption(o =>
o.setName("id").setDescription("ID").setRequired(true)),

async execute(interaction, config, client){

const id = interaction.options.getString("id");

await interaction.guild.members.unban(id);

await interaction.reply(
`Ban kaldırıldı: ${id}`
);

const log = await client.channels.fetch(config.MOD_LOG_CHANNEL);

if(log){
log.send(
`♻️ ${interaction.user.tag} → ${id} unbanladı`
);
}
}
},

/* ================= DUYURU ================= */
{
data: new SlashCommandBuilder()
.setName("777duyuru")
.setDescription("Duyuru yapar")
.addStringOption(o =>
o.setName("mesaj").setDescription("Mesaj").setRequired(true)),

async execute(interaction){

const mesaj = interaction.options.getString("mesaj");

await interaction.channel.send(
`@everyone

${mesaj}`
);

await interaction.reply({
content:"Duyuru gönderildi",
ephemeral:true
});
}
},

/* ================= ROL VER ================= */
{
data: new SlashCommandBuilder()
.setName("777rolver")
.setDescription("Rol verir")
.addUserOption(o =>
o.setName("kullanici").setDescription("Kişi").setRequired(true))
.addRoleOption(o =>
o.setName("rol").setDescription("Rol").setRequired(true)),

async execute(interaction, config){

if(!interaction.member.roles.cache.has(config.BOSS_ROLE) &&
!interaction.member.roles.cache.has(config.OG_ROLE)){
return interaction.reply({
content:"Yetkin yok",
ephemeral:true
});
}

const user = interaction.options.getMember("kullanici");
const rol = interaction.options.getRole("rol");

if(!user){
return interaction.reply({
content:"Kullanıcı bulunamadı",
ephemeral:true
});
}

await user.roles.add(rol);

await interaction.reply(
`✅ ${user.user.tag} → ${rol.name} verildi`
);
}
},

/* ================= ROL AL ================= */
{
data: new SlashCommandBuilder()
.setName("777rolal")
.setDescription("Rol alır")
.addUserOption(o =>
o.setName("kullanici").setDescription("Kişi").setRequired(true))
.addRoleOption(o =>
o.setName("rol").setDescription("Rol").setRequired(true)),

async execute(interaction, config){

if(!interaction.member.roles.cache.has(config.BOSS_ROLE) &&
!interaction.member.roles.cache.has(config.OG_ROLE)){
return interaction.reply({
content:"Yetkin yok",
ephemeral:true
});
}

const user = interaction.options.getMember("kullanici");
const rol = interaction.options.getRole("rol");

if(!user){
return interaction.reply({
content:"Kullanıcı bulunamadı",
ephemeral:true
});
}

await user.roles.remove(rol);

await interaction.reply(
`❌ ${user.user.tag} → ${rol.name} alındı`
);
}
},

/* ================= TOPLU ROL VER ================= */
{
data: new SlashCommandBuilder()
.setName("777toplurolver")
.setDescription("Herkese rol verir")
.addRoleOption(o =>
o.setName("rol")
.setDescription("Verilecek rol")
.setRequired(true)),

async execute(interaction, config){

if(!interaction.member.roles.cache.has(config.BOSS_ROLE)){
return interaction.reply({
content:"Yetkin yok",
ephemeral:true
});
}

const rol = interaction.options.getRole("rol");

await interaction.reply(
`⏳ ${rol.name} rolü herkese veriliyor...`
);

interaction.guild.members.cache.forEach(async member => {

if(member.user.bot) return;

try{
await member.roles.add(rol);
}catch(err){}
});

}
},

/* ================= TOPLU ROL AL ================= */
{
data: new SlashCommandBuilder()
.setName("777toplurolal")
.setDescription("Herkesten rol alır")
.addRoleOption(o =>
o.setName("rol")
.setDescription("Alınacak rol")
.setRequired(true)),

async execute(interaction, config){

if(!interaction.member.roles.cache.has(config.BOSS_ROLE)){
return interaction.reply({
content:"Yetkin yok",
ephemeral:true
});
}

const rol = interaction.options.getRole("rol");

await interaction.reply(
`⏳ ${rol.name} rolü herkesten alınıyor...`
);

interaction.guild.members.cache.forEach(async member => {

if(member.user.bot) return;

try{
await member.roles.remove(rol);
}catch(err){}
});

}
},

/* ================= TOPLU SUSTUR ================= */
{
data: new SlashCommandBuilder()
.setName("777toplusustur")
.setDescription("Ses kanalındaki herkesi susturur"),

async execute(interaction, config){

if(!interaction.member.roles.cache.has(config.BOSS_ROLE)){
return interaction.reply({
content:"Yetkin yok",
ephemeral:true
});
}

const kanal = interaction.member.voice.channel;

if(!kanal){
return interaction.reply({
content:"Ses kanalında olmalısın",
ephemeral:true
});
}

kanal.members.forEach(async member => {

try{
await member.voice.setMute(true);
}catch(err){}
});

await interaction.reply(
`🔇 ${kanal.name} kanalındaki herkes susturuldu`
);
}
},

/* ================= TOPLU SUSTUR KALDIR ================= */
{
data: new SlashCommandBuilder()
.setName("777susturkaldir")
.setDescription("Ses kanalındaki susturmayı kaldırır"),

async execute(interaction, config){

if(!interaction.member.roles.cache.has(config.BOSS_ROLE)){
return interaction.reply({
content:"Yetkin yok",
ephemeral:true
});
}

const kanal = interaction.member.voice.channel;

if(!kanal){
return interaction.reply({
content:"Ses kanalında olmalısın",
ephemeral:true
});
}

kanal.members.forEach(async member => {

try{
await member.voice.setMute(false);
}catch(err){}
});

await interaction.reply(
`🔊 ${kanal.name} kanalındaki susturma kaldırıldı`
);
}
},

/* ================= KANAL KİLİT ================= */
{
data: new SlashCommandBuilder()
.setName("777kilit")
.setDescription("Kanalı kilitler"),

async execute(interaction){

await interaction.channel.permissionOverwrites.edit(
interaction.guild.roles.everyone,
{
SendMessages: false
}
);

await interaction.reply("🔒 Kanal kilitlendi");
}
},

/* ================= KANAL AÇ ================= */
{
data: new SlashCommandBuilder()
.setName("777ac")
.setDescription("Kanalı açar"),

async execute(interaction){

await interaction.channel.permissionOverwrites.edit(
interaction.guild.roles.everyone,
{
SendMessages: true
}
);

await interaction.reply("🔓 Kanal açıldı");
}
}

];
