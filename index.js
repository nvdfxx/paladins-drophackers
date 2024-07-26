import 'dotenv/config'
import moment from 'moment'
import md5 from 'md5'
import request from 'request'
import mongoose from 'mongoose'
import fs from 'node:fs/promises'
import https from 'node:https'

import {insertManyMatches, insertManyChampions, insertManyMaps} from './controllers/main.js'

const devId = process.env.DEV_ID
const authKey = process.env.AUTH_KEY

 // START
const useFile = false
//yyyy.mm.dd
const DATE = '2024.07.25'
let MATCHES = []

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        const {session} = await getOnline(DATE)
        await getDetails(session)
    } catch(err) {
        console.log(err)
    }
}

async function getChampions(sessionId) {
    try {
        //await mongoose.connect(process.env.MONGO_URL)
        const session = sessionId || await createSession(devId, authKey)
        const data = await hiRezFunc(session, 'getchampions', '11')
        //await insertManyChampions(data)
        console.log(data)
        //console.log(data)
    } catch(err) {
        console.log(err)
    }
}

async function getItems(sessionId) {
    try {
        //await mongoose.connect(process.env.MONGO_URL)
        const session = sessionId || await createSession(devId, authKey)
        const data = await hiRezFunc(session, 'getchampioncards',2472, '11')
        //await insertManyChampions(data)
        //console.log(data.find(e => e.ItemId == 19623))
        console.log(data)
    } catch(err) {
        console.log(err)
    }
}

async function getMaps(sessionId) {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        //const session = sessionId || await createSession(devId, authKey)
        //const data = await hiRezFunc(session, 'getchampions', '11')
        await insertManyMaps(maps)
        console.log('maps added')
        //console.log(data)
    } catch(err) {
        console.log(err)
    }
}

//getItems()
main()

async function getOnline(date, sessionId) {
    try {
        if (!date) throw 'Не указана дата (date)'
        const dateNow = new Date()
        const session = sessionId || await createSession(devId, authKey)
        console.log(session)
        const listTypeMatches = [
            //{name: 'Осада', id: 424, rate: 12.72, count: 10},
            //{name: 'Осада боты', id: 425, rate: 9.72, count: 5},
            //{name: 'Осада НОВАЯ', id: 10319, rate: 10.00, count: 10},
            //{name: 'Стрельбище', id: 434, rate: 5, count: 1},
            //{name: 'Обучение', id: 444, rate: 5, count: 1},
            //{name: 'Натиск', id: 452, rate: 9.13, count: 10},
            //{name: 'Натиск боты', id: 453, rate: 5.72, count: 5},
            // {name: 'ТДМ', id: 469, rate: 5.79, count: 10},
            // {name: 'ТДМ боты', id: 470, rate: 3.87, count: 5},
            {name: 'Рейтинг', id: 486, rate: 12.86, count: 10}
            // {name: '1', id: 427, rate: 10, count: 10},
            // {name: '2', id: 428, rate: 10, count: 10},
            // {name: '3', id: 437, rate: 10, count: 10},
        ]

        const newDate = new Date()
        //dateDelta.slice(-1)
        const dateDelta = new Date(newDate.getTime() + newDate.getTimezoneOffset() * 60000)

        dateDelta.setMinutes(dateDelta.getMinutes() - 60)
        const dateDeltaParams = `${dateDelta.getHours()},${Math.floor(dateDelta.getMinutes() / 10)}0`
        console.log({time: dateDelta.toTimeString(), dateDeltaParams})

        // получаем стату от хайрезов
        const dataMatches = {}
        for (let i = 0; i < listTypeMatches.length; i++) {
            const type = listTypeMatches[i]
            const data = await hiRezFunc(session, 'getmatchidsbyqueue', type.id, date, '-1')
            //const data = await hiRezFunc(session, 'getmatchidsbyqueue', type.id, date, dateDeltaParams)
            //console.log({data})
            console.log(`${type.name} получена`, data.length)
            dataMatches[type.id] = data
        }

        console.log(`\n\tВсе данные получены, формируем статистику...\n`)

        // формируем статистику за все время

        // фильтруем данные и формируем статистику для текущео времени (приблизительно)
        let playersNow = ``
        let allPlayers = 0
        let matches = []
        const matchesDetails = []
        console.log(listTypeMatches)
        //await listTypeMatches.forEach(async type => {
        for (const type of listTypeMatches) {
            const {id, name, rate, count} = type
            const data = dataMatches[id]
            const timezone = 4 // + сколько время от UTC в настоящее время
            const time = rate * 60 * 1000 + timezone * 60 * 60 * 1000
   
            // console.log('data', data[0], data[data.length -1])
            const filters = data.filter(el => {
                /*
                const o = {
                    dateNow,
                    dateEl: new Date(el.Entry_Datetime),
                    time,
                    result: dateNow - new Date(el.Entry_Datetime),
                    check: (dateNow - new Date(el.Entry_Datetime)) < time
                }
                */
                //console.log(o)
                //return true //el.Active_Flag == 'y' //&& (dateNow - new Date(el.Entry_Datetime)) < time
                return el.ret_msg == null  && el.Active_Flag == 'n'
            })
            
            MATCHES = filters
            
            console.log('Parsed matches: ', MATCHES.length)
            
            const players = filters.length * count
            allPlayers += players
            playersNow += `${time}\n`
            playersNow += `${name}: ${players}\n`
        }
        playersNow += `\tВсего: ${allPlayers}`
        console.log(playersNow)
        return {session}
    } catch(err) {
        console.log(err)
    }
}

