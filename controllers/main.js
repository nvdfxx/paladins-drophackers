import Match from "../models/match.js";
import champion from "../models/champion.js";
import map from "../models/map.js";
import MatchDetails from "../models/matchDetails.js";
import { Ranks } from "../enums.js";
let counter = {
    saved: 0,
    all: 0,
    lengthError: 0,
    rankError: 0
}
export async function insertManyMatches(matches, matchesDetails) {
    try {
        //console.log(matchesDetails)
        counter.all += matches.length
        for(const match of matches) {
            const details = matchesDetails.filter(md => md.Match == match.Match)
            
            if(details.length === 10) {
                const isDiamondMatch = details.find(d => d.League_Tier >= Ranks.Diamond_V)
                if(isDiamondMatch) {
                    const matchData = match
                    matchData.Map_Game = matchData
                    /*await Match.find( { Match : { $in : [1,2,3,4] } } );*/
                    const isMatchExists = await Match.findOne({Match: matchData.Match})
                    if(!isMatchExists) {
                        let newMatch = new Match(matchData)
                        
                        newMatch = await newMatch.save()
    
                        const newDetails = await MatchDetails.insertMany(details.map(md => (
                            {
                                ...md, 
                                Map_Game: md.Map_Game
                                    .replace('Ranked ', '')
                                    .replace(' V2 Night', '')
                                    .replace(' V2 Day', ''),
                                _Match: newMatch._id
                            }
                        )))
    
                        //console.log(newDetails)
    
                        newMatch.Match_Details.push(...newDetails.map(e => e._id))
                        await newMatch.save()
                        counter.saved++
                    }
                } else {
                    counter.rankError++
                }
            } else {
                counter.lengthError++
            }
            
            
        }
        console.log(counter)
        //await Match.insertMany(data);
    } catch (e) {
        console.log(e)
        //return res.status(500).json({ error: e });
    }
};

export async function insertManyChampions(champions) {
    try {
        console.log(champions)
        const data = champions.map(e => {
            e.ChampionId = e.id
            e.Alias = e.Name_English.replaceAll(' ', '-').replaceAll("'", '').toLowerCase()
            return e
        })
        await champion.insertMany(data)

    } catch (e) {
        console.log(e)
        //return res.status(500).json({ error: e });
    }
};

export async function insertManyMaps(maps) {
    try {
        console.log(maps)
        const data = maps.map(e => {
            e.Alias = e.Name_English.replaceAll(' ', '-').replaceAll("'", '').toLowerCase()
            return e
        })
        await map.insertMany(data)

    } catch (e) {
        console.log(e)
        //return res.status(500).json({ error: e });
    }
};