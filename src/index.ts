import {Telegraf, Context} from "telegraf"
import {Message} from "typegram"
import fs from "fs"

import fetch from 'node-fetch';

const bot = new Telegraf(process.env.BOT_TOKEN!)

bot.start((ctx: Context) => ctx.reply('Welcome'))

bot.command('proxy', async (ctx: Context) => {
    if (ctx.message && 'text' in ctx.message) {

		let data = await fetch(process.env.WEBHOOK, {
			method: "POST",
			body:  JSON.stringify({
				username: ctx.message.from.first_name,
				content: ctx.message.text.replace("/proxy ", ""),
			}),
			headers: {
				'Content-Type': "application/json", 
			}
		})
		console.log(`Sent message "${ctx.message.text.replace("/proxy ", "")}" from ${ctx.message.from.username} `)
        
    } else {
        return ctx.reply('Please input your details');
    }
})
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