async function getDetails(session) {
    let matches = MATCHES
    try {
        const matchesChunks = getArrayChunks(MATCHES, 10)
        let counter = 0

        for (const chunk of matchesChunks) {
            await delay(100)
            const chunkData = await getMatchDetailsbatch(session, chunk.map(match => match.Match).join())
            await insertManyMatches(chunk, chunkData)
            matches = matches.filter(e => !chunk.map(c => c.Match).includes(e.Match))
            counter += 10
            console.log(`process: ${counter} / ${MATCHES.length}`)
        }
        console.log('finished')
    } catch (error) {
        console.log(error)
        console.log(matches.length)
        await fs.writeFile('./data.json', JSON.stringify(matches));
    }
}

async function getMatchesFromFile() {
    try {
        return JSON.parse(await fs.readFile('./data.json'))
    } catch(err) {
        console.log(err)
        return []
    }
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function getMatch(session, matchId) {
    const data = await hiRezFunc(session, 'getmatchplayerdetails', matchId)
    console.log('Match: ', data)
}

async function getMatchDetailsbatch(session, matchesIds) {
    const data = await hiRezFunc(session, 'getmatchdetailsbatch', matchesIds)
    //console.log({data})
    return data
}

function getArrayChunks(inputArray, perChunk) {
    return inputArray.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / perChunk)

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
        }

        resultArray[chunkIndex].push(item)

        return resultArray
    }, [])
}



/**
 * getdataused - возвращает лимиты использования API
 * gethirezserverstatus - возвращает статусы основных серверов hi-rez
 * getchampions - возвращает много инфы о всех чемпионах [11] (getgods)
 * getgods - Возвращает всех богов и их различные атрибуты
 * getchampioncards - возвращает все карты указанного чемпиона [id, 11]
 * getchampionleaderboard - таблица лидеров по чемпионам [id, 428]
 * getplayer - возвращает статистику аккаунта [name, portalId]
 * getplayer - возвращает статистику аккаунта [name]
 * getplayerbatch - то же что и getplayer только сразу много id [id1, id2]
 * getplayeridbyname - возвращает краткую информацию об аккаунте [name]
 * getgodranks - информацию о всех чемпионах указанного игрока [id]
 * getchampionranks - то же что и "getgodranks" но только тех на ком играл [id]
 * getplayerloadouts - колоды указанного игрока (сразу всех персонажей) [id, 11]
 * getplayerstatus - возвращает статус игрока (в игре или нет, id матча) [id]
        0 - Offline
        1 - In Lobby  (в основном где угодно, кроме выбора бога или в игре)
        2 - god Selection (игрок принял матч и выбирает бога перед началом игры)
        3 - In Game (match has started)
        4 - Online (игрок вошел в систему, но может блокировать трансляцию состояния игрока)
        5 - Unknown (player not found)
 * getmatchhistory - история матчей [id]
 * searchplayers - поискк игроков по нику как на гуру
 * getmatchdetails - история указанного матча [id]
 * getmatchplayerdetails - история матча в реальном времени [id]
 * getitems - возвращает кучу всяких предметов [11]
 * getleagueleaderboard - Возвращает лучших игроков определенной лиги {queue}/{tier}/{round}
 * getfriends - список друзей и тех кого заблокировал  [playerId]
 * getbountyitems - черепки
 * getqueuestats - получает статистику чемпионов по указанному режиму {playerId}{queue} (486-ranked)
 * getplayeridbyportaluserid - 
 * @param {String} session - ключ сесии
 * @param {String} format - тип запроса
 * @param  {...any} params - параметры которые будут переданы в конец url
 */
async function hiRezFunc(session, format, ...params) {
    try {
        if (!format) reject(false)
        const timestamp = moment().utc().format("YYYYMMDDHHmmss")
        const signature = md5( devId + format + authKey + timestamp )
        const strParams = params.length > 0 ? `/${params.join("/")}` : ''
        //console.log({strParams})
        const url = `https://api.paladins.com/paladinsapi.svc/${format}Json/${devId}/${signature}/${session}/${timestamp}${strParams}`
        //console.log({params, strParams, url})
        const res = await sendSite({
            url, 
            json: true,
            timeout: 60000,
            agent: new https.Agent({ keepAlive: true })
        })
        return res.body
    } catch(err) {
        console.log(err)
        return false
    }
}


/**
 * Создает сессию и возвращает промис, session_id
 * @param {Number || String} devId - id разработчика
 * @param {String} authKey - ключ разработчика
 * @return {Promise} session_id
 */
async function createSession(devId, authKey) {
    // return new Promise((resolve, reject) => {
    try {
        const timestamp = moment().utc().format("YYYYMMDDHHmmss")
        const signature = md5( devId + "createsession" + authKey + timestamp )
        const urlCreateSession = `https://api.paladins.com/paladinsapi.svc/createsessionJson/${devId}/${signature}/${timestamp}`
        const response = await sendSite({url: urlCreateSession, json: true})

        const body =  response.body
        const ret_msg = body.ret_msg
        if (ret_msg !== "Approved") throw ret_msg
        return body.session_id

    } catch(err) {
        console.log(err)
        return false
    }
}


function sendSite(params) {
    if (!params.strictSSL) params.strictSSL = false
	params.url = encodeURI(params.url)
	const send = params.method == "POST" ? request.post : request.get
	return new Promise((resolve, reject) => {
		send(params, function (error, response) {
			if (error) reject(error)
	      resolve(response)
		})
	})
}
